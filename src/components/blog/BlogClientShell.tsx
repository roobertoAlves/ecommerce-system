"use client";
import Container from "@/components/Container";
import { GET_ALL_BLOGResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function BlogClientShell({ blogs }: { blogs: GET_ALL_BLOGResult }) {
  const t = useTranslations("blog");
  return (
    <div>
      <Container className="py-10">
        <h2 className="text-3xl font-bold text-text-primary capitalize tracking-wide mb-8 font-poppins">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs?.map((blog) => (
            <div key={blog._id} className="rounded-md overflow-hidden group border border-border bg-surface hover:shadow-lg transition-shadow">
              {blog.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt={blog.title ?? "Blog Image"}
                  width={500}
                  height={500}
                  className="w-full max-h-60 object-cover"
                />
              )}
              <div className="p-5 space-y-3">
                <div className="text-xs flex items-center gap-4 text-text-muted">
                  <div className="flex items-center flex-wrap gap-1">
                    {blog.blogcategories?.map((item: { title: string | null }, index: number) => (
                      <p key={index} className="font-semibold text-primary tracking-wider">{item?.title}</p>
                    ))}
                  </div>
                  <p className="flex items-center gap-1">
                    <Calendar size={13} /> {dayjs(blog.publishedAt).format("DD/MM/YYYY")}
                  </p>
                </div>
                <Link
                  href={`/blog/${blog.slug?.current}`}
                  className="text-base font-bold tracking-wide line-clamp-2 text-text-primary hover:text-primary transition-colors hoverEffect block"
                >
                  {blog.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
