// app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio"; // For video responsiveness
import type { Metadata } from 'next';
import {
    ShieldCheck, // Icon for HACCP/Safety
    Award,       // Icon for Quality/Certification
    Leaf,        // Icon for Natural Ingredients
    Heart,       // Icon for Passion/Care
    Sparkles,    // Icon for Freshness/Taste
    Users,       // Icon for Community/Customer focus
    Factory,     // Icon for Production
    FileText,    // Icon for PDF documents
    Download     // Icon for Download action
} from 'lucide-react'; // Import relevant icons

export const metadata: Metadata = {
  title: 'About Us - Snacky',
  description: 'Learn about Snacky\'s commitment to quality, safety, and delicious peanut butter.',
};

// --- Data for the 6 Info Boxes ---
const features = [
  {
    icon: Leaf,
    title: "ნატურალური ინგრედიენტები", // Natural Ingredients
    description: "ვიყენებთ მხოლოდ საუკეთესო, შერჩეულ მიწის თხილს დამატებითი კონსერვანტების გარეშე.", // We use only the best, selected peanuts without added preservatives.
  },
  {
    icon: ShieldCheck,
    title: "HACCP სტანდარტი", // HACCP Standard
    description: "ჩვენი წარმოება სერტიფიცირებულია HACCP-ის მიხედვით, რაც უზრუნველყოფს უმაღლეს უსაფრთხოებას.", // Our production is HACCP certified, ensuring the highest safety.
  },
  {
    icon: Sparkles,
    title: "უახლესი და გემრიელი", // Fresh and Delicious
    description: "მცირე პარტიებად წარმოება გვეხმარება შევინარჩუნოთ პროდუქტის სიახლე და განუმეორებელი გემო.", // Small batch production helps us maintain product freshness and unique taste.
  },
  {
    icon: Factory,
    title: "ადგილობრივი წარმოება", // Local Production
    description: "ვამაყობთ, რომ ჩვენი პროდუქტი მზადდება საქართველოში, თანამედროვე ტექნოლოგიებით.", // We are proud that our product is made in Georgia with modern technologies.
  },
   {
    icon: Heart,
    title: "სიყვარულით დამზადებული", // Made with Love
    description: "ყველა ქილაში ჩვენი გუნდის ზრუნვა და სიყვარულია ჩადებული.", // Every jar contains the care and love of our team.
  },
   {
    icon: Award, // Or Users icon
    title: "ხარისხის გარანტია", // Quality Guarantee
    description: "ჩვენი მიზანია მოგაწოდოთ საუკეთესო ხარისხის პროდუქტი, რომელიც შეგიყვარდებათ.", // Our goal is to provide you with the best quality product you will love.
  },
];

// --- Data for Certificate Links ---
const certificates = [
    {
        name: "HACCP სერტიფიკატი", // HACCP Certificate
        href: "/certificates/haccp-certificate-snacky.pdf", // IMPORTANT: Place PDF in /public/certificates/
        icon: FileText,
    },
    {
        name: "არა გენმოდიფიცირებული", // HACCP Certificate
        href: "/certificates/non-gmo.pdf", // IMPORTANT: Place PDF in /public/certificates/
        icon: FileText,
    },
    {
        name: "ენერგეტიკული ღირებულების განსაზღვრა", // HACCP Certificate
        href: "/certificates/Determination of energy value.pdf", // IMPORTANT: Place PDF in /public/certificates/
        icon: FileText,
    },
    {
        name: "ნედლეული შემოწმებულია აფლატოქსინზე", // HACCP Certificate
        href: "/certificates/Raw materials are tested for aflatoxin.jpg", // IMPORTANT: Place PDF in /public/certificates/
        icon: FileText,
    },
    {
        name: "უვნებლობის მიკრობიოლოგიურ მაჩვენებლებზე გამოცდის შედეგი", // HACCP Certificate
        href: "/certificates/Microbiological safety test results.pdf", // IMPORTANT: Place PDF in /public/certificates/
        icon: FileText,
    },
    // Add other certificates here if you have them
    // {
    //     name: "ISO 9001 Certificate",
    //     href: "/certificates/iso-9001-snacky.pdf",
    //     icon: FileText,
    // },
]

