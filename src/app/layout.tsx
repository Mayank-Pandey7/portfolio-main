import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import { Noto_Serif_JP } from 'next/font/google';

import './globals.css';

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
});

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${notoSerifJP.variable} font-hanken-grotesk antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactLenis root>
              <Navbar />
              {children}
              <OnekoCat />
              <Quote />
              <Footer />
              <UmamiAnalytics />
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
