import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import AnimatedNewsGrid from '@/components/AnimatedNewsGrid'
import StatisticSummary from '@/components/StatisticSummary'
import AgendaDesa from '@/components/AgendaDesa'

// 1. GROQ Queries
const PROFIL_QUERY = `*[_type == "profilDesa"][0] { title, sejarah, visiMisi, heroImage, aboutImages }`
const LATEST_ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc)[0...3] { _id, title, slug, publishedAt, coverImage, kategori, body }`
const LATEST_AGENDA_QUERY = `*[_type == "agenda"] | order(eventDate asc)[0...3] { _id, eventName, eventDate, location }`
const STATISTIC_QUERY = `*[_type == "statistic"] { _id, label, count, category }`

// ISR Fetch Options
const fetchOptions = { next: { revalidate: 3600 } }

export default async function HomePage() {
  // 2. Parallel Fetching with Promise.all
  const [profil, rawArticles, agendas, statistics] = await Promise.all([
    client.fetch(PROFIL_QUERY, {}, fetchOptions),
    client.fetch(LATEST_ARTICLES_QUERY, {}, fetchOptions),
    client.fetch(LATEST_AGENDA_QUERY, {}, fetchOptions),
    client.fetch(STATISTIC_QUERY, {}, fetchOptions),
  ])

  // Resolve Image URLs on the server to keep Client Components clean and SSR-safe
  const heroImageUrl = profil?.heroImage?.asset
    ? urlForImage(profil.heroImage).url() 
    : "https://images.unsplash.com/photo-1596404768315-779872e4b9c1?q=80&w=2000&auto=format&fit=crop"

  const aboutImagesUrls = profil?.aboutImages 
    ? profil.aboutImages.filter((img: any) => img?.asset).map((img: any) => urlForImage(img).url()) 
    : []

  const articles = rawArticles?.map((article: any) => ({
    ...article,
    excerpt: article.body,
    imageUrl: article.coverImage?.asset ? urlForImage(article.coverImage).url() : null
  })) || []

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pb-0">
      {/* 1. The "Higherlife" Hero (Client Component with Framer Motion) */}
      <HeroSection title={profil?.title} imageUrl={heroImageUrl} />

      {/* 1.5. The Editorial About Section */}
      <AboutSection images={aboutImagesUrls} />

      {/* 2. Standalone Statistics Section (Moved up here) */}
      <StatisticSummary data={statistics} />

      {/* 3. Standalone Kabar Terbaru Section */}
      <AnimatedNewsGrid articles={articles} />

      {/* 4. Standalone Agenda Section */}
      <AgendaDesa agendas={agendas || []} />
    </main>
  )
}