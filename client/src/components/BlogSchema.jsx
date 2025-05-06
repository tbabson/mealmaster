const BlogSchema = ({ blog }) => {
  const {
    title,
    content,
    author,
    createdAt,
    updatedAt,
    featuredImage,
    category,
    keywords,
  } = blog;

  // Strip HTML tags for description
  const stripHtml = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: stripHtml(content).substring(0, 160),
    image: featuredImage,
    author: {
      "@type": "Person",
      name: author?.fullName,
    },
    datePublished: new Date(createdAt).toISOString(),
    dateModified: new Date(updatedAt || createdAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location.href,
    },
    keywords: keywords?.join(", "),
    articleSection: category,
    publisher: {
      "@type": "Organization",
      name: "Meal Master",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/favchrome.png`,
      },
    },
  };

  return (
    <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
  );
};

export default BlogSchema;
