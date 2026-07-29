import { MetadataRoute } from 'next'
import { client } from '../../sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the production URL
  const baseUrl = 'https://www.podosoko.com'

  // Fetch all articles from Sanity to generate dynamic routes
  const articlesQuery = `*[_type == "article"] { "slug": slug.current, publishedAt }`
  const articles = await client.fetch(articlesQuery)

  const articleUrls = articles
    .filter((article: any) => article.slug)
    .map((article: any) => ({
      url: `${baseUrl}/informasi/kabar/${article.slug}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  // List all the static pages in your website
  const staticRoutes = [
    '',
    '/profil/tentang',
    '/profil/sarana',
    '/profil/statistik',
    '/informasi/kabar',
    '/informasi/agenda',
    '/pembangunan/perencanaan',
    '/pembangunan/transparansi',
    '/layanan',
    '/umkm',
    '/peta',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  // Combine static and dynamic routes
  return [...staticRoutes, ...articleUrls] as MetadataRoute.Sitemap
}
