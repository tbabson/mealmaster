const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Meal Master",
    url: window.location.origin,
    logo: `${window.location.origin}/favchrome.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-703-5689-102",
      contactType: "customer service",
      email: "info@mealmaster.com",
      areaServed: "NG",
      availableLanguage: "en",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "151, Acme road",
      addressLocality: "Ogba",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    sameAs: [
      "https://www.facebook.com/mealmaster",
      "https://www.instagram.com/mealmaster",
      "https://twitter.com/mealmaster",
    ],
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(organizationData)}
    </script>
  );
};

export default OrganizationSchema;
