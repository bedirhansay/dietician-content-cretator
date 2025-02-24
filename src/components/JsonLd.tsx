import { FC } from 'react';

interface JsonLdProps {
  category?: string;
  content?: string;
}

const JsonLd: FC<JsonLdProps> = ({ category, content }) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sağlıklı Yaşam İçerik Üreticisi',
    applicationCategory: 'HealthApplication',
    author: {
      '@type': 'Person',
      name: 'Bedirhan Say',
      url: 'https://github.com/bedirhansay',
    },
    description: 'Yapay zeka destekli sağlıklı yaşam içerik üreticisi',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
  };

  const contentSchema = content
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${category} Hakkında Sağlıklı Yaşam İçeriği`,
        author: {
          '@type': 'Person',
          name: 'Bedirhan Say',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sağlıklı Yaşam İçerik Üreticisi',
          logo: {
            '@type': 'ImageObject',
            url: 'https://saglikli-yasam.vercel.app/logo.png',
          },
        },
        description: content.slice(0, 200),
        text: content,
        datePublished: new Date().toISOString(),
      }
    : null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(contentSchema || baseSchema),
      }}
    />
  );
};

export default JsonLd;
