// app/partners/page.tsx
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Partners - Snacky',
  description: 'Find Snacky peanut butter in these leading supermarket chains.',
};

// Store partner data - move this to /lib/data.ts for larger lists
const partners = [
  { name: 'Europroduct', logo: '/images/partners/europroduct.png', link: 'https://europroduct.ge/' },
  { name: 'Nikora', logo: '/images/partners/nikora.png', link: 'https://nikorasupermarket.ge/' },
  { name: 'Fresco', logo: '/images/partners/fresco.png', link: 'https://fresco.ge/' },
  { name: 'Goodwill', logo: '/images/partners/goodwill.png', link: 'https://goodwill.ge/' },
  { name: 'Schirnhofer', logo: '/images/partners/schirnhofer.png', link: 'https://www.facebook.com/@schirnhoferGeo/?locale=ka_GE' },
  { name: 'Smart', logo: '/images/partners/smart.png', link: 'https://smart.ge/ka' },
  { name: 'Spar', logo: '/images/partners/spar.png', link: 'https://spargeorgia.com/ka' },
  { name: 'Gvirila', logo: '/images/partners/gvirila.jpg', link: 'https://www.facebook.com/Gvirila2022/?locale=ka_GE' },
  { name: 'Universami', logo: '/images/partners/universami.jpg', link: 'https://www.facebook.com/Universami/?locale=ka_GE' },
  { name: 'Vitamini', logo: '/images/partners/vitamini.png', link: 'https://vitamini.ge/' },
  { name: 'Zgapari', logo: '/images/partners/zgapari.png', link: 'https://online.zgapari.ge/' },
  { name: 'Naturali', logo: '/images/partners/natural.jpg', link: 'https://www.facebook.com/SupermarketNatural/?locale=ka_GE' },
  // Add all other partners
];

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">სად ვიყიდება / პარტნიორები</h1> {/* Where to Buy / Partners */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.link} // Link to partner's website or store locator
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Image
              src={partner.logo}
              alt={`${partner.name} Logo`}
              width={150} // Adjust as needed
              height={75} // Adjust as needed
              className="object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}