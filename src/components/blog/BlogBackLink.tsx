"use client";
import { useTranslations } from "next-intl";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function BlogBackLink() {
  const t = useTranslations("blog");
  return (
    <Link href="/blog" className="flex items-center gap-1 text-text-muted hover:text-primary transition-colors mt-10">
      <ChevronLeftIcon className="size-5" />
      <span className="text-sm font-semibold">{t("backTo")}</span>
    </Link>
  );
}
