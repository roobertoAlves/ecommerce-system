// Server component — fetches blog data, renders client shell for translations
import { getLatestBlogs } from "@/sanity/queries";
import LatestBlogClient from "./LatestBlogClient";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return <LatestBlogClient blogs={blogs} />;
};

export default LatestBlog;
