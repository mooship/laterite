import { describe, expect, it } from "vitest";
import type { Post } from "../../src/utils/posts";
import {
  filterPublished,
  HOME_POSTS_LIMIT,
  RECENT_POSTS_LIMIT,
  SEARCH_RESULTS_LIMIT,
  sortByDateDesc,
} from "../../src/utils/posts";

function makePost(overrides: Partial<Post["frontmatter"]> & { file?: string } = {}): Post {
  const { file, ...frontmatterOverrides } = overrides;
  return {
    frontmatter: {
      title: "Test Post",
      datePublished: "2025-01-15",
      excerpt: "Test excerpt",
      categories: ["Test"],
      tags: ["test"],
      ...frontmatterOverrides,
    },
    file: file ?? "/content/dispatches/test.md",
    Content: null,
  };
}

describe("filterPublished", () => {
  it("should include published, non-draft, past-dated posts", () => {
    const posts = [makePost({ datePublished: "2024-01-01" })];
    expect(filterPublished(posts)).toHaveLength(1);
  });

  it("should filter out draft posts", () => {
    const posts = [makePost({ draft: true })];
    expect(filterPublished(posts)).toHaveLength(0);
  });

  it("should filter out future-dated posts", () => {
    const posts = [makePost({ datePublished: "2099-12-31" })];
    expect(filterPublished(posts)).toHaveLength(0);
  });

  it("should filter out posts with invalid dates", () => {
    const posts = [makePost({ datePublished: "not-a-date" })];
    expect(filterPublished(posts)).toHaveLength(0);
  });

  it("should handle an empty array", () => {
    expect(filterPublished([])).toEqual([]);
  });

  it("should include posts with draft explicitly set to false", () => {
    const posts = [makePost({ draft: false, datePublished: "2024-06-01" })];
    expect(filterPublished(posts)).toHaveLength(1);
  });

  it("should include posts with no draft field (defaults to undefined/falsy)", () => {
    const post = makePost({ datePublished: "2024-06-01" });
    delete (post.frontmatter as any).draft;
    expect(filterPublished([post])).toHaveLength(1);
  });
});

describe("sortByDateDesc", () => {
  it("should sort posts by date in descending order", () => {
    const posts = [
      makePost({ title: "Old", datePublished: "2024-01-01" }),
      makePost({ title: "New", datePublished: "2025-03-01" }),
      makePost({ title: "Mid", datePublished: "2024-06-15" }),
    ];
    const sorted = sortByDateDesc(posts);
    expect(sorted.map((p) => p.frontmatter.title)).toEqual(["New", "Mid", "Old"]);
  });

  it("should not mutate the original array", () => {
    const posts = [
      makePost({ title: "B", datePublished: "2024-01-01" }),
      makePost({ title: "A", datePublished: "2025-01-01" }),
    ];
    const sorted = sortByDateDesc(posts);
    expect(posts[0].frontmatter.title).toBe("B");
    expect(sorted[0].frontmatter.title).toBe("A");
  });

  it("should handle an empty array", () => {
    expect(sortByDateDesc([])).toEqual([]);
  });

  it("should handle a single post", () => {
    const posts = [makePost()];
    expect(sortByDateDesc(posts)).toHaveLength(1);
  });
});

describe("constants", () => {
  it("should export expected limit values", () => {
    expect(RECENT_POSTS_LIMIT).toBe(5);
    expect(HOME_POSTS_LIMIT).toBe(3);
    expect(SEARCH_RESULTS_LIMIT).toBe(10);
  });
});
