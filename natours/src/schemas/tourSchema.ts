import { z } from 'zod';

export const tourSchema = z.object({
  id: z.coerce
    .number()
    .int('ID should be an integer')
    .gte(0, 'ID should be positive'),
});

export type Tour = z.infer<typeof tourSchema>;
