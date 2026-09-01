function StudyInput({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  cardCount,
  setCardCount,
  onGenerate,
  loading,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          What do you want to study?
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter a topic or paste your notes and we'll turn them into
          study material.
        </p>
      </div>

      <textarea
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder="Example: Explain JavaScript promises..."
        disabled={loading}
        className="min-h-40 w-full resize-none rounded-xl border border-slate-300 p-4 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50"
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Number of cards
          </label>

          <select
            value={cardCount}
            onChange={(event) =>
              setCardCount(Number(event.target.value))
            }
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value={5}>5 cards</option>
            <option value={7}>7 cards</option>
            <option value={10}>10 cards</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {topic.length} characters
        </span>

        <button
          onClick={onGenerate}
          disabled={!topic.trim() || loading}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Generating..." : "Generate Study Material"}
        </button>
      </div>
    </section>
  );
}

export default StudyInput;