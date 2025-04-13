// app/contact/page.tsx
'use client'; // <-- ADD THIS LINE AT THE VERY TOP
import { useEffect, useRef } from 'react'; // Import useRef and useEffect
import { useFormState, useFormStatus } from 'react-dom'; // Import hooks for Server Actions
import type { Metadata } from 'next'; // Metadata can still be exported from client components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { sendEmailAction } from '@/app/actions/sendEmailAction'; // Adjust path if needed
import { AlertCircle, CheckCircle2 } from 'lucide-react'; // Example existing import

// Note: While you *can* export Metadata from Client Components,
// it's generally better practice to keep pages needing interactivity
// as Client Components and fetch/pass data if needed, or use Server Actions.
// But for simplicity here, we'll keep it.
/*
export const metadata: Metadata = {
  title: 'Contact Us - Snacky',
  description: 'Get in touch with Snacky. Find our contact details or send us a message.',
};
*/
// It's often better to handle metadata in the nearest Server Component parent (e.g., layout)
// or fetch it if truly dynamic. For a static contact page title/desc,
// setting it in layout.tsx or a static metadata export might be cleaner long-term.
function SubmitButton() {
    const { pending } = useFormStatus(); // Hook to check if the form is submitting
    return (
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending}>
           {pending ? 'გაგზავნა...' : 'გაგზავნა'} {/* Sending... : Send Message */}
        </Button>
    );
}

export default function ContactPage() {

  // --- FORM SUBMISSION HANDLING (Placeholder) ---
  // You'll need to implement the actual logic for sending the form data.
  // This could involve:
  // 1. Next.js Server Actions (Recommended modern approach)
  // 2. An API Route (/api/contact) that sends an email or saves to DB
  // 3. A third-party service like Formspree or Resend
  const initialState = { success: false, message: '', errors: undefined };
    // useFormState hook manages state updates based on the server action's return value
    const [state, formAction] = useFormState(sendEmailAction, initialState);
    const formRef = useRef<HTMLFormElement>(null); // Ref to reset the form

    // Effect to reset the form on successful submission
    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset(); // Reset form fields using the ref
        }
    }, [state]); // Run effect when state changes


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">კონტაქტი</h1> {/* Contact Us */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* --- Left Column: Contact Information --- */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">დაგვიკავშირდით</h2> {/* Get in Touch */}

          {/* Phone */}
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg mb-1">ტელეფონი</h3> {/* Phone */}
              {/* IMPORTANT: Replace with your actual phone number */}
              <a href="tel:+995XXXXXXXXX" className="text-gray-700 hover:text-orange-600 hover:underline transition-colors">
                +995 XXX XX XX XX
              </a>
              <p className="text-sm text-gray-500 mt-1">ორშ-პარ: 9:00 - 18:00</p> {/* Mon-Fri: 9am - 6pm */}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg mb-1">ელ. ფოსტა</h3> {/* Email */}
               {/* IMPORTANT: Replace with your actual email */}
              <a href="mailto:info@snacky.ge" className="text-gray-700 hover:text-orange-600 hover:underline transition-colors break-all">
                info@snacky.ge
              </a>
               <p className="text-sm text-gray-500 mt-1">გიპასუხებთ 24 საათის განმავლობაში</p> {/* We reply within 24 hours */}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg mb-1">მისამართი</h3> {/* Address */}
               {/* IMPORTANT: Replace with your actual address */}
              <p className="text-gray-700">
                თბილისი, [ქუჩის სახელი] N [ნომერი], <br />
                საქართველო, [ინდექსი]
                {/* Tbilisi, [Street Name] N [Number], <br/> Georgia, [Zip Code] */}
              </p>
              {/* Optional: Link to Google Maps */}
              {/* <a href="YOUR_GOOGLE_MAPS_LINK" target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 hover:underline mt-1 inline-block">View on Map</a> */}
            </div>
          </div>
        </div>

        {/* --- Right Column: Contact Form --- */}
        <div>
            <h2 className="text-2xl font-semibold mb-4">მოგვწერეთ შეტყობინება</h2>
            {/* Use the formAction directly in the form tag */}
            <form ref={formRef} action={formAction} className="space-y-6">
                {/* Name Field with Error Display */}
                <div>
                    <Label htmlFor="name" className="mb-2 block text-sm font-medium">სახელი</Label>
                    <Input type="text" id="name" name="name" placeholder="თქვენი სახელი" required aria-describedby={state?.errors?.name ? "name-error" : undefined} />
                    {state?.errors?.name && (
                       <p id="name-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                         <AlertCircle size={14} /> {state.errors.name.join(', ')}
                       </p>
                    )}
                </div>

                {/* Email Field with Error Display */}
                <div>
                    <Label htmlFor="email" className="mb-2 block text-sm font-medium">ელ. ფოსტა</Label>
                    <Input type="email" id="email" name="email" placeholder="you@example.com" required aria-describedby={state?.errors?.email ? "email-error" : undefined} />
                     {state?.errors?.email && (
                       <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                         <AlertCircle size={14} /> {state.errors.email.join(', ')}
                       </p>
                    )}
                </div>

                 {/* Subject Field (Optional) */}
                 <div>
                    <Label htmlFor="subject" className="mb-2 block text-sm font-medium">თემა</Label>
                    <Input type="text" id="subject" name="subject" placeholder="შეტყობინების თემა" />
                     {/* Add error display if subject validation is added */}
                </div>


                {/* Message Field with Error Display */}
                <div>
                    <Label htmlFor="message" className="mb-2 block text-sm font-medium">შეტყობინება</Label>
                    <Textarea id="message" name="message" rows={5} placeholder="თქვენი შეტყობინება..." required aria-describedby={state?.errors?.message ? "message-error" : undefined} />
                     {state?.errors?.message && (
                       <p id="message-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                         <AlertCircle size={14} /> {state.errors.message.join(', ')}
                       </p>
                    )}
                </div>

                {/* Submit Button Component & Feedback Area */}
                <div className='flex flex-col items-start gap-4'>
                    <SubmitButton />
                     {/* Display Success or General Error Messages */}
                     {state?.message && !state.success && !state.errors && (
                        <p className="text-sm text-red-600 flex items-center gap-1"> <AlertCircle size={14} /> {state.message}</p>
                     )}
                     {state?.message && state.success && (
                        <p className="text-sm text-green-600 flex items-center gap-1"> <CheckCircle2 size={14} /> {state.message}</p>
                     )}
                </div>
            </form>
        </div>

      </div>
    </div>
  );
}
