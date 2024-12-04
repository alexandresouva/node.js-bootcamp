import { z } from 'zod';

export const idSchema = z.object({
  id: z.coerce
    .number()
    .int('ID should be an integer')
    .gte(0, 'ID should be positive')
});

export type id = z.infer<typeof idSchema>;
