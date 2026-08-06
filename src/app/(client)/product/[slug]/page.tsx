// Server component — only fetches data; rendering is delegated to client component
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductBySlug } from "@/sanity/queries";

const SingleProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return null;
  return <ProductDetailClient product={product} />;
};

export default SingleProductPage;
