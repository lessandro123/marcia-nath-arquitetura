import LegacyPage from "@/components/LegacyPage";
import { getLegacyPage, getPageMetadata } from "@/lib/legacy-pages";

export const metadata = getPageMetadata("index");

export default function HomePage() {
  return <LegacyPage page={getLegacyPage("index")} />;
}