export default function AboutPage() {
  const YOUTUBE_VIDEO_ID = 'YOUR_YOUTUBE_VIDEO_ID_HERE'; // !!! REPLACE THIS !!!

  return (
    <div className="container mx-auto px-4 py-12">
      {/* <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">ჩვენს შესახებ</h1> About Us */}

      {/* Optional Intro */}
      <p className="max-w-3xl mx-auto text-center text-gray-600 mb-12">
      სნექის მისია ჯანსაღი წასახემსებლის კულტურის შექმნაა და მუდმივად ვმუშაობთ, რომ უწყვეტ რეჟიმში შემოგთავაზოთ ყოველთვის ახალი, ჯანსაღი და გემრიელი მიწისთხილის კარაქი სნექი. დაცული გვაქვს ყველა ნორმა, დანერგილია სურსათის უვნებლობის სისტემა HACCP.
          {/* At Snacky, our mission is to create the most delicious, highest quality peanut butter, made with care and the strictest safety standards. */}
      </p>

      {/* --- Quality & Safety Section (HACCP) --- */}
      <section className="mb-16 bg-amber-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
             {/* Image Column */}
             <div className="md:col-span-2">
                <Image
                    src="/images/haccp-certificate.png" // IMPORTANT: Place your image in /public/images/
                    alt="HACCP Certified Snacky Peanut Butter"
                    width={500} // Adjust width based on original image aspect ratio
                    height={500} // Adjust height based on original image aspect ratio
                    className="rounded-lg shadow-md mx-auto"
                />
             </div>
             {/* Text Column */}
             <div className="md:col-span-3 space-y-4">
                <h2 className="text-2xl font-semibold text-amber-800 flex items-center gap-2">
                   <ShieldCheck className="w-7 h-7 text-amber-700" />
                   ხარისხისა და უსაფრთხოების გარანტია {/* Quality and Safety Guarantee */}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    ჩვენი წარმოება სრულად შეესაბამება HACCP (Hazard Analysis and Critical Control Points) საერთაშორისო სტანდარტს. ეს ნიშნავს, რომ წარმოების ყველა ეტაპზე მკაცრად კონტროლდება პოტენციური რისკები, რათა თქვენამდე მოვიდეს მხოლოდ უსაფრთხო და უმაღლესი ხარისხის პროდუქტი.
                    {/* Our production fully complies with the HACCP (Hazard Analysis and Critical Control Points) international standard. This means potential risks are strictly controlled at every stage of production, ensuring only safe, top-quality products reach you. */}
                </p>
                 {/* Optional: Direct link to HACCP Cert here */}
                 {certificates.find(cert => cert.name.includes("HACCP")) && (
                     <Button asChild variant="link" className="px-0 text-amber-700 hover:text-amber-800">
                        <a
                           href={certificates.find(cert => cert.name.includes("HACCP"))?.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           download // Suggests downloading the file
                           className="inline-flex items-center gap-1"
                        >
                           <Download size={16} />
                           HACCP სერტიფიკატის გადმოწერა {/* Download HACCP Certificate */}
                        </a>
                    </Button>
                 )}
             </div>
          </div>
      </section>

      {/* --- Our Promise / Features Section --- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">რატომ Snacky?</h2> {/* Why Snacky? */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="items-center">
                <feature.icon className="w-10 h-10 mb-3 text-orange-500" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- Factory Video Section --- */}
      <section className="mb-16">
         <h2 className="text-2xl font-semibold text-center mb-6">ნახეთ როგორ მზადდება</h2> {/* See How It's Made */}

         {/* --- Modify this container --- */}
         {/* Add a wrapper to control the width and center the vertical frame */}
         <div className="max-w-xs sm:max-w-sm mx-auto"> {/* Constrain width (e.g., max-w-xs or sm) */}
             {/* --- Change the aspect ratio here --- */}
             <AspectRatio ratio={9 / 16} className="bg-muted rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src={`https://www.youtube.com/embed/4Xu2meb7o5o`}
                    title="Snacky Peanut Butter Production Process" // Update title if video is different
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full" // iframe should fill the AspectRatio container
                    loading="lazy"
                ></iframe>
            </AspectRatio>
            <p className="text-center text-sm text-gray-500 mt-3">
                გადახედეთ ჩვენი წარმოების პროცესს და დარწმუნდით ხარისხში.
            </p>
         </div>
         {/* --- End of modified container --- */}
      </section>

      {/* --- Certificates/Downloads Section --- */}
      {certificates.length > 0 && ( // Only show section if there are certificates
          <section>
             <h2 className="text-2xl font-semibold text-center mb-6">ჩვენი სერტიფიკატები</h2> {/* Our Certificates */}
             <div className="flex flex-wrap justify-center gap-4">
                {certificates.map((cert, index) => (
                     <Button key={index} asChild variant="outline">
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          download // Optional: suggests download
                          className="inline-flex items-center gap-2"
                        >
                           <cert.icon size={18} />
                           {cert.name}
                           <Download size={16} className="opacity-70 ml-1"/>
                        </a>
                     </Button>
                ))}
             </div>
          </section>
      )}

    </div> // End container
  );
}