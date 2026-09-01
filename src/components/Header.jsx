function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            AI Study Desk
          </h1>

          <p className="text-xs text-slate-500">
            Turn your notes into study material
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          AI Powered
        </span>
      </div>
    </header>
  );
}

export default Header;