export default function DeleteButton({ studentName, onDelete }) {
  return (
    <button
      type="button"
      onClick={onDelete}
      aria-label={`Delete ${studentName}`}
      className="inline-flex items-center gap-2 rounded-lg border border-[#F0CFC4] bg-[#FFF0EB] px-3 py-2.5 text-xs font-bold text-[#B84936] transition hover:border-[#B84936] hover:bg-[#B84936] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B84936]"
    >
      <span aria-hidden="true">⌫</span>
      Delete
    </button>
  );
}