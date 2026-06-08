export default function LegacyPage({ page }) {
  const className = page.bodyClass || undefined;
  const style = page.bodyClass ? undefined : { display: "contents" };

  return (
    <div
      className={className}
      style={style}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: page.body }}
    />
  );
}
