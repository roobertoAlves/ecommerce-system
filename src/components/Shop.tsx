"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Container from "./Container";
import Title from "./Title";
import BrandList from "./shop/BrandList";
import CategoryList from "./shop/CategoryList";
import PriceList from "./shop/PriceList";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-xl font-black uppercase tracking-wide text-text-primary">
              Get the products as your needs
            </Title>
            <button className="text-sm underline underline-offset-2 text-text-primary hover:text-primary hoverEffect">
              Reset Filters
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-border">
          <div
            className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)]
          md:overflow-y-auto [&::-webkit-scrollbar]:hidden md:min-w-64 pb-5 md:border-r border-border"
          >
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
          <div>Products</div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
