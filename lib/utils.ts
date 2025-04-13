// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Keep Shadcn's cn function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- ADD THIS FUNCTION ---
export function formatCurrency(amount: number, currency = 'GEL'): string {
  // Adjust locale and options as needed for Georgian Lari (₾)
  // Intl.NumberFormat might not place ₾ correctly by default for 'ka-GE',
  // so we manually append/prepend if needed. Check browser behavior.
  const formatter = new Intl.NumberFormat('en-US', { // Using 'en-US' often gives better control over symbol placement initially
    style: 'decimal', // Use 'currency' if symbol placement is reliable
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // currency: currency, // Enable if using style: 'currency'
  });

  // Manually add the Lari symbol
  return `${formatter.format(amount)} ₾`;

  // Alternatively, try Georgian locale, but test symbol placement:
  /*
  const formatter = new Intl.NumberFormat('ka-GE', {
      style: 'currency',
      currency: 'GEL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  });
  return formatter.format(amount);
  */
}
// --- END OF ADDED FUNCTION ---