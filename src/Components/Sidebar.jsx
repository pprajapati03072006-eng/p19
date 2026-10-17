import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-full shrink-0 bg-[#293C32] p-6 text-[#F7F2E8] md:sticky md:top-0 md:h-screen md:w-[260px]">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#B85C38] text-2xl font-black">
          C
        </div>

        <div>
          <h2 className="text-xl font-extrabold">Campusly</h2>
          <p className="mt-1 text-[9px] tracking-[3px] text-[#D0D9CA]">
            STUDENT PORTAL
          </p>
        </div>
      </div>

      <p className="mb-4 text-[10px] font-bold tracking-[2px] text-[#B8C9A8]">
        MANAGEMENT
      </p>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `block rounded-xl px-4 py-3.5 text-sm transition ${
            isActive
              ? "bg-[#435747] font-semibold text-white"
              : "text-[#E0E5DA] hover:bg-[#354B3C]"
          }`
        }
      >
        ▦ &nbsp; Student Directory
      </NavLink>

      <div className="mt-8 rounded-2xl border border-[#526552] bg-[#344A3A] p-4">
        <p className="text-sm font-semibold">
          Your campus, organized.
        </p>
        <p className="mt-2 text-xs leading-5 text-[#D0D9CA]">
          Manage student profiles and academic records in one place.
        </p>
      </div>
    </aside>
  );
}