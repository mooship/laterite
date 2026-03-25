import { config } from "../config";

export function withBase(path: string): string {
  const rawBase = config.baseUrl || "/";
  const base = rawBase.endsWith("/") ? rawBase : rawBase + "/";
  if (!path) {
    return base;
  }
  const cleaned = path.replace(/^\/+/, "");
  return base + cleaned;
}

export function categoryPath(category: string): string {
  const slug = category.toLowerCase().replaceAll(/[/\s]+/g, "-");
  return withBase(`categories/${slug}`);
}
