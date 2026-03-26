import rss from "@astrojs/rss";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "../../src/pages/rss.xml.ts";
import { createContext, mockConfig, mockFeedItems } from "./fixtures/feed-mocks";

vi.mock("@astrojs/rss", () => ({
  default: vi.fn(() => ({ status: 200, body: "rss content" })),
}));

vi.mock("../../src/config", () => ({ config: mockConfig }));

vi.mock("../../src/utils/feed", () => ({
  getFeedItems: () => mockFeedItems,
  resolveSiteUrl: (ctx: any) =>
    ctx.site ? new URL(ctx.site).toString().replace(/\/$/, "") : "http://localhost",
}));

describe("rss.xml", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate RSS feed with correct structure", async () => {
    const context = createContext("https://example.com") as any;
    await GET(context);

    expect(rss).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Site",
        description: "Test Description",
        site: expect.any(URL),
        items: expect.any(Array),
        customData: expect.stringContaining(
          '<atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>'
        ),
      })
    );

    const callArgs = (rss as any).mock.calls[0][0];
    expect(callArgs.items).toHaveLength(2);
    expect(callArgs.items[0].title).toBe("First Post");
    expect(callArgs.items[0].pubDate).toBeInstanceOf(Date);
    expect(callArgs.items[0].description).toBe("First excerpt");
    expect(callArgs.items[0].content).toBe("<p>Full first content</p>");
    expect(callArgs.items[0].link).toBe("/dispatches/first-post");
  });

  it("should pass items as an array", async () => {
    const context = createContext("https://example.com") as any;
    await GET(context);

    const callArgs = (rss as any).mock.calls[0][0];
    expect(Array.isArray(callArgs.items)).toBe(true);
  });

  it("should handle context without site URL", async () => {
    const context = createContext() as any;
    await GET(context);

    const callArgs = (rss as any).mock.calls[0][0];
    expect(callArgs.site).toBeInstanceOf(URL);
  });
});
