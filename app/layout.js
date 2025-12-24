import "./globals.css";

export const metadata = {
  title: "Blend - Create Beautiful Gradients Instantly",
  description: "Transform images into stunning mesh gradients. Extract colors, customize layouts, and export in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=BBH+Bartle&family=BBH+Bogle&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'BBH Bogle', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
