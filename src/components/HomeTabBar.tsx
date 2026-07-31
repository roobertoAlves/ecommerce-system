import { productType } from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType?.map((item) => (
          <button
            key={item?.title}
            onClick={() => onTabSelect(item?.value)}
            className={`border px-4 py-1.5 md:px-6 md:py-2 rounded-full transition-all duration-300
                hover:bg-primary hover:border-primary hover:text-white
                ${selectedTab === item?.title ? "bg-primary text-white border-primary" : "bg-primary/10 border-primary/30 text-text-primary"}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link href={"/shop"} className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-300">
        See All
      </Link>
    </div>
  );
};

export default HomeTabBar;
