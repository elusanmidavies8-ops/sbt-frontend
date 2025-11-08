import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TON Certificates",
  description: "NFT Credentials on TON Blockchain",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  other: {
    "telegram-web-app": "true",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="telegram-web-app" content="true" />
        <meta name="theme-color" content="#008080" />
      </head>
      <body className={`${inter.className} h-screen overflow-y-auto`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
