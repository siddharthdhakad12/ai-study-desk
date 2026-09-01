function EmptyState() {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto max-w-md">
        <h2 className="text-lg font-semibold text-slate-900">
          No study material yet
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter a topic or paste your notes above and generate
          flashcards to start studying.
        </p>
      </div>
    </section>
  );
}

export default EmptyState;