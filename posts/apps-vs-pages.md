---
title: App Router vs. Pages Router in Next.js
description: Exploring the differences between the App and Pages directories in Next.js
tags: ['Next.js', 'webdev'] 
date: May 8, 2024
---

When I felt comfortable with my React knowledge, I naturally moved on to learning a framework. With so many options available, I didn't know where to start. So, I did what any developer would do &mdash; I googled it. I chose the framework that seemed to have the most support and aligned with what I wanted from React &mdash; Next.js.

Next.js is a powerful framework that provides many features out-of-the-box. While you might not need all of them, understanding these features can be a bit overwhelming at first.

In this blog post, I want to focus on one of the fundamental aspects of Next.js &mdash; routing.

###### Disclaimer &mdash; This is not a comprehensive breakdown of Next.js or all its features. This post outlines my experience with a single feature in Next.js. If you've had a different experience, please feel free to share your thoughts!

## Routing in Next.js
Next.js considers routing as 'the backbone of every application' and uses a file-system based router to handle the behavior.

With the latest version of Next.js (version 14 at the time of writing), the framework has undergone significant changes and additions. The most notable change is the app directory, which handles routing for Next applications. The app directory offers more flexibility and ease-of-use compared to the previous pages directory.

So, what's the difference between the two directories? What are the benefits of the app directory? Should you stick with the pages directory? Or can you use both?

## The Pages Directory
To illustrate some of the differences between the directories, let's use a portfolio as an example. Using the pages directory, the structure might look like this:

```
└── pages     
    ├── index.tsx     
    ├── about.tsx     
    ├── contact.tsx     
    ├── projects.tsx     
    └── blog.tsx   
```

Next.js treats files in the pages directory as routes, provided that the files are React Components exported from a .js, .ts, .jsx, or .tsx file.

For example, if the code below is in the 'about.tsx' file, it will be accessible at '/about'.

```jsx
export default function About() {
  return <div>About Page</div>
}
```

The Pages directory was the primary way to create routes in Next.js before the introduction of the App router. While it offers a simple and straightforward approach to handle routing, it has a defining limitation:

**Simplicity**. The simplicity of the Pages directory is both its greatest strength and weakness. It's ideal for smaller applications with simple, static pages but becomes challenging to manage in larger applications with advanced routing, layouts, dynamic pages, etc. Essentially, the Pages directory is best suited for simple applications. You can find workarounds for more complex tasks, but you may benefit from using the App directory in those cases.

## The App Directory 
Using the App directory, the structure of a portfolio might look like this:

```
src/     
└── app     
    ├── page.tsx     
    ├── globals.css     
    ├── layout.tsx    
    ├── projects
    │   └── [slug]        
    │       └── page.tsx 
    ├── about     
    │   └── page.tsx     
    └── blog
        ├── [slug]
        │   └── page.tsx    
        └── page.tsx         
```

###### The use of a folder in square brackets indicates a dynamic route. The name inside the square brackets corresponds to the parameter we want to capture for the URL.

The App router works in a new directory named app. In the app directory, folders define the routes of your application, from a root folder down to a leaf folder. So, the previous route defined in pages would instead be 'app/about/page.tsx'.

The App router includes new support for shared layouts, server components, streaming, and data fetching. It addresses the limitations of the Pages directory but also introduces its own learning curve:

**Learning Curve**. The main challenge with the App router is getting familiar with its new concepts and techniques. Adopting new approaches and finding new ways to do things that were done differently in the Pages directory can take some time. However, in my opinion, the benefits provided by the App router outweigh the learning curve.

## Choosing the Right Directory
So, which directory should you use? It depends on your specific use case. For new projects, I recommend using the App router and trying to adopt it for your existing work. However, the two routers offer different behaviors for your applications, each with their pros and cons, so it's really a matter of what you feel is best for your needs.

Based on my experience and what I've gathered from others, it might be best to stick with the Pages directory for smaller projects and use the App router for larger, more complex projects.

## Using Both Directories
The App router works alongside the Pages directory, allowing for incremental adoption of the new router. While it's generally advised to use both only during migration, you can use both if you need certain behaviors from each one.

For example, you might use the Pages directory to showcase projects, leveraging functions like getStaticProps and getStaticPaths that aren't supported in the App directory.

###### Tip &mdash; When using both directories, be mindful of the different behaviors in layouts, state management, metadata, routing hooks, data fetching, etc.

### In Pages
getStaticProps tells Next.js to pre-render the page at build time using the props returned by getStaticProps. Here's an example:

```jsx
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const projectData: Project = await fetchProjectData(slug);

  return {
    props: {
      projectData,
    },
  };
};
```

getStaticPaths tells Next.js to statically pre-render all the paths specified by getStaticPaths. A page with dynamic routes that uses getStaticProps needs to define a list of paths to be statically generated. Here's an example:

```jsx
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { slug: 'project-1' } },
    { params: { slug: 'project-2' } },
    // other paths
  ];

  return {
    paths,
    fallback: false,
  };
};
```

### In App
In the App directory, getStaticPaths is replaced with generateStaticParams, simplifying route parameters. Here's an example:

```jsx
export async function generateStaticParams() {
  return [
    { slug: 'project-1' },
    { slug: 'project-2' },
    // other paths
  ];
}
```

Instead of using getStaticProps, you can write a function with hardcoded data and call it in the main component, so it only returns the information for the project that matches the slug (the magic of params!).

```jsx
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = fetchProjectData(params.slug);

  return (
    // main component code
    <h1>{project.title}</h1>
  );
}

const fetchProjectData = (slug: string): Project => {
  const projectDataMap: { [key: string]: Project } = {
    'project-1': {
      // data for project-1
    },
    'project-2': {
      // data for project-2
    },
    // more projects
  };

  return projectDataMap[slug];
};
```

## Metadata in Next.js
Another difference between the Pages and App directories is how metadata is added.

In the Pages directory, you can use the Head component provided by Next.js:

```jsx
<Head>
  <meta property="og:title" content={`Portfolio | ${project.title}`} key="title" />
  <meta property="og:image" content="https://example.com/og-image.png" />
</Head>
```

In the App directory, you have a few options. To define static metadata, you can export a Metadata object:

```jsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Portfolio | Software Developer',
  description: 'Software developer crafting intuitive interfaces, advancing AI, and developing innovative digital solutions.',
};
```

For dynamic metadata, you can use the generateMetadata function:

```jsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostMetadata(params.slug);

  if (!post) {
    return {};
  }

  const { title, description, image } = post;

  const ogImage = image ? `https://example.com${image}` : `https://example.com/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://example.com/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
```

The generateMetadata function returns a Metadata object with one or more metadata fields like title and description, which is used to define the metadata for the dynamic page.

These differences showcase the trade-offs between the Pages and App directories, highlighting that the Pages directory is better for simpler applications, while the App directory is better for more complex applications.

## More about Next.js
**Always read the docs!**  
For more information about the latest version of Next.js, visit [nextjs.org](https://nextjs.org/).  
For more information about migrating from Pages to App, visit [the Incremental Adoption Guide from Next.js](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration).  
For more information about what the App router offers over the Pages router, please visit [nextjs.org](https://nextjs.org/).

## Conclusion
Choosing the right tools can make all the difference when creating efficient and scalable applications, and nearly every approach comes with its own set of considerations. It's important to address these considerations and figure out what will work best for you.

Let me know what you think, and happy coding!