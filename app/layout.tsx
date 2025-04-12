import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import 'normalize.css/normalize.css'
import Provider from './provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'YVS Mechotronics - Automation Industry Leaders',
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
    <html lang="en">
      <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
      <body className={`${inter.className} overflow-x-hidden bg-white`}>
        <Provider>
          <Header />
          <main>
            {children}
          </main>
          {/* Footer is now only in Provider.tsx */}
        </Provider>
      </body>
    </html>
  )
}