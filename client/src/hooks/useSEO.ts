import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = "https://princecapitalgroup.com/og-image.png",
  ogType = "website",
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update canonical
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Update OG tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOGTag("og:title", title);
    updateOGTag("og:description", description);
    updateOGTag("og:type", ogType);
    if (ogImage) updateOGTag("og:image", ogImage);
    updateOGTag("og:url", canonical || "https://princecapitalgroup.com");
    updateOGTag("og:site_name", "Prince Capital Group");

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateTwitterTag("twitter:card", "summary_large_image");
    updateTwitterTag("twitter:title", title);
    updateTwitterTag("twitter:description", description);
    if (ogImage) updateTwitterTag("twitter:image", ogImage);
    updateTwitterTag("twitter:site", "@princecapitalgrp");
  }, [title, description, canonical, ogImage, ogType]);
}
