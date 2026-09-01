import { z } from "zod";

export const geminiStudySchema = {
  type: "object",

  properties: {
    cards: {
      type: "array",

      items: {
        type: "object",

        properties: {
          question: {
            type: "string",
          },

          answer: {
            type: "string",
          },
        },

        required: ["question", "answer"],
      },
    },
  },

  required: ["cards"],
};