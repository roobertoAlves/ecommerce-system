"use client";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { EXCHANGE_RATES, SupportedCurrency } from "../../actions/currency";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import PriceFormatter from "./PriceFormatter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  const t = useTranslations("orders");
  if (!order) return null;

  const orderCurrency = (order.currency as SupportedCurrency) ?? "usd";
  const rate = EXCHANGE_RATES[orderCurrency] ?? 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{t("details")} — {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-1 text-sm">
          <p><strong>{t("customer")}:</strong> {order.customerName}</p>
          <p><strong>{t("email")}:</strong> {order.email}</p>
          <p><strong>{t("date")}:</strong> {order.orderDate && new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>{t("status")}:</strong> <span className="capitalize text-success font-medium">{order.status}</span></p>
          <p><strong>{t("invoiceNumber")}:</strong> {order.invoice?.number ?? "—"}</p>
          {order.invoice?.hosted_invoice_url && (
            <Link
              href={order.invoice.hosted_invoice_url}
              target="_blank"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold border border-border rounded-md px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
            >
              {t("downloadInvoice")}
            </Link>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product")}</TableHead>
              <TableHead>{t("quantity")}</TableHead>
              <TableHead>{t("price")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.images && (
                    <Image src={urlFor(product.product.images[0]).url()} alt="product" width={50} height={50} className="border rounded-sm shrink-0" />
                  )}
                  {product?.product?.name}
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter amount={(product?.product?.price ?? 0) * rate} currency={orderCurrency} className="text-text-primary font-medium" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-end">
          <div className="w-52 flex flex-col gap-1.5 text-sm">
            {(order.amountDiscount ?? 0) !== 0 && (
              <>
                <div className="flex items-center justify-between">
                  <strong>{t("discount")}:</strong>
                  <PriceFormatter amount={order.amountDiscount} currency={orderCurrency} className="text-text-primary font-bold" />
                </div>
                <div className="flex items-center justify-between">
                  <strong>{t("subtotal")}:</strong>
                  <PriceFormatter amount={(order.totalPrice ?? 0) + (order.amountDiscount ?? 0)} currency={orderCurrency} className="text-text-primary font-bold" />
                </div>
              </>
            )}
            <div className="flex items-center justify-between border-t border-border pt-1.5">
              <strong>{t("total")}:</strong>
              <PriceFormatter amount={order.totalPrice} currency={orderCurrency} className="text-text-primary font-bold text-base" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
