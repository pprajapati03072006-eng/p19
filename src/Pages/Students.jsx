import { useEffect, useMemo, useState } from "react";

import Sidebar from "../Components/Sidebar.jsx";
import DashboardHeader from "../Components/DashboardHeader";
import StudentStats from "../Components/StudentStats";
import StudentList from "../Components/StudentList";
import StudentForm from "../Components/StudentForm";

import { initialStudents } from "../data/students.js";
const STORAGE_KEY = "campusly-students";

function loadStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed.map((student) => {
          const sample = initialStudents.find(
            (item) => item.id === student.id
          );

          return {
            ...student,
            image: student.image || sample?.image || "",
          };
        });
      }
    }
  } catch {
    console.error("Unable to load student records.");
  }

  return initialStudents;
}

export default function Students() {
  const [students, setStudents] = useState(loadStudents);
  const [search, setSearch] = useState("");
  const [deletedCount, setDeletedCount] = useState(0);
  const [notice, setNotice] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Save student records to browser storage.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      setNotice("Unable to save changes in browser storage.");
    }
  }, [students]);

  // Live search across student information.
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students;

    return students.filter((student) =>
      [
        student.name,
        student.rollNo,
        student.course,
        student.email,
        student.year,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )
    );
  }, [students, search]);

  // Delete a selected student.
  function handleDelete(student) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) return;

    setStudents((currentStudents) =>
      currentStudents.filter((item) => item.id !== student.id)
    );

    setDeletedCount((count) => count + 1);
    setNotice(`${student.name} was deleted successfully.`);
  }

  // Add a new student or update an existing student.
  function handleSave(student) {
    const exists = students.some(
      (item) => item.id === student.id
    );

    if (exists) {
      setStudents((currentStudents) =>
        currentStudents.map((item) =>
          item.id === student.id ? student : item
        )
      );

      setNotice(`${student.name}'s details were updated.`);
    } else {
      setStudents((currentStudents) => [
        student,
        ...currentStudents,
      ]);

      setNotice(`${student.name} was added successfully.`);
    }

    setFormOpen(false);
    setEditingStudent(null);
  }

  function openAddForm() {
    setEditingStudent(null);
    setFormOpen(true);
  }

  function openEditForm(student) {
    setEditingStudent(student);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingStudent(null);
  }

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#293C32] md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1500px]">

          {/* Dashboard header and search */}
          <DashboardHeader
            search={search}
            setSearch={setSearch}
            onAdd={openAddForm}
          />

          {/* Success notifications */}
          {notice && (
            <div
              role="status"
              className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-[#D0DFCA] bg-[#E8EFDF] px-4 py-3 text-sm font-medium text-[#49644A]"
            >
              <span>{notice}</span>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="rounded-lg px-2 text-xl hover:bg-[#DCE6D5]"
              >
                ×
              </button>
            </div>
          )}

          {/* Dynamic statistics */}
          <StudentStats
            total={students.length}
            visible={filteredStudents.length}
            deleted={deletedCount}
          />

          {/* Student cards */}
          <StudentList
            students={filteredStudents}
            onDelete={handleDelete}
            onEdit={openEditForm}
            search={search}
          />

          {/* Footer */}
          <footer className="mt-12 flex flex-wrap justify-between gap-3 border-t border-[#E5DFD2] py-5 text-xs text-[#817A6B]">
            <span>© 2026 Campusly Student Portal</span>
            <span>Organized. Simple. Efficient.</span>
          </footer>
        </div>
      </main>

      {/* Add/Edit modal */}
      {formOpen && (
        <StudentForm
          student={editingStudent}
          students={students}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  );
}