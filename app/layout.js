// Import necessary libraries and components
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import Navbar from "@/components/Tabbar"; // Ensure the path to Tabbar is correct
import config from "@/config";
import "./globals.css";
import { Suspense } from "react";

// Set up the font using the Inter family from Google Fonts
const font = Inter({ subsets: ["latin"] });

// Define viewport and metadata settings for SEO
export const viewport = {
  themeColor: config.colors.main, // Uses the primary color for browser theme
  width: "device-width", // Sets the viewport width to match the device's width
  initialScale: 1, // Sets the initial zoom level when the page is first loaded
};

export const metadata = getSEOTags(); // Retrieves default SEO tags, can be overridden per page

// Define the RootLayout component
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName}>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>{`body { margin: 0; font-family: ${font.className}; }`}</style>
          </PlausibleProvider>
        </head>
      )}
      <body>
        <ClientLayout>
          <Navbar className="block md:hidden" /> {/* Show on small screens, hide on md and larger */}
          <Suspense fallback={<div>Loading...</div>}>
            {children} {/* Render child components, which represent page content */}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
