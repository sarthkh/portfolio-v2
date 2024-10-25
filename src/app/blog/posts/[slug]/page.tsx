import { Reveal } from "@/app/utils/reveal";
import { notFound } from "next/navigation";
import getPostMetadata from "@/app/utils/post-metadata";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import PostPreview from "@/app/components/home-post-preview";
import AuthorCard from "@/app/components/author-card";
import { srcery } from "react-syntax-highlighter/dist/esm/styles/hljs";

const getPostContent = async (slug: string) => {
  try {
    const folder = "posts/";
    const file = `${folder}/${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    return null;
  }
};

export const generateStaticParams = async () => {
  const posts = await getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface CodeBlockProps {
  language?: string;
  value: string;
}

const CodeBlock = ({ language = "text", value }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={srcery}>
      {value}
    </SyntaxHighlighter>
  );
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata | undefined> {
  const resolvedParams = await params;
  const posts = await getPostMetadata();
  const post = posts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    return;
  }

  const { title, description, image } = post;
  const ogImage = image
    ? `https://sarthkh.vercel.app${image}`
    : `https://sarthkh.vercel.app/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://sarthkh.vercel.app/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const resolvedParams = await params;
  const post = await getPostContent(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const components = {
    code: ({ className, children, ...props }: any) => {
      const language = className ? className.replace("language-", "") : "text";
      return <CodeBlock language={language} value={String(children)} />;
    },
  };

  const postMetadata = await getPostMetadata();
  const filteredPostMetadata = postMetadata
    .filter((p) => p.slug !== resolvedParams.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const postPreviews = filteredPostMetadata
    .slice(0, 3)
    .map((filteredPost) => (
      <PostPreview key={filteredPost.slug} {...filteredPost} />
    ));

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.data.title,
            description: post.data.description,
            author: {
              "@type": "Person",
              name: "Sarthak Khandelwal",
            },
            datePublished: post.data.date,
          }),
        }}
      />

      <div className="">
        <div className="mt-2 mb-2">
          <Reveal>
            <div className="flex flex-col">
              <span className="my-2 font-migra text-4xl sm:text-5xl tracking-wider">
                {post.data.title}
              </span>
              <div className="flex flex-col justify-between items-start md:items-center md:flex-row-reverse">
                <span className="mb-8 md:mb-0 w-fit font-light tracking-wider text-sm">
                  {post.data.date}
                </span>
                <AuthorCard />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col mb-12 space-y-2">
          <Reveal>
            <div className="flex flex-wrap gap-y-2 mt-2">
              {post.data.tags?.map((tag: string) => (
                <p
                  key={tag}
                  className="mr-4 font-mono text-xs text-neutral-500 underline underline-offset-4"
                >
                  #{tag}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <article
          className="blog prose text-neutral-200 prose-strong:text-neutral-200 prose-headings:text-neutral-200 max-w-full
            prose-sm prose-code:text-sm prose-pre:bg-[#1c1b19] prose-pre:my-2 prose-a:underline prose-a:underline-offset-4
            prose-h6:text-xs prose-h6:text-neutral-500 prose-p:font-light
            prose-h5:text-xs prose-h5:border prose-h5:border-b-none prose-h5:border-neutral-500 prose-h5:p-4 prose-h5:rounded-lg prose-h5:bg-opacity-25 prose-h5:border-opacity-50
            prose-h4:text-lg prose-h4:tracking-wider prose-h4:font-normal
            prose-h3:text-xl prose-h3:font-medium prose-h3:tracking-wide
            prose-h2:font-light prose-h2:tracking-wider
            prose-quoteless prose-blockquote:border prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-blockquote:border-neutral-500 prose-blockquote:bg-neutral-500 prose-blockquote:bg-opacity-10 prose-blockquote:text-xs prose-blockquote:text-neutral-500 prose-blockquote:px-4
            prose-hr:border-neutral-500
            prose-img:rounded-lg"
        >
          <Reveal>
            <ReactMarkdown components={components}>
              {post.content}
            </ReactMarkdown>
          </Reveal>
        </article>

        {postPreviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-migra mb-8">More Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {postPreviews}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostPage;
