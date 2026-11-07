import './globals.css';

export const metadata = {
  title: 'Wallora AI — Luxury Architectural Room Paint Visualizer',
  description: 'Preview curated luxury paint palettes on your room walls with architectural precision, physics-based color exploration, and dynamic triple-lighting simulation.',
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    title: 'Wallora AI — Luxury Architectural Room Paint Visualizer',
    description: 'Preview curated luxury paint palettes on your room walls with architectural precision, physics-based color exploration, and dynamic triple-lighting simulation.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#74608F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="bg-warm-cream text-charcoal font-sans antialiased selection:bg-royal-lavender selection:text-white">
        {children}
      </body>
    </html>
  );
}
