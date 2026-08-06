"use client";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileX } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import OrdersComponent from "./OrdersComponent";

function EmptyOrders() {
  const t = useTranslations("orders");
  const tCommon = useTranslations("common");
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <FileX className="h-24 w-24 text-text-muted mb-4" />
      <h2 className="text-2xl font-semibold text-text-primary">{t("noOrders")}</h2>
      <p className="mt-2 text-sm text-text-muted text-center max-w-md">{t("noOrdersText")}</p>
      <Link href="/" className={buttonVariants({ className: "mt-6" })}>
        {tCommon("browseProducts")}
      </Link>
    </div>
  );
}

function OrdersTable({ orders }: { orders: MY_ORDERS_QUERYResult }) {
  const t = useTranslations("orders");
  return (
    <Card className="w-full">
      <CardHeader><CardTitle>{t("title")}</CardTitle></CardHeader>
      <CardContent>
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25 md:w-auto">{t("orderNumber")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("date")}</TableHead>
                <TableHead>{t("customer")}</TableHead>
                <TableHead className="hidden sm:table-cell">{t("email")}</TableHead>
                <TableHead>{t("total")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="hidden sm:table-cell">{t("invoiceNumber")}</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <OrdersComponent orders={orders} />
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default function OrdersShell({ orders }: { orders: MY_ORDERS_QUERYResult }) {
  if (!orders?.length) return <EmptyOrders />;
  return <OrdersTable orders={orders} />;
}
