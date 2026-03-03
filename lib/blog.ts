export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  heroImage: string;
  heroAlt: string;
};

// For now we only have one live blog post. More can be added later.
export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-a-builder-in-london',
    title: 'How to Choose the Right Builder in London for Your Project',
    excerpt:
      'A practical guide to help London homeowners pick a reliable, experienced construction company for renovations, extensions and full refurbishments.',
    date: '2026-02-20',
    readingTime: '5 min read',
    heroImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Builders discussing plans on a modern house extension',
  },
] as const;

