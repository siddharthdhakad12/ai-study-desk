import { useState } from "react";
import Header from "./components/Header";
import StudyInput from "./components/StudyInput";
import EmptyState from "./components/EmptyState";
import FlashcardList from "./components/FlashcardList";

function App() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [cardCount, setCardCount] = useState(7);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      return;
    }

    setLoading(true);
    setError("");
    setCards([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          difficulty,
          cardCount,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to generate study material."
        );
      }

      setCards(result.data.cards);
    } catch (error) {
      console.error("Generate error:", error);

      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <StudyInput
            topic={topic}
            setTopic={setTopic}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            cardCount={cardCount}
            setCardCount={setCardCount}
            onGenerate={handleGenerate}
            loading={loading}
          />

          {loading && (
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

                <h2 className="text-lg font-semibold text-slate-900">
                  Creating your study material
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We're analyzing your topic and generating useful
                  flashcards. This may take a few seconds.
                </p>
              </div>
            </section>
          )}

          {!loading && error && (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <h2 className="font-semibold text-red-800">
                Something went wrong
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-600">
                {error}
              </p>

              <button
                onClick={handleGenerate}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </section>
          )}

          {!loading && !error && cards.length === 0 && (
            <EmptyState />
          )}

          {!loading && !error && cards.length > 0 && (
            <FlashcardList cards={cards} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;