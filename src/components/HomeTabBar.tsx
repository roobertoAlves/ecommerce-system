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
                hover:bg-btn-primary hover:border-btn-primary hover:text-primary-foreground
                ${selectedTab === item?.value ? "bg-btn-primary text-primary-foreground border-btn-primary" : "bg-surface text-text-primary border-border"}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        href={"/shop"}
        className="text-sm font-semibold text-text-secondary hover:text-btn-primary transition-colors duration-300"
      >
        See All
      </Link>
    </div>
  );
};

export default HomeTabBar;
