import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ClaudeTuts",
    default: "ClaudeTuts — Learn AI with Claude",
  },
  description:
    "An interactive, open-source platform for learning Anthropic Claude, prompt engineering, AI agents, MCP, and more.",
  metadataBase: new URL("https://claudetuts.dev"),
  openGraph: {
    type: "website",
    siteName: "ClaudeTuts",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
