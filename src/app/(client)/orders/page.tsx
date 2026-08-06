import Container from "@/components/Container";
import OrdersShell from "@/components/OrdersShell";
import { getMyOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/");
  const orders = await getMyOrders(userId);

  return (
    <div>
      <Container className="py-10">
        <OrdersShell orders={orders ?? []} />
      </Container>
    </div>
  );
};

export default OrdersPage;
