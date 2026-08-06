"use client";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { SupportedCurrency } from "../../actions/currency";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import OrderDetailDialog from "./OrderDetailDialog";
import PriceFormatter from "./PriceFormatter";
import { TableBody, TableCell, TableRow } from "./ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const t = useTranslations("orders");
  const [selectedOrder, setSelectedOrder] = useState<MY_ORDERS_QUERYResult[number] | null>(null);

  const handleDelete = () => toast.error(t("deleteAdminOnly"));

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => {
            const orderCurrency = (order?.currency as SupportedCurrency) ?? "usd";
            return (
              <Tooltip key={order?.orderNumber}>
                <TooltipTrigger
                  render={
                    <TableRow
                      className="cursor-pointer hover:bg-bg-secondary h-12"
                      onClick={() => setSelectedOrder(order)}
                    />
                  }
                >
                  <TableCell className="font-medium">{order.orderNumber?.slice(-10) ?? "N/A"}...</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate && format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden sm:table-cell">{order.email}</TableCell>
                  <TableCell>
                    <PriceFormatter amount={order?.totalPrice} currency={orderCurrency} className="text-text-primary font-medium" />
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === "paid" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order?.invoice && <p className="font-medium line-clamp-1">{order.invoice.number ?? "----"}</p>}
                  </TableCell>
                  <TableCell
                    onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                    className="text-center group"
                  >
                    <X size={20} className="group-hover:text-primary hoverEffect mx-auto" />
                  </TableCell>
                </TooltipTrigger>
                <TooltipContent><p>{t("clickDetails")}</p></TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
};

export default OrdersComponent;
