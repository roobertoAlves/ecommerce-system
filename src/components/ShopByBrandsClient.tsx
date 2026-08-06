"use client";

import { urlFor } from "@/sanity/lib/image";
import { BRANDS_QUERYResult } from "@/sanity.types";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Title from "./Title";

export default function ShopByBrandsClient({ brands }: { brands: BRANDS_QUERYResult }) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const extraData = [
    { titleKey: "freeDelivery" as const, descKey: "freeDeliveryDesc" as const, Icon: Truck },
    { titleKey: "freeReturn" as const, descKey: "freeReturnDesc" as const, Icon: GitCompareArrows },
    { titleKey: "customerSupport" as const, descKey: "customerSupportDesc" as const, Icon: Headset },
    { titleKey: "moneyBack" as const, descKey: "moneyBackDesc" as const, Icon: ShieldCheck },
  ];

  return (
    <div className="mb-10 lg:mb-20 bg-bg-secondary p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>{t("shopByBrands")}</Title>
        <Link href="/shop" className="text-sm font-semibold tracking-wide hover:text-primary hoverEffect">
          {tCommon("viewAll")}
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((brand) => (
          <Link
            key={brand._id}
            href={{ pathname: "/shop", query: { brand: brand.slug?.current } }}
            className="bg-surface w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-primary/20 hoverEffect"
          >
            {brand.image && (
              <Image
                src={urlFor(brand.image).url()}
                alt={brand.title ?? "Brand"}
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
              />
            )}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 py-5">
        {extraData.map(({ titleKey, descKey, Icon }) => (
          <div key={titleKey} className="flex items-center gap-3 group text-text-muted hover:text-primary">
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              <Icon size={45} />
            </span>
            <div className="text-sm">
              <p className="text-text-primary font-bold capitalize">{t(titleKey)}</p>
              <p className="text-text-muted">{t(descKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
