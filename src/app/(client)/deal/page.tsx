import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";

const DealPage = async () => {
  const products = await getDealProducts();

  return (
    <div className="py-10 bg-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product as unknown as Parameters<typeof ProductCard>[0]["product"]} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
