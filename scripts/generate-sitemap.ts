import { writeFileSync } from 'fs';
import { healthCategories } from '../src/data/categories';

async function generateSitemap() {
  const baseUrl = 'https://saglikli-yasam.vercel.app';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${healthCategories
    .map(
      (category) => `
  <url>
    <loc>${baseUrl}/category/${category.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
