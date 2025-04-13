import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'normalize.css/normalize.css'
import Provider from './provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'YVS Mechatronics - Automation Industry Leaders',
  description: 'Industry leader in manufacturing special purpose machines, CNC, and precision machining.',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
      <body className={`${inter.className} overflow-x-hidden bg-background dark:bg-gray-900 scrollbar-hidden`}>
        <Provider>
          <main>
            {children}
          </main>
          {/* Header and Footer are now conditionally rendered in Provider.tsx */}
        </Provider>
      </body>
    </html>
  )
}