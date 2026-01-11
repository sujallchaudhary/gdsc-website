'use server';

import Airtable from 'airtable';
import { getClientIp, isValidIp } from '@/libs/ip-utils';
import { checkRateLimit } from '@/libs/rate-limiter';
import { contactFormSchema, type ContactFormData } from '@/libs/validations/contact';
import { z } from 'zod';

interface SubmitContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

let airtableBase: ReturnType<typeof Airtable.base> | null = null;

const getAirtableBase = () => {
  if (airtableBase) {
    return airtableBase;
  }

  const accessToken = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!accessToken || !baseId) {
    throw new Error('Airtable credentials are not configured');
  }

  Airtable.configure({
    apiKey: accessToken,
  });

  airtableBase = Airtable.base(baseId);
  return airtableBase;
};


export async function submitContactForm(
  formData: ContactFormData
): Promise<SubmitContactResponse> {
  try {
    const clientIp = await getClientIp();

    if (!isValidIp(clientIp) && clientIp !== 'unknown') {
      return {
        success: false,
        message: 'Invalid request',
        error: 'Invalid IP address',
      };
    }

    const rateLimitResult = await checkRateLimit(clientIp);
    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.resetTime);
      return {
        success: false,
        message: `Rate limit exceeded. Please try again after ${resetDate.toLocaleTimeString()}`,
        error: 'RATE_LIMIT_EXCEEDED',
      };
    }

    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const treeified = z.treeifyError(validationResult.error);
      const errorMessage = 
        treeified.properties?.name?.errors[0] ||
        treeified.properties?.email?.errors[0] ||
        treeified.properties?.message?.errors[0] ||
        treeified.errors[0] ||
        'Invalid form data';
      return {
        success: false,
        message: errorMessage,
        error: 'VALIDATION_ERROR',
      };
    }

    const validatedData = validationResult.data;

    const base = getAirtableBase();
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Contacts';

    await base(tableName).create([
      {
        fields: {
          Name: validatedData.name,
          Email: validatedData.email,
          Message: validatedData.message || '',
          IP: clientIp,
          'Submitted At': new Date().toISOString(),
        },
      },
    ]);

    return {
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    if (error instanceof Error && error.message.includes('credentials')) {
      return {
        success: false,
        message: 'Service configuration error. Please contact the administrator.',
        error: 'CONFIG_ERROR',
      };
    }

    return {
      success: false,
      message: 'An error occurred while submitting the form. Please try again later.',
      error: 'SUBMISSION_ERROR',
    };
  }
}
