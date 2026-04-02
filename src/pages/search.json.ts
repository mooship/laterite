import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

interface SearchResult {
  title: string;
  url: string;
  datePublished: string;
  excerpt: string;
  categories: string[];
}

function convertToDate(dateValue: unknown): Date {
  if (dateValue instanceof Date) {
    return dateValue;
  }
  if (typeof dateValue === "string" || typeof dateValue === "number") {
    return new Date(dateValue);
  }
  return new Date();
}

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

function processPost(post: CollectionEntry<"dispatches">): SearchResult | null {
  const dateObj = convertToDate(post.data.datePublished);
  const datePublished = isValidDate(dateObj) ? dateObj.toISOString() : null;

  if (!datePublished) {
    return null;
  }

  return {
    title: post.data.title || "Untitled",
    url: `/dispatches/${post.id}`,
    datePublished,
    excerpt: post.data.excerpt || post.data.description || "",
    categories: Array.isArray(post.data.categories) ? post.data.categories : [],
  };
}

export const GET: APIRoute = async () => {
  try {
    const posts = await getCollection("dispatches");

    const allProcessed = posts
      .filter(
        (post): post is CollectionEntry<"dispatches"> =>
          post && post.data && post.data.draft !== true
      )
      .filter((post) => {
        const date = convertToDate(post.data.datePublished);
        return isValidDate(date) && date.getTime() <= Date.now();
      })
      .map((post) => processPost(post))
      .filter((item): item is SearchResult => item !== null);

    const searchData: SearchResult[] = allProcessed.toSorted(
      (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );

    return Response.json(searchData, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating search data:", error);
    return Response.json([], {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
};
