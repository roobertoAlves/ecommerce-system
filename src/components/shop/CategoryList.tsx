import { Category } from "@/sanity.types";
import Title from "../Title";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full p-5">
      <Title className="text-base font-black text-text-primary">Product Categories</Title>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories.map((category) => (
          <div
            onClick={() => {
              setSelectedCategory(category?.slug?.current as string);
            }}
            key={category?._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={category?.slug?.current as string}
              id={category?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={category?.slug?.current}
              className={`${selectedCategory === category?.slug?.current ? "font-semibold text-primary" : "font-normal text-text-primary"}`}
            >
              {category?.title}
            </Label>
          </div>
        ))}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] text-text-primary hover:text-primary hoverEffect text-left"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default CategoryList;
