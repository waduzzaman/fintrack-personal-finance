import type {Metadata} from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'FinTrack - Personal Finance & Budgeting SaaS',
    template: '%s | FinTrack',
  },
  description: 'Track expenses, set budgets, and achieve financial goals with FinTrack. The modern personal finance app that helps you build wealth.',
  keywords: ['personal finance', 'budgeting', 'expense tracker', 'money management', 'financial goals', 'saas'],
  authors: [{ name: 'FinTrack' }],
  creator: 'FinTrack',
  publisher: 'FinTrack',
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fintrack.app',
    siteName: 'FinTrack',
    title: 'FinTrack - Personal Finance & Budgeting SaaS',
    description: 'Track expenses, set budgets, and achieve financial goals with FinTrack. The modern personal finance app that helps you build wealth.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FinTrack - Personal Finance App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinTrack - Personal Finance & Budgeting SaaS',
    description: 'Track expenses, set budgets, and achieve financial goals with FinTrack.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
