import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IBuildThis PWA",
    short_name: "IBuildThis",
    description: "My Next.js 16 PWA",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/apple-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/apple-icon-180.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
