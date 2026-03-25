import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { config } from "../config";

interface RSSItem {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
}

interface PostFrontmatter {
  title?: string;
  datePublished: string | Date;
  excerpt?: string;
  description?: string;
  draft?: boolean;
}

interface PostModule {
  frontmatter: PostFrontmatter;
  default: unknown;
}

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

function processPost(path: string, post: unknown): RSSItem | null {
  if (!post || typeof post !== "object") {
    return null;
  }

  const postData = post as PostModule;
  if (!postData.frontmatter) {
    return null;
  }

  const { title, datePublished, excerpt, description, draft } = postData.frontmatter;

  if (draft === true) {
    return null;
  }

  const date = new Date(datePublished);
  if (!isValidDate(date) || date.getTime() > Date.now()) {
    return null;
  }

  const slug =
    path
      .split("/")
      .pop()
      ?.replace(/\.(md|mdx)$/, "") || "";

  return {
    title: title || "Untitled",
    pubDate: date,
    description: excerpt || description || "",
    link: `/dispatches/${slug}/`,
  };
}

export const GET: APIRoute = async (context) => {
  const posts = import.meta.glob<PostModule>("../content/dispatches/*.{md,mdx}", { eager: true });

  const items: RSSItem[] = Object.entries(posts)
    .map(([path, post]) => processPost(path, post))
    .filter((item): item is RSSItem => item !== null)
    .toSorted((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const siteUrl = context.site ? new URL(context.site).toString() : "/";

  return rss({
    title: config.title,
    description: config.description,
    site: context.site || new URL("http://localhost"),
    items,
    customData: `
      <language>en-gb</language>
      <atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>
    `,
  });
};
