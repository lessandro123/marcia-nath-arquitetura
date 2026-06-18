import { notFound } from "next/navigation";
import LegacyPage from "@/components/LegacyPage";
import { getLegacyPage, getPageMetadata, pageSlugs, resolvePageKey } from "@/lib/legacy-pages";

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageKey = resolvePageKey(slug);
  return pageKey ? getPageMetadata(pageKey) : {};
}

export default async function ContentPage({ params }) {
  const { slug } = await params;
  const pageKey = resolvePageKey(slug);

  if (!pageKey) notFound();

  return <LegacyPage page={getLegacyPage(pageKey)} />;
}
