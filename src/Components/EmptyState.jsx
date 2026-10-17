export default function EmptyState({ searching }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCD7C9] bg-white/70 px-6 py-12 text-center">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#E7EFE3] text-3xl text-[#34765A]">
        {searching ? "⌕" : "♙"}
      </div>

      <h3 className="text-lg font-bold text-[#252D28]">
        {searching ? "No matching students" : "No students remaining"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#85877D]">
        {searching
          ? "Try another name, course, email address, or roll number."
          : "There are no student records left in the current display."}
      </p>
    </div>
  );
}