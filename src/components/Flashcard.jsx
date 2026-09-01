import { useState } from "react";

function Flashcard({ card }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Question
        </span>

        <span className="text-xs text-slate-400">
          Flashcard
        </span>
      </div>

      <h2 className="text-xl font-semibold leading-8 text-slate-900">
        {card.question}
      </h2>

      {showAnswer && (
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Answer
          </p>

          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
            {card.answer}
          </p>
        </div>
      )}

      <button
        onClick={() => setShowAnswer((previous) => !previous)}
        className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        {showAnswer ? "Hide Answer" : "Reveal Answer"}
      </button>
    </div>
  );
}

export default Flashcard;