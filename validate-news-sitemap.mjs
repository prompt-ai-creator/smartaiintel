import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';

// First verify the real build output that just ran against the 12 live articles!
const sitemap1 = await fs.readFile('_site/sitemap.xml', 'utf8');
const newsSitemap1 = await fs.readFile('_site/news-sitemap.xml', 'utf8');
const rss1 = await fs.readFile('_site/rss.xml', 'utf8');
const robots1 = await fs.readFile('_site/robots.txt', 'utf8');
const home1 = await fs.readFile('_site/index.html', 'utf8');
const articlesHtml1 = await fs.readFile('_site/articles/index.html', 'utf8');

assert(robots1.includes('Sitemap: https://smartaiintel.com/sitemap.xml'), 'robots.txt missing sitemap.xml');
assert(robots1.includes('Sitemap: https://smartaiintel.com/news-sitemap.xml'), 'robots.txt missing news-sitemap.xml');
assert(home1.includes('href="https://smartaiintel.com/rss.xml"'), 'homepage missing rss link');
assert(articlesHtml1.includes('href="https://smartaiintel.com/rss.xml"'), 'articles hub missing rss link');
assert(newsSitemap1.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"'), 'missing news namespace');
assert(newsSitemap1.includes('<news:name>SMARTAI News</news:name>'), 'missing news:name');
assert(newsSitemap1.includes('<news:language>en</news:language>'), 'missing news:language');

console.log('Real 12-article build output verified. Running mocked-clock 48h rolling window tests...');
