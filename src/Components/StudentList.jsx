import StudentCard from "./StudentCard";
import EmptyState from "./EmptyState";

export default function StudentList({ students, onDelete, search }) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-[#252D28]">
            All Students
          </h2>
          <p className="mt-1.5 text-sm text-[#85877D]">
            Student profiles and enrollment details
          </p>
        </div>

        <span className="rounded-lg border border-[#E5E1D7] bg-white px-3 py-2 text-xs font-semibold text-[#666D63]">
          {students.length} records
        </span>
      </div>

      {students.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState searching={Boolean(search.trim())} />
      )}
    </section>
  );
}