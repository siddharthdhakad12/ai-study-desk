import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";

function FlashcardList({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [cards]);

  const goToNext = () => {
    setCurrentIndex((previous) =>
      Math.min(previous + 1, cards.length - 1)
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((previous) =>
      Math.max(previous - 1, 0)
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.tagName === "SELECT"
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cards.length]);

  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return null;
  }

  const progress =
    ((currentIndex + 1) / cards.length) * 100;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Your Study Material
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            Flashcards
          </h2>
        </div>

        <span className="text-sm text-slate-500">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
        aria-label={`Progress: ${currentIndex + 1} of ${cards.length}`}
      >
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <Flashcard
        key={currentIndex}
        card={currentCard}
      />

      <div className="flex gap-3">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <p className="text-center text-xs text-slate-400">
        Use ← and → arrow keys to navigate
      </p>
    </section>
  );
}

export default FlashcardList;