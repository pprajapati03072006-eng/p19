import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  rollNo: "",
  course: "",
  email: "",
  year: "Year 1",
  image: "",
};

export default function StudentForm({
  student,
  students,
  onSave,
  onClose,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(student ? { ...emptyForm, ...student } : emptyForm);
    setError("");
  }, [student]);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const rollNo = form.rollNo.trim();
    const email = form.email.trim().toLowerCase();
    const course = form.course.trim();

    if (!name || !rollNo || !email || !course) {
      setError("Please complete all required fields.");
      return;
    }

    const duplicate = students.some(
      (item) =>
        item.rollNo.toLowerCase() === rollNo.toLowerCase() &&
        item.id !== student?.id
    );

    if (duplicate) {
      setError("This roll number already exists.");
      return;
    }

    onSave({
      ...form,
      name,
      rollNo,
      email,
      course,
      id: student?.id ?? crypto.randomUUID(),
      image:
        form.image.trim() ||
        `https://i.pravatar.cc/200?u=${encodeURIComponent(email)}`,
    });
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#E5DFD2] bg-[#FCFAF5] px-4 py-3 text-sm text-[#293C32] outline-none transition placeholder:text-[#A19A8C] focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38]/10";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#17241C]/65 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-form-title"
        className="my-auto max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-7 flex items-start justify-between">
          <div>
            <p className="mb-2 text-[10px] font-extrabold tracking-[2px] text-[#B85C38]">
              CAMPUS DIRECTORY
            </p>
            <h2
              id="student-form-title"
              className="text-2xl font-extrabold text-[#293C32]"
            >
              {student ? "Edit student" : "Add a student"}
            </h2>
            <p className="mt-2 text-sm text-[#817A6B]">
              Add profile details and a student photo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-xl px-3 py-2 text-xl text-[#817A6B] hover:bg-[#F5F1E8]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-[#465448]">
              Full name *
            </label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter student's name"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#465448]">
                Roll number *
              </label>
              <input
                required
                name="rollNo"
                value={form.rollNo}
                onChange={handleChange}
                placeholder="STU-007"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#465448]">
                Academic year
              </label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className={inputClass}
              >
                {["Year 1", "Year 2", "Year 3", "Year 4"].map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#465448]">
              Course *
            </label>
            <input
              required
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Computer Science"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#465448]">
              Email address *
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#465448]">
              Student photo URL
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className={inputClass}
            />
            <p className="mt-2 text-xs text-[#817A6B]">
              Paste a publicly accessible image URL. Leave empty
              to use a generated avatar.
            </p>

            {form.image.trim() && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={form.image}
                  alt="Student preview"
                  className="h-16 w-16 rounded-xl border border-[#E5DFD2] object-cover"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
                <span className="text-xs text-[#817A6B]">
                  Photo preview
                </span>
              </div>
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-[#B04430]">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-[#EEE8DC] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#E5DFD2] px-5 py-3 text-sm font-semibold text-[#62675F] hover:bg-[#F8F5EE]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#293C32] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3B5745]"
            >
              {student ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}