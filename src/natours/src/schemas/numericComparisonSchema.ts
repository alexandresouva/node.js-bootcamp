import { z } from 'zod';

const numericComparisonSchema = z
  .object({
    $gte: z.coerce.number().optional(),
    $gt: z.coerce.number().optional(),
    $lte: z.coerce.number().optional(),
    $lt: z.coerce.number().optional()
  })
  .optional();

export default numericComparisonSchema;
