export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'M & Sons Construction Group LTD',
    image: 'https://msonsconstruction.co.uk/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '99A Woodstock Gardens',
      addressLocality: 'Hayes',
      postalCode: 'UB4 8BA',
      addressCountry: 'GB',
    },
    telephone: '+447454704949',
    email: 'info@construction-group.co.uk',
    url: 'https://msonsconstruction.co.uk',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 51.5074,
        longitude: -0.1278,
      },
      geoRadius: '50000',
    },
    priceRange: '££',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
