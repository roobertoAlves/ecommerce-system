"use client";
import { Category } from "@/sanity.types";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Title from "../Title";

interface Props {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryList = ({ categories, selectedCategories, setSelectedCategories }: Props) => {
  const t = useTranslations("shop");
  const tCommon = useTranslations("common");

  const toggle = (slug: string) =>
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );

  return (
    <div className="w-full p-5">
      <Title className="text-base font-black text-text-primary">{t("productCategories")}</Title>
      <div className="mt-2 space-y-1">
        {categories.map((category) => {
          const slug = category.slug?.current as string;
          const isSelected = selectedCategories.includes(slug);
          return (
            <div key={category._id} onClick={() => toggle(slug)} className="flex items-center space-x-2 cursor-pointer group">
              <span className={`w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center transition-colors ${isSelected ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
                {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
              </span>
              <span className={`text-sm ${isSelected ? "font-semibold text-primary" : "font-normal text-text-primary"}`}>
                {category.title}
              </span>
            </div>
          );
        })}
        {selectedCategories.length > 0 && (
          <button
            onClick={() => setSelectedCategories([])}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-1 text-text-primary hover:text-primary hoverEffect text-left"
          >
            {tCommon("resetSelection")}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
