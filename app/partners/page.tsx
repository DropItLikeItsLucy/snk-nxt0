// app/partners/page.tsx
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Partners - Snacky',
  description: 'Find Snacky peanut butter in these leading supermarket chains.',
};

// Store partner data - move this to /lib/data.ts for larger lists
const partners = [
  { name: 'Europroduct', logo: '/images/europroduct.png', link: '#' },
  { name: 'Nikora', logo: '/images/nikora.png', link: '#' },
  { name: 'Magniti', logo: '/images/fresco.png', link: '#' },
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