// app/actions/sendEmailAction.ts
'use server'; // Mark this function to run on the server

import { Resend } from 'resend';
import { z } from 'zod'; // For validation
import ContactFormEmail from '@/emails/ContactFormEmail'; // Import the email template
import React from 'react';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;

// Define a schema for validation using Zod
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().optional(), // Subject is optional
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// Define the return type for the action
type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>; // For validation errors
};

export async function sendEmailAction(
    prevState: ActionResponse | undefined, // Required for useFormState
    formData: FormData
): Promise<ActionResponse> {

    if (!fromEmail || !toEmail) {
        console.error("Missing FROM_EMAIL or TO_EMAIL environment variables");
        return { success: false, message: "Server configuration error. Please try again later." };
    }

    // 1. Extract data from FormData
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject') || undefined, // Handle potentially null subject
        message: formData.get('message'),
    };

    // 2. Validate data using Zod
    const validationResult = ContactFormSchema.safeParse(rawData);

    if (!validationResult.success) {
        console.log("Validation Errors:", validationResult.error.flatten().fieldErrors);
        return {
            success: false,
            message: "Validation failed. Please check the form.",
            errors: validationResult.error.flatten().fieldErrors,
        };
    }

    // 3. Data is valid, prepare for sending
    const { name, email, subject, message } = validationResult.data;

    try {
        // 4. Send email using Resend
        const data = await resend.emails.send({
            from: `Snacky Contact Form <${fromEmail}>`, // Sender name + email
            to: [toEmail], // Recipient email(s)
            reply_to: email, // Set Reply-To to the user's email
            subject: subject || `New message from ${name} via Snacky Website`, // Use provided subject or default
            react: React.createElement(ContactFormEmail, { // Use React Email template
                name: name,
                email: email,
                subject: subject,
                message: message,
            }),
        });

        // Check Resend response (optional but good practice)
        if (data.error) {
            console.error("Resend Error:", data.error);
            return { success: false, message: `Error sending email: ${data.error.message}` };
        }

        console.log("Email sent successfully:", data.data?.id);
        return { success: true, message: "Message sent successfully!" };

    } catch (error) {
        console.error("Failed to send email:", error);
        // Handle potential errors during sending
        let errorMessage = "Failed to send message. Please try again later.";
        if (error instanceof Error) {
           errorMessage = `An error occurred: ${error.message}`;
        }
        return { success: false, message: errorMessage };
    }
}