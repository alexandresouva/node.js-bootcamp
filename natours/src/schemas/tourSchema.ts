import { z } from 'zod';

export const tourSchema = z.object({
  name: z.string().min(3, 'Name should be at least 3 characters long'),
  duration: z.coerce.number().gte(0, 'Duration should be positive'),
  maxGroupSize: z.coerce.number().gte(0, 'Max group size should be positive'),
  difficulty: z.enum(['easy', 'medium', 'difficult']),
  ratingsAverage: z.coerce
    .number()
    .gte(0, 'Ratings average should be positive')
    .lte(5, 'Ratings average should be at most 5'),
  price: z.coerce.number().gte(0, 'Price should be positive'),
});

export type Tour = { id: number } & z.infer<typeof tourSchema>;
