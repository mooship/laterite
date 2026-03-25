export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];

  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, "");

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(withoutFrontmatter)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replaceAll(/[^\w\s-]/g, "")
      .replaceAll(/\s+/g, "-")
      .replaceAll(/^-+|-+$/g, "");

    headings.push({ depth, text, slug });
  }

  return headings;
}

export function filterHeadingsForTOC(headings: Heading[]): Heading[] {
  return headings.filter((h) => h.depth === 2 || h.depth === 3);
}
