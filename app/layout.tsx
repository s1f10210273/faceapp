import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Face App',
  description: 'An app for analyzing faces and predicting age.',
  viewport: 'width=device-width, initial-scale=1',
  // Add other meta tags as needed
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="An app for analyzing faces and predicting age." />
        <title>Face App</title>
        {/* Add other head elements as needed */}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
