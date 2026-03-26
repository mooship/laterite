import type { APIContext } from "astro";
import type { FeedItem } from "../../../src/utils/feed";

export const mockConfig = {
  title: "Test Site",
  description: "Test Description",
  author: { name: "Test Author", bio: "Test Bio" },
  baseUrl: "/",
};

export const mockFeedItems: FeedItem[] = [
  {
    title: "First Post",
    pubDate: new Date("2025-03-01"),
    description: "First excerpt",
    content: "<p>Full first content</p>",
    link: "/dispatches/first-post",
  },
  {
    title: "Second Post",
    pubDate: new Date("2025-02-01"),
    description: "Second excerpt",
    content: "<p>Full second content</p>",
    link: "/dispatches/second-post",
  },
];

export const createContext = (site?: string): APIContext =>
  ({
    site: site ? new URL(site) : undefined,
  }) as unknown as APIContext;
