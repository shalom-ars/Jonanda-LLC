import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'JONANDA LLC | Building Technology for the Next Digital Economy',
  description = 'JONANDA LLC is a technology company developing products and services across AI, Web3, cybersecurity, software and digital infrastructure.',
  canonicalPath = '',
  keywords
}) => {
  useEffect(() => {
    // Update document title
    const fullTitle = title.includes('JONANDA LLC') ? title : `${title} | JONANDA LLC`;
    document.title = fullTitle;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://llc.jonanda.com${canonicalPath}`);
    }

    // Update Canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://llc.jonanda.com${canonicalPath}`);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }
  }, [title, description, canonicalPath, keywords]);

  return null;
};
