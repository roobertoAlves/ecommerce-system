import { sanityFetch } from "../lib/live";
import { Category } from "@/sanity.types";
import {
  BLOG_CATEGORIES,
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GET_ALL_BLOG,
  LATEST_BLOG_QUERY,
  MY_ORDERS_QUERY,
  OTHERS_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  SINGLE_BLOG_QUERY,
} from "./query";

const getCategories = async (quantity?: number): Promise<Category[]> => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(title asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(title asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return (data as Category[]) ?? [];
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};

const getFeaturedCategories = async (): Promise<Category[]> => {
  try {
    const query = `*[_type == 'category' && featured == true] | order(title asc) {
      ...,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`;
    const { data } = await sanityFetch({ query });
    return (data as Category[]) ?? [];
  } catch (error) {
    console.log("Error fetching featured categories", error);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching latest Blogs:", error);
    return [];
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching deal Products:", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

const getBrand = async (slug: string): Promise<string | null> => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: { slug },
    });
    const results = product?.data as Array<{ brandName: string | null }> | null;
    return results?.[0]?.brandName ?? null;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
};

const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || null;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all blogs:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: { slug },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching single blog:", error);
    return [];
  }
};

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({ query: BLOG_CATEGORIES });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching blog categories:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching other blogs:", error);
    return [];
  }
};

export {
  getAllBlogs,
  getAllBrands,
  getBlogCategories,
  getBrand,
  getCategories,
  getDealProducts,
  getFeaturedCategories,
  getLatestBlogs,
  getMyOrders,
  getOthersBlog,
  getProductBySlug,
  getSingleBlog,
};
