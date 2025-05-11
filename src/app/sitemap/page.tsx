// src/app/sitemap/page.tsx
import Link from 'next/link';

// Define a type for sitemap links for better organization
type SitemapLink = {
  href: string;
  label: string;
  subLinks?: SitemapLink[]; // For nested sitemap structures
};

const mainLinks: SitemapLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/cars', label: 'Browse Cars' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/cart', label: 'Your Cart' },
  { href: '/wishlist', label: 'Your Wishlist' },
];

const legalLinks: SitemapLink[] = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/faq', label: 'FAQ' },
];

const accountLinks: SitemapLink[] = [
  { href: '/auth/signin', label: 'Sign In / Sign Up' },
  // Add links to user profile, order history etc. if they exist
];


export default function SitemapPage() {
  const renderLinks = (links: SitemapLink[], title?: string) => (
    <div className="mb-6">
      {title && <h2 className="text-2xl font-semibold mb-3">{title}</h2>}
      <ul className="list-disc list-inside space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-blue-600 hover:underline">
              {link.label}
            </Link>
            {link.subLinks && (
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                {link.subLinks.map((subLink) => (
                  <li key={subLink.href}>
                    <Link href={subLink.href} className="text-blue-600 hover:underline">
                      {subLink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      
      {renderLinks(mainLinks, 'Main Navigation')}
      {renderLinks(accountLinks, 'User Account')}
      {renderLinks(legalLinks, 'Legal & Information')}

      {/* You can add more sections as your site grows, e.g., blog categories, product categories etc. */}
      
    </div>
  );
}
