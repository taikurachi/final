import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const figTree = localFont({
  src: "fonts/FigTree-VariableFont_wght.ttf",
  variable: "--font-figtree",
  weight: "100 900",
});
const figTreeItalic = localFont({
  src: "fonts/FigTree-Italic-VariableFont_wght.ttf",
  variable: "--font-italic-figtree",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fitr",
  description: "post oufits daily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figTree.variable} ${figTreeItalic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
