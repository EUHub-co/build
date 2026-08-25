import type { APIRoute } from 'astro';
import { buildSitemapXml } from '../lib/seo/sitemap';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(buildSitemapXml(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
