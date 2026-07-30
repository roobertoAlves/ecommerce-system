import { banner_1 } from "@/app/images";
import Image from "next/image";
import Link from "next/link";
import { Title } from "./ui/text";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-bg-secondary rounded-2xl px-10 lg:px-24 flex items-center justify-between border border-border">
      <div className="space-y-5">
        <Title className="text-text-primary">
          Grab Upto 50% off on <br />
          Selected Items
        </Title>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-btn-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-btn-primary-hover transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-poppins"
        >
          Shop Now
        </Link>
      </div>
      <div>
        <Image
          src={banner_1}
          alt="banner_1"
          className="hidden md:inline-flex w-96"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
