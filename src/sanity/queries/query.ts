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

export { BRANDS_QUERY, DEAL_PRODUCTS, LATEST_BLOG_QUERY };
