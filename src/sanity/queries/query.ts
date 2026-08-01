import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(` *[_type == "brand"] | order(name asc)`);

const LATEST_BLOG_QUERY = defineQuery(
  ` *[_type == "blog" && isLatest == true] | order(name desc){ ..., blogcategories[]->{ title } }`,
);

const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc) {
   ..., "categories": categories[]-> title }
   }`,
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
    ...,
    "categories": categories[]->title
  }`,
);

const BRAND_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]{
    "brandName": brand->title
  }`,
);
export {
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  LATEST_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
};
