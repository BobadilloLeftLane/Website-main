import { Helmet } from 'react-helmet-async'

interface PageSEOProps {
  title: string
  description: string
  keywords: string
  canonicalUrl?: string
  ogType?: string
}

const PageSEO = ({
  title,
  description,
  keywords,
  canonicalUrl = 'https://www.novastudiosolutions.com',
  ogType = 'website'
}: PageSEOProps) => {
  const fullTitle = `${title} | Nova Studio Solutions`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  )
}

export default PageSEO
