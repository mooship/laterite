import { describe, expect, it } from "vitest";
import { getFeedItems, processPost } from "../../src/utils/feed.ts";

describe("processPost", () => {
  const validPost = {
    frontmatter: {
      title: "Test Post",
      datePublished: "2025-01-15",
      excerpt: "A test excerpt",
      draft: false,
    },
    compiledContent: () => "<p>Full content here</p>",
  };

  it("should return a feed item for a valid post", () => {
    const result = processPost("src/content/dispatches/test-post.md", validPost);
    expect(result).not.toBeNull();
    expect(result!.title).toBe("Test Post");
    expect(result!.description).toBe("A test excerpt");
    expect(result!.content).toBe("<p>Full content here</p>");
    expect(result!.link).toMatch(/dispatches\/test-post/);
  });

  it("should exclude draft posts", () => {
    const draft = {
      frontmatter: { ...validPost.frontmatter, draft: true },
    };
    expect(processPost("src/content/dispatches/draft.md", draft)).toBeNull();
  });

  it("should exclude future-dated posts", () => {
    const future = {
      frontmatter: { ...validPost.frontmatter, datePublished: "2099-01-01" },
    };
    expect(processPost("src/content/dispatches/future.md", future)).toBeNull();
  });

  it("should exclude posts with invalid dates", () => {
    const invalid = {
      frontmatter: { ...validPost.frontmatter, datePublished: "not-a-date" },
    };
    expect(processPost("src/content/dispatches/bad.md", invalid)).toBeNull();
  });

  it("should return null for null or non-object input", () => {
    expect(processPost("path.md", null)).toBeNull();
    expect(processPost("path.md", "string")).toBeNull();
  });

  it("should return null for posts without frontmatter", () => {
    expect(processPost("path.md", { default: null })).toBeNull();
  });

  it("should fall back to description when excerpt is missing", () => {
    const post = {
      frontmatter: {
        title: "No Excerpt",
        datePublished: "2025-01-15",
        description: "Fallback desc",
      },
    };
    const result = processPost("src/content/dispatches/no-excerpt.md", post);
    expect(result!.description).toBe("Fallback desc");
  });

  it("should default title to Untitled", () => {
    const post = {
      frontmatter: { datePublished: "2025-01-15", excerpt: "Some excerpt" },
    };
    const result = processPost("src/content/dispatches/untitled.md", post);
    expect(result!.title).toBe("Untitled");
  });

  it("should handle posts without compiledContent", () => {
    const post = {
      frontmatter: {
        title: "No Content",
        datePublished: "2025-01-15",
        excerpt: "Excerpt only",
      },
    };
    const result = processPost("src/content/dispatches/no-content.md", post);
    expect(result!.content).toBeUndefined();
  });
});

describe("getFeedItems", () => {
  it("should return an array of feed items", () => {
    const items = getFeedItems();
    expect(Array.isArray(items)).toBe(true);
  });

  it("should return items with required fields", () => {
    const items = getFeedItems();
    for (const item of items) {
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("pubDate");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("content");
      expect(item).toHaveProperty("link");
      expect(typeof item.title).toBe("string");
      expect(item.pubDate).toBeInstanceOf(Date);
      expect(typeof item.description).toBe("string");
      expect(item.link).toMatch(/dispatches\//);
    }
  });

  it("should sort items by date descending", () => {
    const items = getFeedItems();
    if (items.length > 1) {
      for (let i = 0; i < items.length - 1; i++) {
        expect(items[i].pubDate.getTime()).toBeGreaterThanOrEqual(items[i + 1].pubDate.getTime());
      }
    }
  });

  it("should not include future-dated posts", () => {
    const items = getFeedItems();
    const now = Date.now();
    for (const item of items) {
      expect(item.pubDate.getTime()).toBeLessThanOrEqual(now);
    }
  });
});
