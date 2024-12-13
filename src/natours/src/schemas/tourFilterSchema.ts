import { z } from 'zod';
import numericComparisonSchema from './numericComparisonSchema.ts';

const tourFilterSchema = z.object({
  name: z.string().optional(),
  duration: z
    .union([z.coerce.number().optional(), numericComparisonSchema])
    .optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  price: z
    .union([z.coerce.number().optional(), numericComparisonSchema])
    .optional(),
  sort: z
    .string()
    .optional()
    .transform((val) => val?.split(',').join(' ') || 'name'),
  fields: z
    .string()
    .optional()
    .transform((val) => val?.split(',').join(' ') || ''),
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1)
});

export default tourFilterSchema;
