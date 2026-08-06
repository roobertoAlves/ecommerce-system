"use client";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Title from "../Title";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

interface Props {
  selectedPrices: string[];
  setSelectedPrices: React.Dispatch<React.SetStateAction<string[]>>;
}

const PriceList = ({ selectedPrices, setSelectedPrices }: Props) => {
  const t = useTranslations("shop");
  const tCommon = useTranslations("common");

  const toggle = (value: string) =>
    setSelectedPrices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  return (
    <div className="w-full p-5">
      <Title className="text-base font-black text-text-primary">{t("price")}</Title>
      <div className="mt-2 space-y-1">
        {priceArray.map((price) => {
          const isSelected = selectedPrices.includes(price.value);
          return (
            <div key={price.value} onClick={() => toggle(price.value)} className="flex items-center space-x-2 cursor-pointer group">
              <span className={`w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center transition-colors ${isSelected ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
                {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
              </span>
              <span className={`text-sm ${isSelected ? "font-semibold text-primary" : "font-normal text-text-primary"}`}>
                {price.title}
              </span>
            </div>
          );
        })}
        {selectedPrices.length > 0 && (
          <button
            onClick={() => setSelectedPrices([])}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-1 text-text-primary hover:text-primary hoverEffect text-left"
          >
            {tCommon("resetSelection")}
          </button>
        )}
      </div>
    </div>
  );
};

export default PriceList;
