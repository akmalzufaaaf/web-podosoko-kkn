import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.podosoko.com"),
  title: {
    default: "Website Resmi Desa Podosoko",
    template: "%s | Desa Podosoko"
  },
  description: "Website resmi Desa Podosoko. Temukan informasi terbaru, potensi UMKM, peta desa, statistik demografi, dan layanan administrasi Desa Podosoko.",
  keywords: ["Desa Podosoko", "Podosoko", "Podosoko Magelang", "Profil Desa Podosoko", "UMKM Podosoko", "Peta Podosoko"],
  openGraph: {
    title: "Website Resmi Desa Podosoko",
    description: "Platform informasi, potensi UMKM, dan layanan publik Desa Podosoko.",
    url: "https://www.podosoko.com",
    siteName: "Desa Podosoko",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gray-50/30">
        {children}
      </body>
    </html>
  );
}
