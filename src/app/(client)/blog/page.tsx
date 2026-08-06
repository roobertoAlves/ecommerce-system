import BlogClientShell from "@/components/blog/BlogClientShell";
import { GET_ALL_BLOGResult } from "@/sanity.types";
import { getAllBlogs } from "@/sanity/queries";

const BlogPage = async () => {
  const blogs = (await getAllBlogs(6)) as GET_ALL_BLOGResult;
  return <BlogClientShell blogs={blogs} />;
};

export default BlogPage;
