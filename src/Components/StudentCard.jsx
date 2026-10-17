import { useState } from "react";

export default function StudentCard({
  student,
  onDelete,
  onEdit,
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#E7DFD0] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#D8B4A0] hover:shadow-[0_16px_35px_rgba(41,60,50,0.10)]">
      <div className="h-2 bg-[#B85C38]" />

      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-[76px] w-[76px] shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#E4E8D9] text-xl font-bold text-[#293C32]">
              {student.image && !imageFailed ? (
                <img
                  src={student.image}
                  alt={`Portrait of ${student.name}`}
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#B85C38]">
                {student.rollNo}
              </span>

              <h3 className="mt-1 text-lg font-extrabold text-[#293C32]">
                {student.name}
              </h3>

              <p className="mt-1 text-xs text-[#817A6B]">
                {student.year}
              </p>
            </div>
          </div>

          <span className="hidden rounded-full bg-[#EDF1E7] px-3 py-1.5 text-[10px] font-bold text-[#49644A] sm:inline-flex">
            Enrolled
          </span>
        </div>

        <div className="rounded-2xl bg-[#F8F5EE] p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8D897D]">
            Academic program
          </p>

          <p className="mt-2 text-sm font-semibold text-[#293C32]">
            {student.course}
          </p>

          <p className="mt-3 break-all text-xs leading-5 text-[#817A6B]">
            {student.email}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(student)}
            className="flex-1 rounded-xl border border-[#D9E1D2] bg-[#EDF1E7] px-3 py-3 text-sm font-bold text-[#49644A] transition hover:bg-[#DCE6D5]"
          >
            Edit profile
          </button>

          <button
            type="button"
            onClick={() => onDelete(student)}
            className="rounded-xl bg-[#B85C38] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#98472B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85C38]"
            aria-label={`Delete ${student.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}