import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: " Syam Prasad Reddy — Senior AI Engineer",
  description:
    "Senior AI Engineer building intelligent systems that scale. Specializing in LLM applications, AI agents, and production-ready backend systems.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "LangChain",
    "Python",
    "Next.js",
    "Senior Engineer",
  ],
  authors: [{ name: "Syam Prasad Reddy" }],
  openGraph: {
    title: "Syam Prasad Reddy — Senior AI Engineer",
    description: "Building intelligent systems that scale.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
