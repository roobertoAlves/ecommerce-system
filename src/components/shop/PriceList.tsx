import Title from "../Title";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const priceArray = [
  { title: "Under $10", value: "0-100" },
  { title: "$100 - $200", value: "50-100" },
  { title: "$200 - $300", value: "100-200" },
  { title: "$300 - $400", value: "300-400" },
  { title: "$400 - $500", value: "400-500" },
  { title: "$500 - $600", value: "500-600" },
  { title: "$600 - $700", value: "600-700" },
  { title: "$700 - $800", value: "700-800" },
  { title: "$800 - $900", value: "800-900" },
  { title: "Over $900", value: "900-100000" },
];

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full p-5">
      <Title className="text-base font-black text-text-primary">Price</Title>
      <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
        {priceArray?.map((price) => (
          <div
            key={price.value}
            onClick={() => {
              setSelectedPrice(price?.value);
            }}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.title}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={priceArray[0]?.value}
              className={`${selectedPrice === price?.value ? "font-semibold text-primary" : "font-normal text-text-primary"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
        {selectedPrice && (
          <button
            onClick={() => setSelectedPrice(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] text-text-primary hover:text-primary hoverEffect text-left"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default PriceList;
