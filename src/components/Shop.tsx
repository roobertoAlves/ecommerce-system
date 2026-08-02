"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./Container";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
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
  const categoryParams = searchParams?.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParams ? [categoryParams] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParams ? [brandParams] : [],
  );
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const priceCondition =
          selectedPrices.length === 0
            ? "true"
            : selectedPrices
                .map((p) => {
                  const [min, max] = p.split("-").map(Number);
                  return `(price >= ${min} && price <= ${max})`;
                })
                .join(" || ");

        const categoryCondition =
          selectedCategories.length === 0
            ? "true"
            : `count((categories[]->slug.current)[@ in ${JSON.stringify(selectedCategories)}]) > 0`;

        const brandCondition =
          selectedBrands.length === 0
            ? "true"
            : `brand->slug.current in ${JSON.stringify(selectedBrands)}`;

        const query = `
          *[_type == 'product'
            && (${categoryCondition})
            && (${brandCondition})
            && (${priceCondition})
          ]
          | order(name asc) {
            ...,"categories": categories[]->title
          }
        `;

        const data = await client.fetch(
          query,
          {},
          { next: { revalidate: 0 } },
        );

        if (!cancelled) setProducts(data);
      } catch (error) {
        console.log("Shop error fetching products:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [selectedCategories, selectedBrands, selectedPrices]);

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedPrices.length > 0;

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-xl font-black uppercase tracking-wide text-text-primary">
              Get the products as your needs
            </Title>
            {hasFilters && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setSelectedPrices([]);
                }}
                className="text-sm font-medium underline underline-offset-2 text-text-primary hover:text-primary hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-border">
          <div
            className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)]
          md:overflow-y-auto [&::-webkit-scrollbar]:hidden md:min-w-64 pb-5 md:border-r border-border"
          >
            <CategoryList
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <BrandList
              brands={brands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
            />
            <PriceList
              selectedPrices={selectedPrices}
              setSelectedPrices={setSelectedPrices}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-surface">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading...
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-surface mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
