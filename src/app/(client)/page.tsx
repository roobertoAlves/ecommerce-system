import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries/index";

const FEATURED_CATEGORY_SLUGS = [
  "gadget",
  "gadgets",
  "smartphone",
  "smartphones",
  "mobile",
  "mobiles",
  "appliance",
  "appliances",
  "kitchen-appliance",
  "kitchen-appliances",
  "air-conditioner",
  "air-conditioners",
  "washing-machine",
  "washing-machines",
  "refrigerator",
  "refrigerators",
];

const Home = async () => {
  const allCategories = await getCategories(20);
  const categories = allCategories.filter((c) =>
    FEATURED_CATEGORY_SLUGS.includes(c.slug?.current ?? ""),
  );

  return (
    <Container className="bg-background">
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
        <HomeCategories categories={categories} />
        <ShopByBrands />
        <LatestBlog />
      </div>
    </Container>
  );
};

export default Home;
