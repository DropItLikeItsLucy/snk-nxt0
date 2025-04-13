// emails/ContactFormEmail.tsx
import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Hr,
  Preview,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New Contact Message from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Message via Snacky Contact Form</Heading>
        <Text style={paragraph}>You received a new message from:</Text>
        <Text style={details}><strong>Name:</strong> {name}</Text>
        <Text style={details}><strong>Email:</strong> {email}</Text>
        {subject && <Text style={details}><strong>Subject:</strong> {subject}</Text>}
        <Hr style={hr} />
        <Text style={paragraph}><strong>Message:</strong></Text>
        <Text style={messageStyle}>{message}</Text>
      </Container>
    </Body>
  </Html>
);

// Basic styles (inline for better email client compatibility)
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
   padding: '0 40px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#484848',
   padding: '0 40px',
};

const details = {
    ...paragraph,
    padding: '0 40px',
    margin: '5px 0',
};

const messageStyle = {
    ...paragraph,
    padding: '0 40px',
    whiteSpace: 'pre-wrap' as const, // Preserve line breaks from textarea
};


const hr = {
  borderColor: '#f0f0f0',
  margin: '20px 0',
};

export default ContactFormEmail;