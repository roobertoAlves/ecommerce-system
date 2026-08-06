"use client";
import { banner_1 } from "@/app/images";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
  const t = useTranslations("home");

  return (
    <div className="py-16 md:py-0 bg-bg-secondary rounded-2xl px-10 lg:px-24 flex items-center justify-between border border-border">
      <div className="space-y-5">
        <h2 className="text-3xl font-bold text-text-primary capitalize tracking-wide mb-5 font-poppins whitespace-pre-line">
          {t("bannerTitle")}
        </h2>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-btn-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-btn-primary-hover transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-poppins"
        >
          {t("bannerCta")}
        </Link>
      </div>
      <Image src={banner_1} alt="banner" className="hidden md:inline-flex w-96" />
    </div>
  );
};

export default HomeBanner;
