import { CountryCode, TravelAppSatisfaction } from '@prisma/client';
import { z } from 'zod';

export const onboardingSchema = z.object({
  dateOfBirth: z.coerce.number().optional().nullable(),
  country: z.nativeEnum(CountryCode).optional().nullable(),
  travelType: z.string().optional().nullable(),
  aiFeatures: z
    .union([z.array(z.string()), z.null()])
    .optional()
    .nullable(),
  appSatisfaction: z.nativeEnum(TravelAppSatisfaction).optional().nullable(),
});
