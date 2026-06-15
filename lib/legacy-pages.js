import fs from "node:fs";
import path from "node:path";

const pages = {
  index: "index.html",
  sobre: "sobre.html",
  residencial: "residencial.html",
  comercial: "comercial.html",
  fachadas: "fachadas.html",
  "inspire-se": "inspire-se.html",
  "novidades-arquitetura-2026": "novidades-arquitetura-2026.html",
  "inovacao-que-melhora-a-rotina": "inovacao-que-melhora-a-rotina.html",
  "ambientacao-atual-com-personalidade": "ambientacao-atual-com-personalidade.html"
};

export const pageSlugs = Object.keys(pages).filter((slug) => slug !== "index");

export function resolvePageKey(slug) {
  const normalized = slug === "index.html" ? "index" : slug.replace(/\.html$/, "");
  return pages[normalized] ? normalized : null;
}

export function getLegacyPage(pageKey) {
  const filename = pages[pageKey];
  if (!filename) return null;

  const html = fs.readFileSync(path.join(process.cwd(), filename), "utf8");
  const bodyMatch = html.match(/<body(?: class="([^"]*)")?>([\s\S]*?)<\/body>/);

  return {
    bodyClass: bodyMatch?.[1] || "",
    body: (bodyMatch?.[2] || "").replace(/\s*<script src="script\.js"><\/script>\s*$/, "")
  };
}

export function getPageMetadata(pageKey) {
  const filename = pages[pageKey];
  const html = fs.readFileSync(path.join(process.cwd(), filename), "utf8");

  return {
    title: html.match(/<title>([\s\S]*?)<\/title>/)?.[1],
    description: html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1]
  };
}
