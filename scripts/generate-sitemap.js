import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Domain - Change this to your actual production domain
const DOMAIN = 'https://worldsun-official-website.zeabur.app';

const staticRoutes = [
    '/',
    '/industry-analysis',
    '/strategies/All-Weather',
    '/strategies/SMART-500',
    '/privacy-policy',
    '/terms-of-service',
    '/copyright-notice',
];

// If you have an API to fetch dynamic routes, you can do it here.
// For now, we'll just include the static ones.
async function generateSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
            .map((route) => {
                return `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
            })
            .join('')}
</urlset>`;

    const publicDir = path.resolve(__dirname, '../public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
