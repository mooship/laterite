export interface PostFrontmatter {
  title: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  author?: string;
  image?: string;
  draft?: boolean;
  minutesRead?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  file: string;
  Content: any;
  body?: string;
  rawContent?: () => string;
  compiledContent?: () => string;
}

export const RECENT_POSTS_LIMIT = 5;
export const HOME_POSTS_LIMIT = 3;
export const SEARCH_RESULTS_LIMIT = 10;

export function getAllPosts(): Post[] {
  return Object.values(
    import.meta.glob("../content/dispatches/*.{md,mdx}", { eager: true })
  ) as Post[];
}

export function filterPublished(posts: Post[]): Post[] {
  return posts.filter((post) => {
    if (post.frontmatter.draft) return false;
    const date = new Date(post.frontmatter.datePublished);
    if (Number.isNaN(date.getTime())) return false;
    return date.getTime() <= Date.now();
  });
}

export function sortByDateDesc(posts: Post[]): Post[] {
  return posts.toSorted(
    (a, b) =>
      new Date(b.frontmatter.datePublished).getTime() -
      new Date(a.frontmatter.datePublished).getTime()
  );
}
