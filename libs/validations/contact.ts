import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .email('Please provide a valid email address')
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .max(1000, 'Message must not exceed 1000 characters')
    .trim()
    .optional()
    .or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
