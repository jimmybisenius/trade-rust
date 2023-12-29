import { Analytics } from '@vercel/analytics/react'
import { Html, Head, Main, NextScript } from 'next/document'

const title = 'Rust Trade Evaluator - Prevent teaming, trade fairly'
const description = 'An unofficial, free trade evaluator for Rust players. Enter trade items and quantity and see how fair a trade is.'
const siteUrl = 'https://www.trade-rust.com'
const ogImageUrl = `${siteUrl}/og-image.png`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={ogImageUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImageUrl} />
        <link rel="preconnect" href="https://rsms.me/"/>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
        </Head>
      <body>
        <Analytics />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
