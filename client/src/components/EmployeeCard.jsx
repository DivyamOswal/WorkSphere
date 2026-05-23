import { PencilIcon, Trash2Icon, MailIcon, BriefcaseIcon } from "lucide-react";
import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const accents = [
  { bg: "rgba(59,130,246,0.12)", text: "#60a5fa", strip: "#3b82f6" },
  { bg: "rgba(139,92,246,0.12)", text: "#a78bfa", strip: "#8b5cf6" },
  { bg: "rgba(16,185,129,0.12)", text: "#34d399", strip: "#10b981" },
  { bg: "rgba(245,158,11,0.12)", text: "#fbbf24", strip: "#f59e0b" },
  { bg: "rgba(236,72,153,0.12)", text: "#f472b6", strip: "#ec4899" },
];

const statusMap = {
  Active: { label: "Active", cls: "badge badge-success" },
  Inactive: { label: "Inactive", cls: "badge badge-danger" },
  "On Leave": { label: "On Leave", cls: "badge badge-warning" },
};

/* Hash any string/number id into a stable accent index */
const hashId = (id) => {
  const str = String(id ?? 0);
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % accents.length;
};

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const [deleting, setDeleting] = useState(false);

  const accent = accents[hashId(employee._id)];
  const initials =
    `${employee.firstName?.[0] ?? ""}${employee.lastName?.[0] ?? ""}`.toUpperCase();
  const status = statusMap[employee.status] ?? statusMap["Active"];

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      await api.delete(`/employees/${employee._id}`)
      onDelete(employee._id)
    } catch (err) {
      toast.error(err.response?.data?.error || err.message)
    }
  };

  return (
    <div
      className="card card-hover group relative flex flex-col overflow-hidden cursor-default"
      style={{ borderRadius: 16 }}
    >
      {/* Accent top strip */}
      <div
        className="h-[3px] w-full shrink-0"
        style={{ background: accent.strip, opacity: 0.6 }}
      />

      {/* Avatar section */}
      <div
        className="relative flex items-center justify-center py-8"
        style={{
          background: `radial-gradient(ellipse at center, ${accent.bg} 0%, transparent 70%)`,
        }}
      >
        {/* Avatar */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-semibold tracking-wide select-none"
          style={{
            background: accent.bg,
            color: accent.text,
            border: `1px solid ${accent.text}22`,
          }}
        >
          {initials}
        </div>

        {/* Dept badge - top left */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10.5px] font-medium px-2 py-0.5 rounded-full tracking-wide"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "var(--text-subtle)",
              border: "1px solid var(--border)",
            }}
          >
            {employee.department || "Unassigned"}
          </span>
        </div>

        {/* Deleted badge - top right */}
        {employee.isDeleted && (
          <div className="absolute top-3 right-3">
            <span className="badge badge-danger">Deleted</span>
          </div>
        )}

        {/* Action overlay - only when not deleted */}
        {!employee.isDeleted && (
          <div
            className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{
              background: "rgba(9,14,24,0.6)",
              backdropFilter: "blur(4px)",
            }}
          >
            <button
              onClick={() => onEdit?.(employee)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "#60a5fa",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(59,130,246,0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(59,130,246,0.15)")
              }
            >
              <PencilIcon size={12} strokeWidth={1.8} />
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 disabled:opacity-50"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
              }}
              onMouseEnter={(e) => {
                if (!deleting)
                  e.currentTarget.style.background = "rgba(239,68,68,0.22)";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(239,68,68,0.12)")
              }
            >
              <Trash2Icon size={12} strokeWidth={1.8} />
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="px-4 pb-4 pt-3 flex flex-col gap-3">
        {/* Name + status */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className="text-[14px] font-medium truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {employee.firstName} {employee.lastName}
            </p>
            <div
              className="flex items-center gap-1.5 mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              <BriefcaseIcon size={10} strokeWidth={1.5} className="shrink-0" />
              <p className="text-[11.5px] truncate">
                {employee.position || "-"}
              </p>
            </div>
          </div>
          <span className={`${status.cls} shrink-0`}>{status.label}</span>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--border)" }} />

        {/* Email */}
        {employee.email && (
          <div
            className="flex items-center gap-2"
            style={{ color: "var(--text-subtle)" }}
          >
            <MailIcon size={11} strokeWidth={1.5} className="shrink-0" />
            <span className="text-[11px] truncate">{employee.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
