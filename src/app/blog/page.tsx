import React from "react";
import { Reveal } from "../utils/reveal";
import getPostMetadata from "../utils/post-metadata";
import BlogPostPreview from "../components/blog-post-preview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sarthak Khandelwal | Blog",
  description: "Blog | Sarthak Khandelwal",
};

const Blog = () => {
  const postMetadata = getPostMetadata().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const postPreviews = postMetadata.map((post) => (
    <BlogPostPreview key={post.slug} {...post} />
  ));

  return (
    <div className="">
      <Reveal>
        <div className="flex flex-col">{postPreviews}</div>
      </Reveal>
    </div>
  );
};

export default Blog;
