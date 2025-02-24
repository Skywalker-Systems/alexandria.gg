import { z } from "zod";

export const dynamoSchema = z.object({
    PK: z.string(),
    SK: z.string(),
    typename: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const contentSchema = dynamoSchema.extend({
    name: z.string(),
    url: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    difficulty: z.number(),
    language: z.string(),
    createdBy: z.string(),
});
