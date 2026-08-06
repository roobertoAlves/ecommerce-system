"use client";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { Product } from "@/sanity.types";
import { useTranslations } from "next-intl";

export default function DealClientShell({ products }: { products: unknown[] }) {
  const t = useTranslations("deals");
  return (
    <div className="py-10 bg-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          {t("title")}
        </Title>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products?.map((product) => (
            <ProductCard key={(product as Product)?._id} product={product as Product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
