import {
  Loader2Icon,
  LogInIcon,
  LogOutIcon,
  CheckCircle2Icon,
} from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    try {
      await api.post("/attendance")
      onAction()
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    }finally{
      setLoading(false)
    }
  };

  /*  Work day complete  */
  if (todayRecord?.checkOut) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl text-center"
        style={{
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.15)",
        }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <CheckCircle2Icon
            size={22}
            strokeWidth={1.5}
            style={{ color: "#34d399" }}
          />
        </div>
        <div>
          <h3
            className="text-[15px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Work Day Completed
          </h3>
          <p
            className="text-[12px] mt-0.5"
            style={{ color: "var(--text-subtle)" }}
          >
            Great job! See you tomorrow.
          </p>
        </div>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.isCheckedIn;

  /*  Clock in / out button  */
  const checkedInStyle = {
    background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.2)",
    color: "#f87171",
    iconBg: "rgba(239,68,68,0.12)",
    shadow: "rgba(239,68,68,0.1)",
  };
  const checkedOutStyle = {
    background: "rgba(59,130,246,0.08)",
    border: "1px solid rgba(59,130,246,0.2)",
    color: "#60a5fa",
    iconBg: "rgba(59,130,246,0.12)",
    shadow: "rgba(59,130,246,0.15)",
  };

  const s = isCheckedIn ? checkedInStyle : checkedOutStyle;
  const Icon = loading ? Loader2Icon : isCheckedIn ? LogOutIcon : LogInIcon;

  return (
    <button
      onClick={handleAttendance}
      disabled={loading}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-150 disabled:opacity-60 shadow-2xl"
      style={{
        background: s.background,
        border: s.border,
        boxShadow: `0 4px 24px ${s.shadow}`,
      }}
      onMouseEnter={(e) => {
        if (!loading) e.currentTarget.style.filter = "brightness(1.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: s.iconBg }}
      >
        <Icon
          size={20}
          strokeWidth={1.6}
          style={{ color: s.color }}
          className={loading ? "animate-spin" : ""}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold" style={{ color: s.color }}>
          {loading ? "Processing…" : isCheckedIn ? "Clock Out" : "Clock In"}
        </p>
        <p
          className="text-[11.5px] mt-0.5"
          style={{ color: "var(--text-subtle)" }}
        >
          {loading
            ? "Please wait"
            : isCheckedIn
              ? "Click to end your shift"
              : "Start your work day"}
        </p>
      </div>

      {/* Status dot */}
      {!loading && (
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          {isCheckedIn && (
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: "#34d399" }}
            />
          )}
          <span
            className="relative inline-flex rounded-full h-2.5 w-2.5"
            style={{
              background: isCheckedIn ? "#34d399" : "rgba(255,255,255,0.15)",
            }}
          />
        </span>
      )}
    </button>
  );
};

export default CheckInButton;
