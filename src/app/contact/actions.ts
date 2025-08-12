'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  organization: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

export async function handleContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    organization: formData.get('organization'),
    interest: formData.get('interest'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstErrorKey = Object.keys(fieldErrors)[0] as keyof typeof fieldErrors;
    const firstErrorMessage = fieldErrors[firstErrorKey]?.[0];

    return {
      message: firstErrorMessage || 'Invalid data provided.',
      status: 'error',
    };
  }

  try {
    // Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to you (notification)
    const adminEmailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `New Insight™ Early Access Request from ${validatedFields.data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Early Access Request - Insight™
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedFields.data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedFields.data.email}">${validatedFields.data.email}</a></p>
            <p><strong>Organization:</strong> ${validatedFields.data.organization || 'Not specified'}</p>
            <p><strong>Primary Interest:</strong> ${validatedFields.data.interest ? validatedFields.data.interest.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not specified'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${validatedFields.data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Insight™ Early Access contact form.
          </p>
        </div>
      `,
    };

    // Auto-reply email to the user
    const userEmailOptions = {
      from: process.env.GMAIL_USER,
      to: validatedFields.data.email,
      subject: 'Welcome to the Insight™ Early Access Program',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Welcome to Insight™ Early Access!
          </h2>
          
          <p>Dear ${validatedFields.data.name},</p>
          
          <p>Thank you for your interest in Insight™, our patent-pending cryptographic audit framework. We're excited to have you join our early access program!</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Interest: ${validatedFields.data.interest ? validatedFields.data.interest.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'General Interest'}</h3>
            <p style="font-style: italic; color: #666;">
              "${validatedFields.data.message}"
            </p>
          </div>
          
          <p>Our team will review your request and get back to you within 24-48 hours with next steps. In the meantime, you can learn more about our approach to turning confusion to clarity in AI compliance on our website.</p>
          
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #1976d2;">What to Expect Next:</h4>
            <ul style="margin: 10px 0;">
              <li>Technical discovery call within 48 hours</li>
              <li>Custom demonstration of Insight™ capabilities</li>
              <li>Discussion of pilot partnership opportunities</li>
            </ul>
          </div>
          
          <p>Best regards,<br>
          <strong>The CognitiveInsight AI Team</strong></p>
          
          <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Insight™ - Turn Confusion to Clarity | Patent-Pending Cryptographic Audit Framework<br>
            If you need immediate assistance, please reply to this email.
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(userEmailOptions)
    ]);

    return {
      message: 'Welcome to Insight™ Early Access! We will contact you within 24-48 hours with next steps.',
      status: 'success',
    };
  } catch (error) {
    return {
      message: 'An unexpected error occurred. Please try again.',
      status: 'error',
    };
  }
}
