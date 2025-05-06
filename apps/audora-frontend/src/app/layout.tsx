import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@audora/tailwind-css";
import siteMetadata from "@/lib/siteMetadata";
import Header from "@/components/header";

const open_sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: "%s | Audora",
  },
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* favicons */}
      <link
        rel="icon"
        type="image/png"
        href="/favicons/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="Audora" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <body className={`${open_sans.className} antialiased bg-black`}>
        <>
          <Header />
          {children}
        </>
      </body>
    </html>
  );
}
