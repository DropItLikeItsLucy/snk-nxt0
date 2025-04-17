// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Shadcn button
import { Card, CardContent } from '@/components/ui/card'; // Shadcn card
import { Star } from 'lucide-react'; // Example icon

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Product Image Section */}
        <div className="w-full max-w-md mx-auto">
          {/* --- FIX: Remove layout prop, ensure container or styling handles size --- */}
          <Image
            src="/images/snacky-jar.png" // Ensure this path is correct in /public
            alt="Snacky Peanut Butter Jar"
            width={600} // Provide intrinsic width
            height={600} // Provide intrinsic height
            // layout="responsive" // REMOVE THIS LINE
            priority
            className="rounded-lg shadow-lg w-full h-auto" // Add w-full and h-auto for responsiveness
          />
        </div>

        {/* Content & Buttons Section */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Optional: Add a Heading H1 here for SEO */}
          {/* <h1 className="text-3xl font-bold text-center md:text-left">Snacky Peanut Butter</h1> */}

          {/* Main Buy Button (Example) */}
          <Button size="lg" className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">
            ყიდვა / შეიძინე ვებგვერდიდან {'>'} {/* Buy from Website */}
          </Button>

          {/* Delivery Service Links */}
          <div className="w-full space-y-3">
            <p className="text-center md:text-left font-semibold">მიტანის სერვისი:</p> {/* Delivery Service: */}

            {/* Use Shadcn Card or simple Buttons */}
            <Button variant="outline" className="w-full justify-between border-green-500 text-green-700 hover:bg-green-50">
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" /> VELI უფასო მიწოდება {/* VELI Free Delivery */}
              </span>
               {'>'}
            </Button>
             <Button asChild variant="outline" className="w-full justify-between border-blue-500 hover:bg-blue-50">
              <Link href="https://wolt.com/en/geo/tbilisi/brand/snacky" target="_blank" rel="noopener noreferrer">
                Wolt+ უფასო მიწოდება {/* Wolt+ Free Delivery */} <span>{'>'}</span>
              </Link>
            </Button>
             <Button asChild variant="outline" className="w-full justify-between border-orange-400 hover:bg-orange-50">
               <Link href="https://glovoapp.com/ge/ka/tbilisi/snacky-tbi/" target="_blank" rel="noopener noreferrer">
                Glovo Prime მიწოდება {/* Glovo Prime Delivery */} <span>{'>'}</span>
              </Link>
            </Button>
             <Button asChild variant="outline" className="w-full justify-between border-gray-400 hover:bg-gray-50">
               <Link href="https://extra.ge/search?k=Snacky-%E1%83%90%E1%83%A0%E1%83%90%E1%83%A5%E1%83%98%E1%83%A1%E1%83%98%E1%83%A1-%E1%83%99%E1%83%90%E1%83%A0%E1%83%90%E1%83%A5%E1%83%98" target="_blank" rel="noopener noreferrer">
                Extra.ge <span>{'>'}</span>
              </Link>
            </Button>
             <Button asChild variant="outline" className="w-full justify-between border-gray-400 hover:bg-gray-50">
               <Link href="https://vitamini.ge/shop?search=snacky" target="_blank" rel="noopener noreferrer">
                Vitamini.ge <span>{'>'}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

       {/* Partner Logos Section (from bottom of screenshot) */}
       <div className="mt-16">
         <div className="flex justify-center mb-4">
            <Button variant="outline" className="rounded-full border-red-500 text-red-600 px-6">
               გვიპოვე მარკეტებში {'📍'} {/* Find us in Markets */}
            </Button>
         </div>
         <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Replace with your actual partner logos */}
            <Image src="/images/partners/europroduct.png" alt="Europroduct" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/nikora.png" alt="Nikora" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/fresco.png" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/goodwill.png" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/spar.png" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/smart.png" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/schirnhofer.png" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/universami.jpg" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/vitamini.png" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/zgapari.png" alt="Magniti" width={150} height={75} className="object-contain"/>
            <Image src="/images/partners/natural.jpg" alt="Magniti" width={150} height={75} className="object-contain"/>
            {/* Add more logos */}
         </div>
       </div>
    </div>
  );
}