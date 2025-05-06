const BreadcrumbSchema = ({ items }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `${window.location.origin}${item.path}`,
        name: item.label,
      },
    })),
  };

  return (
    <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
  );
};

export default BreadcrumbSchema;
