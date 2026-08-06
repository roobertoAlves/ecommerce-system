"use client";

import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Title from "./Title";

// Type mirrors what getLatestBlogs() returns
type BlogItem = {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  mainImage?: SanityImageSource | null;
  publishedAt?: string | null;
  blogcategories?: Array<{ title?: string | null }> | null;
};

export default function LatestBlogClient({ blogs }: { blogs: BlogItem[] }) {
  const t = useTranslations("home");

  return (
    <div className="mb-10 lg:mb-20">
      <Title>{t("latestBlog")}</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {blogs?.map((blog) => (
          <div key={blog._id} className="rounded-lg overflow-hidden">
            {blog.mainImage && (
              <Link href={`/blog/${blog.slug?.current}`}>
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt={blog.title ?? "Blog"}
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
              </Link>
            )}
            <div className="bg-bg-secondary p-5 rounded-lg">
              <div className="text-xs flex items-center gap-5">
                <div className="flex items-center relative group cursor-pointer">
                  {blog.blogcategories?.map((item, index) => (
                    <p key={index} className="font-semibold text-primary tracking-wider">{item?.title}</p>
                  ))}
                  <span className="absolute left-0 -bottom-1.5 bg-text-muted/30 inline-block w-full h-0.5 group-hover:bg-primary hoverEffect" />
                </div>
                <p className="flex items-center gap-1 text-text-muted relative group hover:cursor-pointer hover:text-primary hoverEffect">
                  <Calendar size={15} /> {dayjs(blog.publishedAt).format("DD MMM, YYYY")}
                  <span className="absolute left-0 -bottom-1.5 bg-text-muted/30 inline-block w-full h-0.5 group-hover:bg-primary hoverEffect" />
                </p>
              </div>
              <Link
                href={`/blog/${blog.slug?.current}`}
                className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-primary hoverEffect block"
              >
                {blog.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
