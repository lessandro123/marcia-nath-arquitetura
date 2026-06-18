import { pages } from "./site-content.generated";

export const pageSlugs = Object.keys(pages).filter((slug) => slug !== "index");

export function resolvePageKey(slug) {
  const normalized = slug === "index.html" ? "index" : slug.replace(/\.html$/, "");
  return pages[normalized] ? normalized : null;
}

export function getLegacyPage(pageKey) {
  const page = pages[pageKey];
  if (!page) return null;

  return {
    bodyClass: page.bodyClass,
    body: page.body
  };
}

export function getPageMetadata(pageKey) {
  const page = pages[pageKey];
  if (!page) return {};

  return {
    title: page.title,
    description: page.description
  };
}
