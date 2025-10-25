import BlogCard from "../BlogCard";
import blogImage from "@assets/generated_images/Docker_blog_post_header_e507f7e5.png";

export default function BlogCardExample() {
  return (
    <BlogCard
      title="Getting Started with Docker"
      excerpt="Learn the fundamentals of containerization and how to get started with Docker for your development workflow"
      image={blogImage}
      category="DevOps"
      date="Jan 15, 2024"
      readTime="5 min read"
      slug="getting-started-with-docker"
    />
  );
}
