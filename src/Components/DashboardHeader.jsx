export default function DashboardHeader({
  search,
  setSearch,
  onAdd,
}) {
  return (
    <header className="mb-9">
      <p className="mb-6 text-xs text-[#817A6B]">
        Workspace / Student Directory
      </p>

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="mb-3 text-[10px] font-extrabold tracking-[2px] text-[#B85C38]">
            CAMPUS MANAGEMENT
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#293C32] sm:text-4xl">
            Student Directory
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#817A6B]">
            Manage student profiles, update academic records,
            and keep your campus organized.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <label className="flex h-12 min-w-0 items-center gap-3 rounded-xl border border-[#E5DFD2] bg-white px-4 sm:w-64">
            <span className="text-lg text-[#817A6B]">⌕</span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search students..."
              aria-label="Search students"
              className="w-full bg-transparent text-sm text-[#293C32] outline-none placeholder:text-[#A19A8C]"
            />
          </label>

          <button
            type="button"
            onClick={onAdd}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#B85C38] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#98472B] active:scale-[0.98]"
          >
            <span className="text-xl">+</span>
            Add Student
          </button>
        </div>
      </div>
    </header>
  );
}