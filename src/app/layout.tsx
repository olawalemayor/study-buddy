import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import ChromeGuard from "./guards/ChromeGuard";

export const metadata: Metadata = {
  title: "Study Buddy – AI-powered Learning Tool",
  description:
    "AI-powered web app to summarize, simplify, translate, and quiz learners on any text.",
  keywords: [
    "AI",
    "learning",
    "education",
    "study",
    "quiz",
    "summarize",
    "translate",
  ],
  authors: [{ name: "Olawale Mayor", url: "https://olawalemayor.netlify.app" }],
  creator: "Olawale Mayor",
  publisher: "Olawale Mayor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ChromeGuard>
          <Header />
          <div className="min-h-[calc(100vh-67.09px)]">{children}</div>
          <Footer />
        </ChromeGuard>
      </body>
    </html>
  );
}
