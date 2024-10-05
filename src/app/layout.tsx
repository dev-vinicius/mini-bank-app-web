import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "MiniBankApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="pt">
      <body
        className="bg-zinc-50 text-zinc-900 antialiased"
      >
        <main className="max-w-[1200px] mx-auto p-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
