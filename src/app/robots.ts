import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Hide Sanity Studio from search engines
    },
    sitemap: 'https://web-podosoko.vercel.app/sitemap.xml',
  }
}
