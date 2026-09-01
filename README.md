# AI Study Desk

AI Study Desk is a full-stack AI-powered study application that converts a topic or study notes into useful flashcards.

Users can enter their study material, select a difficulty level and number of cards, and generate structured flashcards using Google's Gemini API.

## Features

- Generate AI-powered flashcards from topics or notes
- Choose difficulty: Easy, Medium, or Hard
- Choose number of flashcards: 5, 7, or 10
- Reveal and hide flashcard answers
- Navigate between flashcards
- Keyboard navigation using arrow keys
- Loading and error states
- AI response validation using Zod
- Structured AI output using Gemini JSON schema
- Responsive and clean UI
- Express backend API
- Deployed on Vercel

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express
- Google Gemini API
- Zod
- CORS
- dotenv

### Deployment
- Vercel
- GitHub

## How It Works

1. Enter a topic or paste your study notes.
2. Select the difficulty level.
3. Select the number of flashcards.
4. Click **Generate Study Material**.
5. The backend sends the study material and preferences to Gemini.
6. Gemini generates structured flashcard data.
7. The backend validates the AI response using Zod.
8. The validated flashcards are displayed in the React frontend.
9. Users can reveal answers and navigate through the cards.

## Project Structure

```text
ai-study-desk/
├── api/
│   └── index.js
├── server/
│   ├── aiSchema.js
│   ├── schemas.js
│   └── server.js
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx
│   │   ├── Flashcard.jsx
│   │   ├── FlashcardList.jsx
│   │   ├── Header.jsx
│   │   └── StudyInput.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
└── README.md
