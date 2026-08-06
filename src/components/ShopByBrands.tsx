// Server component — fetches brand data, renders client shell for translations
import { getAllBrands } from "@/sanity/queries";
import ShopByBrandsClient from "./ShopByBrandsClient";

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return <ShopByBrandsClient brands={brands} />;
};

export default ShopByBrands;
