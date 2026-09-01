AI Study Desk

AI Study Desk is a full-stack AI-powered study assistant that converts a topic or study notes into interactive flashcards.

The application allows users to provide study material, choose a difficulty level and number of cards, and generate structured flashcards using the Gemini API.

## Features

- Generate AI-powered flashcards from study topics or notes
- Choose flashcard difficulty:
  - Easy
  - Medium
  - Hard
- Choose the number of flashcards:
  - 5
  - 7
  - 10
- Reveal and hide answers
- Navigate between flashcards
- Flashcard progress indicator
- Keyboard navigation using arrow keys
- Loading state during AI generation
- Error handling with retry support
- Validation of AI-generated responses
- Responsive UI
- Production deployment on Vercel

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- CORS
- dotenv

### AI & Validation

- Google Gemini API
- `@google/genai`
- Zod

### Development & Deployment

- Git
- GitHub
- Vercel
- Concurrently

---

## How It Works

1. The user enters a topic or pastes study notes.
2. The user selects a difficulty level and number of flashcards.
3. React stores these values in component state.
4. The frontend sends a `POST` request to `/api/generate`.
5. The Express backend receives and validates the request.
6. The backend sends the study material and generation requirements to Gemini.
7. Gemini returns structured flashcard data.
8. The backend parses the AI response.
9. Zod validates the generated data before it is returned to the frontend.
10. React displays the validated flashcards.
11. The user can reveal answers and navigate through the generated cards.

---

## Application Architecture

```text
                    User
                     |
                     v
              React Frontend
                     |
                     | POST /api/generate
                     v
              Express Backend
                     |
              Request Validation
                     |
                     v
                Gemini API
                     |
             Structured Response
                     |
                     v
                JSON.parse()
                     |
                     v
              Zod Validation
                     |
              +------+------+
              |             |
            Valid         Invalid
              |             |
              v             v
          React UI        API Error
              |
              v
       Interactive Cards
