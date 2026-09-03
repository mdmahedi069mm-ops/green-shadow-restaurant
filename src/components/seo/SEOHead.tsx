import React, { useEffect } from 'react';
import { useRestaurant, type PageId } from '../../context/RestaurantContext';

interface PageSEO {
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
}

const SEO_CONFIG: Record<PageId, PageSEO> = {
  home: {
    title: 'The Green Shadow Restaurant | Rooftop Dining & Event Hall in Agrabad, Chattogram',
    description: 'Experience The Green Shadow Restaurant in Agrabad, Chattogram — 6th Floor K.M. Tower rooftop garden dining, signature multi-cuisine flavors, tandoori sizzlers, and event hall for corporate AGMs and family celebrations.',
    canonicalPath: '/'
  },
  menu: {
    title: 'Multi-Cuisine Menu & Online Ordering | The Green Shadow Restaurant Agrabad Chattogram',
    description: 'Explore our multi-cuisine menu featuring Royal Mixed Grill Platters, Dum Biryani, Sizzling Chowmein, Tandoori Kebabs, and Rooftop Mocktails with fast delivery across Chattogram.',
    canonicalPath: '/menu'
  },
  reservation: {
    title: 'Book a Table | The Green Shadow Restaurant - Rooftop Dining in Agrabad Chattogram',
    description: 'Reserve your dining table at The Green Shadow Restaurant. Enjoy panoramic skyline views, garden rooftop ambiance, and exceptional hospitality in Agrabad Commercial Area.',
    canonicalPath: '/reservation'
  },
  events: {
    title: 'Grand Event Hall Booking | Corporate AGM & Walima at The Green Shadow Chattogram',
    description: 'Host memorable corporate AGMs, Walima receptions, birthday parties, and corporate banquets at The Green Shadow Event Hall on 6th Floor, K.M. Tower, Agrabad C/A, Chattogram.',
    canonicalPath: '/events'
  },
  about: {
    title: 'About Us | The Green Shadow Restaurant - Premier Agrabad Restaurant in Chattogram',
    description: 'Learn the story behind The Green Shadow Restaurant: authentic culinary passion, fresh sourcing, rooftop garden hospitality, and premier event hosting in the heart of Agrabad, Chattogram.',
    canonicalPath: '/about'
  },
  location: {
    title: 'Location & Directions | Agrabad Restaurant in Chattogram - The Green Shadow',
    description: 'Find us on 6th Floor, K.M. Tower, Hussain Court, Plot 21, Road 4, Agrabad C/A, Chattogram 4100. Open daily 12:00 PM to 11:00 PM with dedicated lift access and parking.',
    canonicalPath: '/location'
  },
  gallery: {
    title: 'Photo Gallery | Rooftop Garden Ambiance & Dishes | The Green Shadow Restaurant',
    description: 'Browse photos of our rooftop garden dining space, private family zones, signature sizzler platters, and festive banquet hall arrangements at The Green Shadow in Agrabad.',
    canonicalPath: '/gallery'
  },
  reviews: {
    title: 'Customer Reviews & Ratings (4.3★) | The Green Shadow Restaurant Chattogram',
    description: 'Read authentic guest reviews and ratings for The Green Shadow Restaurant in Agrabad, Chattogram. Rated 4.3 stars by over 440 satisfied diners and event organizers.',
    canonicalPath: '/reviews'
  },
  faq: {
    title: 'Frequently Asked Questions | Dining & Events at The Green Shadow Agrabad',
    description: 'Find answers about dining hours, event hall capacities, catering packages, home delivery coverage in Chattogram, and table reservation policies at The Green Shadow Restaurant.',
    canonicalPath: '/faq'
  },
  contact: {
    title: 'Contact Us | The Green Shadow Restaurant, K.M. Tower, Agrabad C/A Chattogram',
    description: 'Get in touch with The Green Shadow Restaurant team for table inquiries, custom event banquet menus, or catering requests in Agrabad, Chattogram. Call 01799-399979.',
    canonicalPath: '/contact'
  },
  checkout: {
    title: 'Secure Checkout | The Green Shadow Restaurant Online Food Ordering',
    description: 'Complete your online food order from The Green Shadow Restaurant with Cash on Delivery or Mobile Financial Services (bKash/Nagad) across Chattogram.',
    canonicalPath: '/checkout',
    noindex: true
  },
  tracking: {
    title: 'Track Your Order | Real-Time Food Delivery Status | The Green Shadow Restaurant',
    description: 'Live order tracking for your fresh culinary delivery from The Green Shadow kitchen in Agrabad, Chattogram.',
    canonicalPath: '/tracking',
    noindex: true
  },
  profile: {
    title: 'Customer Account | The Green Shadow Restaurant',
    description: 'View your order history, delivery addresses, and personalized preferences at The Green Shadow Restaurant.',
    canonicalPath: '/profile',
    noindex: true
  },
  privacy: {
    title: 'Privacy Policy | The Green Shadow Restaurant Chattogram',
    description: 'Our commitment to protecting your personal data, order privacy, and payment details at The Green Shadow Restaurant.',
    canonicalPath: '/privacy'
  },
  terms: {
    title: 'Terms of Service | The Green Shadow Restaurant Chattogram',
    description: 'Read the terms and conditions for dining, table reservations, home deliveries, and event hall bookings at The Green Shadow Restaurant.',
    canonicalPath: '/terms'
  },
  admin: {
    title: 'Staff & Kitchen Portal | The Green Shadow Restaurant Management',
    description: 'Authorized staff command portal for live order dispatch, kitchen display system, and table management.',
    canonicalPath: '/admin',
    noindex: true
  }
};

const BASE_URL = 'https://thegreenshadow.com';

export const SEOHead: React.FC = () => {
  const { currentPage } = useRestaurant();

  useEffect(() => {
    const config = SEO_CONFIG[currentPage] || SEO_CONFIG.home;
    const fullCanonicalUrl = `${BASE_URL}${config.canonicalPath}`;

    // 1. Update document title
    document.title = config.title;

    // Helper to update or create meta tag
    const setMetaTag = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameOrProperty, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta description
    setMetaTag('name', 'description', config.description);

    // 3. Robots tag
    if (config.noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 4. OpenGraph metadata
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);

    // 5. Twitter metadata
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);

    // 6. Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);
  }, [currentPage]);

  return null;
};
