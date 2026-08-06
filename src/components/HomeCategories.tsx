"use client";
import { urlFor } from "@/sanity/lib/image";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Category } from "../../sanity.types";
import Title from "./Title";

type CategoryWithCount = Category & { productCount?: number };

const HomeCategories = ({ categories }: { categories: CategoryWithCount[] }) => {
  const t = useTranslations("home");

  return (
    <div className="bg-surface border border-border/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">{t("popularCategories")}</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <Link
            key={category._id}
            href={{ pathname: "/shop", query: { category: category.slug?.current } }}
            className="bg-bg-secondary p-5 flex items-center gap-3 group rounded-sm hover:bg-primary/10 transition-colors duration-300"
          >
            {category.image && (
              <div className="overflow-hidden border border-border group-hover:border-primary hoverEffect w-20 h-20 p-1 shrink-0">
                <Image
                  src={urlFor(category.image).url()}
                  alt={category.title ?? "Category"}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                />
              </div>
            )}
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm text-text-muted">
                <span className="font-bold text-text-secondary">({category.productCount ?? 0})</span>{" "}
                {t("itemsAvailable")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
