const stats = [
  {
    key: "total",
    label: "Total Students",
    note: "Current student records",
    symbol: "♙",
    iconBg: "bg-[#E6EBDD]",
    iconColor: "text-[#49644A]",
  },
  {
    key: "visible",
    label: "Displayed Records",
    note: "Matching your search",
    symbol: "▤",
    iconBg: "bg-[#F5E5D8]",
    iconColor: "text-[#B85C38]",
  },
  {
    key: "deleted",
    label: "Deleted Records",
    note: "Removed this session",
    symbol: "×",
    iconBg: "bg-[#F5E8C9]",
    iconColor: "text-[#92702A]",
  },
];

export default function StudentStats({ total, visible, deleted }) {
  const values = { total, visible, deleted };

  return (
    <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.key}
          className="flex items-center gap-4 rounded-3xl border border-[#E7DFD0] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl font-bold ${stat.iconBg} ${stat.iconColor}`}
          >
            {stat.symbol}
          </div>

          <div>
            <p className="text-xs font-semibold text-[#817A6B]">
              {stat.label}
            </p>
            <h2 className="my-1 text-3xl font-extrabold tracking-tight text-[#293C32]">
              {String(values[stat.key]).padStart(2, "0")}
            </h2>
            <p className="text-[10px] text-[#9B9587]">
              {stat.note}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}