'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  organization: z.string().optional(),
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
      subject: `New Contact Form Submission from ${validatedFields.data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedFields.data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedFields.data.email}">${validatedFields.data.email}</a></p>
            <p><strong>Organization:</strong> ${validatedFields.data.organization || 'Not specified'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${validatedFields.data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the CognitiveInsight.AI contact form.
          </p>
        </div>
      `,
    };

    // Auto-reply email to the user
    const userEmailOptions = {
      from: process.env.GMAIL_USER,
      to: validatedFields.data.email,
      subject: 'Thank you for contacting CognitiveInsight.AI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank You for Your Interest!
          </h2>
          
          <p>Dear ${validatedFields.data.name},</p>
          
          <p>Thank you for reaching out to CognitiveInsight.AI. We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
            <p style="font-style: italic; color: #666;">
              "${validatedFields.data.message}"
            </p>
          </div>
          
          <p>We're excited to discuss how our Cryptographically Integrated AI Framework (CIAF) can help your organization achieve verifiable AI governance.</p>
          
          <p>Best regards,<br>
          <strong>The CognitiveInsight.AI Team</strong></p>
          
          <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            CognitiveInsight.AI - Verifiable AI Governance for a Transparent Future<br>
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
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      status: 'success',
    };
  } catch (error) {
    return {
      message: 'An unexpected error occurred. Please try again.',
      status: 'error',
    };
  }
}
