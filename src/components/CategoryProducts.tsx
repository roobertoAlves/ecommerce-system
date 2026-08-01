"use client";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category } from "../../sanity.types";
import { client } from "../sanity/lib/client";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedSlug, setFetchedSlug] = useState(slug);
  const router = useRouter();

  const handleCategoryChange = async (newSlug: string) => {
    if (newSlug == currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  useEffect(() => {
    const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug]._id)] | order(name asc){
      ...,"categories": categories[]->title}`;

    (async () => {
      setLoading(true);
      try {
        const data = await client.fetch(query, { categorySlug: currentSlug });
        setProducts(data);
        setFetchedSlug(currentSlug);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item?.slug?.current as string)}
            key={item?._id}
            className={`bg-transparent border-0 p-0 rounded-none text-text-primary shadow-none
              hover:bg-primary hover:text-primary-foreground
              font-semibold hoverEffect border-b last:border-b-0 transition-colors capitalize ${
                item?.slug?.current === currentSlug &&
                "bg-primary text-primary-foreground border-primary"
              }`}
          >
            <p className="w-full text-left px-2">{item?.title}</p>
          </Button>
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-bg-secondary rounded-lg w-full"
            >
              <div className="flex items-center space-x-2 text-primary">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Product is loading...</span>
              </div>
            </motion.div>
          ) : products?.length > 0 ? (
            <motion.div
              key={currentSlug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5"
            >
              {products?.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NoProductAvailable selectedTab={fetchedSlug} className="mt-0 w-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoryProducts;
