export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'M & Sons Construction Group LTD',
    image: 'https://www.construction-group.co.uk/opengraph-image.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '86 Bedford Avenue',
      addressLocality: 'London',
      postalCode: 'UB4 0DS',
      addressCountry: 'GB',
    },
    telephone: '+447454704949',
    email: 'info@construction-group.co.uk',
    url: 'https://www.construction-group.co.uk',
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
