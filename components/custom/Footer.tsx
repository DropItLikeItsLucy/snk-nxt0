// components/custom/Footer.tsx
import Link from 'next/link';
import Image from 'next/image'; // We'll use this for payment icons if you keep them

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12 py-8"> {/* Added top margin, padding */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Links Section */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-600 order-2 md:order-1">
            <Link href="/privacy-policy" className="hover:text-orange-600 hover:underline transition-colors">
              კონფიდენციალურობის პოლიტიკა {/* Privacy Policy */}
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-orange-600 hover:underline transition-colors">
              წესები და პირობები {/* Terms and Conditions */}
            </Link>
            <Link href="/contact" className="hover:text-orange-600 hover:underline transition-colors">
              კონტაქტი {/* Contact */}
            </Link>
          </nav>

          {/* Payment Icons (Optional but included from original) */}
          <div className="flex items-center justify-center gap-3 order-1 md:order-2">
            {/* Replace with your actual icon paths if needed */}
            {/* You can get SVG icons for better quality */}
            <Image src="/images/payment/visa-logo.svg" alt="Visa" width={38} height={24} className="opacity-70" />
            <Image src="/images/payment/mastercard-logo.svg" alt="Mastercard" width={38} height={24} className="opacity-70" />
            <Image src="/images/payment/cash-on-delivery-icon.svg" alt="Cash on Delivery" width={42} height={24} className="opacity-70" />
            {/* Make sure you have these images in /public/images/payment/ */}
          </div>

          {/* Copyright Section */}
          <div className="text-sm text-gray-500 text-center md:text-right order-3">
             Copyright © {currentYear} Snacky {/* Or use NAMESPACE if you prefer */}. All Rights Reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;