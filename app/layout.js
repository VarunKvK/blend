import "./globals.css";

export const metadata = {
  title: {
    default: "Blend - Create Beautiful Gradients Instantly",
    template: "%s | Blend"
  },
  description: "Transform images into stunning mesh gradients. Extract colors, customize layouts, and export in PNG, SVG, or CSS. Free to use.",
  keywords: ["gradient generator", "mesh gradient", "color palette", "design tool", "CSS gradient", "background generator", "color extraction"],
  authors: [{ name: "Blend" }],
  creator: "Blend",
  publisher: "Blend",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blendit.space",
    siteName: "Blend",
    title: "Blend - Create Beautiful Gradients Instantly",
    description: "Transform images into stunning mesh gradients. Extract colors, customize layouts, and export in seconds.",
    images: [
      {
        url: "/BlendOpen.png",
        width: 1200,
        height: 630,
        alt: "Blend - Gradient Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blend - Create Beautiful Gradients Instantly",
    description: "Transform images into stunning mesh gradients. Extract colors, customize layouts, and export in seconds.",
    images: ["/BlendOpen.png"],
    creator: "@blend",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://blendit.space"),
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-black text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
