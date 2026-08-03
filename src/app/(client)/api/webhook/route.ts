import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../../actions/createCheckoutSession";
import { backendClient } from "@/lib/backendClient";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "No Signature found for stripe" },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("Webhook secret is not defined");
    return NextResponse.json(
      { error: "Webhook secret is not defined" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Error signature verification failed:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 },
    );
  }

  // checkout.session.completed fires for all methods (card, Link, Boleto, Pix).
  // For Boleto/Pix the funds are NOT captured yet at this point — the order is
  // created with status "pending" and updated when the async payment settles.
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    // payment_status === "paid"   → card / Link (synchronous, funds captured)
    // payment_status === "unpaid" → Boleto / Pix (voucher issued, awaiting payment)
    const initialStatus =
      session.payment_status === "paid" ? "paid" : "pending";

    try {
      await createOrderInSanity(session, invoice, initialStatus);
    } catch (error) {
      console.error("Error creating order in sanity:", error);
      return NextResponse.json(
        { error: `Error creating order: ${error}` },
        { status: 400 },
      );
    }
  }

  // Boleto: customer paid the voucher → mark order as paid.
  if (event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await updateOrderStatus(session.id, "paid");
    } catch (error) {
      console.error("Error updating order status to paid:", error);
      return NextResponse.json(
        { error: `Error updating order: ${error}` },
        { status: 400 },
      );
    }
  }

  // Boleto: voucher expired or payment failed → mark order as cancelled.
  if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await updateOrderStatus(session.id, "cancelled");
    } catch (error) {
      console.error("Error updating order status to cancelled:", error);
      return NextResponse.json(
        { error: `Error updating order: ${error}` },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null | undefined,
  status: "paid" | "pending" = "paid",
) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId, address} = metadata as unknown as Metadata & {address: string};
  const parsedAddress = address ? JSON.parse(address) : null;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {expand:["data.price.product"]}

  );

  const sanityProducts = []
  const stockUpdates = []

  for(const item of lineItemsWithProduct.data){
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item?.quantity || 0;

    if(!productId) continue;

    sanityProducts.push({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: productId,
        },
        quantity,
    });

    stockUpdates.push({productId, quantity });
  }

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount /100 : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status,
    orderDate: new Date().toISOString(),
    invoice: invoice ? {
      id: invoice.id,
      number: invoice.number,
      hosted_invoice_url: invoice.hosted_invoice_url,
    } : null,
    address: parsedAddress ? {
      state: parsedAddress.state,
      zip: parsedAddress.zip,
      city: parsedAddress.city,
      address: parsedAddress.address,
      name: parsedAddress.name,
    } : null,
  });

  await updateStockLevels(stockUpdates);
  return order;
}

async function updateOrderStatus(
  stripeCheckoutSessionId: string,
  status: "paid" | "cancelled",
) {
  const orders = await backendClient.fetch<{ _id: string }[]>(
    `*[_type == "order" && stripeCheckoutSessionId == $sessionId][0..0]`,
    { sessionId: stripeCheckoutSessionId },
  );

  if (!orders.length) {
    console.warn(`No order found for session ${stripeCheckoutSessionId}`);
    return;
  }

  await backendClient.patch(orders[0]._id).set({ status }).commit();
}

async function updateStockLevels(stockUpdates: { productId: string; quantity: number }[]) {

  for(const{ productId, quantity} of stockUpdates ){
    try {

      const product = await backendClient.getDocument(productId);

      if(!product || typeof product.stock !== "number"){
        console.warn(`Product with ID ${productId} not found or stock is not a number.`);
        continue;

      }



      const newStock = Math.max(product.stock - quantity, 0);

      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      console.error(`Error updating stock for product ${productId}:`, error);
    }
  }
}
