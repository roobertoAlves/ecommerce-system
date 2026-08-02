import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";

const DealPage = async () => {
  const products = await getDealProducts();

  return (
    <div className="py-10 bg-shop_light_bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div>
          {products?.map((product) => (
            {/* @ts-expect-error -- getDealProducts returns a partial type incompatible with ProductCard's Product prop */}
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
