'use server';

import { z } from 'zod';

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
    // In a real application, you would handle the form submission here,
    // e.g., by sending an email or saving to a database.
    // For this example, we'll just simulate a successful submission.
    console.log('Form data submitted:');
    console.log(validatedFields.data);

    return {
      message: 'Thank you for your message! We will get back to you shortly.',
      status: 'success',
    };
  } catch (error) {
    return {
      message: 'An unexpected error occurred. Please try again.',
      status: 'error',
    };
  }
}
