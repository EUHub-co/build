import type { APIRoute } from 'astro';
import { buildSitemapIndexXml } from '../lib/seo/sitemap';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(buildSitemapIndexXml(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
