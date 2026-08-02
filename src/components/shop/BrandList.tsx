import { BRANDS_QUERYResult } from "@/sanity.types";
import { Check } from "lucide-react";
import Title from "../Title";

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandList = ({ brands, selectedBrands, setSelectedBrands }: Props) => {
  const toggle = (slug: string) =>
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  return (
    <div className="w-full p-5">
      <Title className="text-base font-black text-text-primary">Brands</Title>
      <div className="mt-2 space-y-1">
        {brands?.map((brand) => {
          const slug = brand?.slug?.current as string;
          const isSelected = selectedBrands.includes(slug);
          return (
            <div
              key={brand._id}
              onClick={() => toggle(slug)}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <span className={`w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center transition-colors ${isSelected ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
                {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
              </span>
              <span className={`text-sm ${isSelected ? "font-semibold text-primary" : "font-normal text-text-primary"}`}>
                {brand?.title}
              </span>
            </div>
          );
        })}
        {selectedBrands.length > 0 && (
          <button
            onClick={() => setSelectedBrands([])}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] text-text-primary hover:text-primary hoverEffect text-left"
          >
            Reset Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default BrandList;
