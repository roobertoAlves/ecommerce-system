"use client";
import { BLOG_CATEGORIESResult, OTHERS_BLOG_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface Props {
  categories: BLOG_CATEGORIESResult;
  blogs: OTHERS_BLOG_QUERYResult;
}

export default function BlogSidebar({ categories, blogs }: Props) {
  const t = useTranslations("blog");
  return (
    <div className="space-y-8">
      <div className="border border-border p-5 rounded-md bg-surface">
        <h3 className="font-semibold text-text-primary font-poppins mb-3">{t("categories")}</h3>
        <div className="space-y-2">
          {categories?.map(({ blogcategories }, index) => (
            <div key={index} className="text-text-muted flex items-center justify-between text-sm font-medium">
              <p>{blogcategories?.[0]?.title ?? "—"}</p>
              <p className="text-text-primary font-semibold">(1)</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-border p-5 rounded-md bg-surface">
        <h3 className="font-semibold text-text-primary font-poppins mb-4">{t("latest")}</h3>
        <div className="space-y-4">
          {blogs?.map((blog, index) => (
            <Link href={`/blog/${blog?.slug?.current}`} key={index} className="flex items-center gap-2 group">
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt="blog"
                  width={100}
                  height={100}
                  className="w-16 h-16 rounded-full object-cover border border-border group-hover:border-primary hoverEffect"
                />
              )}
              <p className="line-clamp-2 text-sm text-text-muted group-hover:text-primary hoverEffect">{blog?.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
