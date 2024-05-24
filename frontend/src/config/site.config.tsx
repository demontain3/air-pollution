import { Metadata } from 'next';
import logoImg from '@/../public/The Wind (1).svg';
import logoIconImg from '@/../public/The Wind.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Vayu - Air Quality Monitoring System',
  description: `Vayu is the best air quality monitoring system in the world. It is a complete solution for monitoring air quality in real-time.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Vayu Air Quality System` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Vayu Air Quality System` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Schoole Admin CRM', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
