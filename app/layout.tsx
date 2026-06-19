import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VPify | Digital systems for local business growth",
  description:
    "VPify helps local businesses attract, convert, and manage more customers with premium websites, WhatsApp automation, local visibility, and business systems.",
  metadataBase: new URL("https://vpify.com"),
  openGraph: {
    title: "VPify | Get more customers online",
    description:
      "Premium digital systems for local businesses: websites, automation, WhatsApp flows, and Google Maps visibility.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
