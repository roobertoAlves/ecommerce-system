"use client";
import { categoriesData, quickLinksData } from "@/constants/data";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-surface border-t border-border">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-text-muted text-sm leading-relaxed">
              {t("newsletterText")}
            </p>
            <SocialMedia />
          </div>

          <div>
            <h3 className="font-semibold text-text-primary font-poppins mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {quickLinksData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-text-muted hover:text-primary transition-colors duration-300 text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary font-poppins mb-4">{t("categories")}</h3>
            <ul className="space-y-3">
              {categoriesData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={{ pathname: "/shop", query: { category: item.slug } }}
                    className="text-text-muted hover:text-primary transition-colors duration-300 text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary font-poppins">{t("newsletter")}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{t("newsletterText")}</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder={t("emailPlaceholder")} type="email" required />
              <Button className="w-full" size="lg">{t("subscribe")}</Button>
            </form>
          </div>
        </div>

        <div className="py-6 border-t border-border text-center text-sm text-text-muted font-poppins">
          © {new Date().getFullYear()} <Logo className="text-sm inline" /> {t("allRights")}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
