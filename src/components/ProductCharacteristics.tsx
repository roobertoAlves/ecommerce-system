import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import ProductCharacteristicsClient from "./ProductCharacteristicsClient";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brandName = await getBrand(product?.slug?.current as string);
  return <ProductCharacteristicsClient product={product} brandName={brandName ?? undefined} />;
};

export default ProductCharacteristics;
