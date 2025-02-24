import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Sağlıklı Yaşam İçerik Üreticisi | Bedirhan Say',
    template: '%s | Bedirhan Say',
  },
  description:
    'Bedirhan Say tarafından geliştirilen yapay zeka destekli sağlıklı yaşam içerik üreticisi. Beslenme, diyet ve sağlık içerikleri oluşturun.',
  keywords: ['sağlıklı yaşam', 'diyet', 'beslenme', 'yapay zeka', 'içerik üretici', 'Bedirhan Say'],
  authors: [{ name: 'Bedirhan Say' }],
  creator: 'Bedirhan Say',
  publisher: 'Bedirhan Say',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://saglikli-yasam.vercel.app',
    siteName: 'Sağlıklı Yaşam İçerik Üreticisi',
    title: 'Sağlıklı Yaşam İçerik Üreticisi | Bedirhan Say',
    description: 'Yapay zeka destekli sağlıklı yaşam içerik üreticisi',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sağlıklı Yaşam İçerik Üreticisi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sağlıklı Yaşam İçerik Üreticisi | Bedirhan Say',
    description: 'Yapay zeka destekli sağlıklı yaşam içerik üreticisi',
    creator: '@bedirhansay',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://saglikli-yasam.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
