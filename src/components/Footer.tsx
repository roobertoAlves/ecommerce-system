import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SubText, SubTitle } from "./ui/text";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Discover a wide range of products, from fashion and electronics to
              home essentials, all at competitive prices. Enjoy a seamless
              shopping experience with fast delivery and excellent customer
              service.
            </SubText>
            <SocialMedia />
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-text-muted hover:text-primary transition-colors duration-300 text-sm font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="text-text-muted hover:text-primary transition-colors duration-300 text-sm font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Subscribe to our newsletter to stay updated on the latest news and
              offers.
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Enter your Email" type="email" required />
              <Button className="w-full" size="lg">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t border-border text-center text-sm text-text-muted font-poppins">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm inline" /> All rights
            reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
