import DealClientShell from "@/components/DealClientShell";
import { getDealProducts } from "@/sanity/queries";

const DealPage = async () => {
  const products = await getDealProducts();
  return <DealClientShell products={products} />;
};

export default DealPage;
