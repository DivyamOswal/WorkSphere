import { AlertCircleIcon, Calendar1Icon, ClockIcon } from "lucide-react";
import React from "react";

const accentMap = [
  { bg: "rgba(59,130,246,0.1)", text: "#60a5fa", bar: "#3b82f6" },
  { bg: "rgba(245,158,11,0.1)", text: "#fbbf24", bar: "#f59e0b" },
  { bg: "rgba(16,185,129,0.1)", text: "#34d399", bar: "#10b981" },
];

const AttendanceStats = ({ history = [] }) => {
  const totalPresent = history.filter(
    (h) => h.status === "PRESENT" || h.status === "LATE",
  ).length;
  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    { label: "Days Present", value: totalPresent, icon: Calendar1Icon },
    { label: "Late Arrivals", value: totalLate, icon: AlertCircleIcon },
    { label: "Avg. Work Hrs", value: "8.5 hrs", icon: ClockIcon },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((s, i) => {
        const a = accentMap[i];
        return (
          <div
            key={s.label}
            className="card card-hover relative overflow-hidden group cursor-default"
            style={{ borderRadius: 16, padding: "20px" }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: a.bg }}
            >
              <s.icon size={18} strokeWidth={1.6} style={{ color: a.text }} />
            </div>

            {/* Value */}
            <p
              className="text-3xl font-semibold tracking-tight leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              {s.value}
            </p>

            {/* Label */}
            <p
              className="text-[13px] font-medium mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              {s.label}
            </p>

            {/* Hover bottom bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: a.bar }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;
