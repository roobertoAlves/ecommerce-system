"use client";
import { Product } from "@/sanity.types";
import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const ProductCharacteristicsClient = ({ product, brandName }: { product: Product | null | undefined; brandName?: string }) => {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");

  return (
    <Accordion multiple={false}>
      <AccordionItem value="item-1">
        <AccordionTrigger>{product?.name}: {t("characteristics")}</AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            {t("brand")}: <span className="font-semibold tracking-wide">{brandName}</span>
          </p>
          <p className="flex items-center justify-between">
            {tCommon("collection")}: <span className="font-semibold tracking-wide">2025</span>
          </p>
          <p className="flex items-center justify-between">
            {t("type")}: <span className="font-semibold tracking-wide">{product?.variant}</span>
          </p>
          <p className="flex items-center justify-between">
            {t("stock")}: <span className="font-semibold tracking-wide">{product?.stock ? tCommon("available") : tCommon("outOfStock")}</span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristicsClient;
