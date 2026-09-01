import { z } from "zod";

const flashcardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const studyMaterialSchema = z.object({
  cards: z
    .array(flashcardSchema)
    .min(1)
    .max(10),
});