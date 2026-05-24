import { useCallback, useEffect, useState } from "react";
import { dummyLeaveData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  PalmtreeIcon,
  PlusIcon,
  ThermometerIcon,
  UmbrellaIcon,
  FileTextIcon,
} from "lucide-react";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const accentMap = [
  { bg: "rgba(239,68,68,0.1)", text: "#f87171", bar: "#ef4444" },
  { bg: "rgba(59,130,246,0.1)", text: "#60a5fa", bar: "#3b82f6" },
  { bg: "rgba(16,185,129,0.1)", text: "#34d399", bar: "#10b981" },
];

const Leave = () => {
  const {user} = useAuth()
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  const fetchLeaves = useCallback(async() => {
    try {
      const res = await api.get('/leave')
      setLeaves(res.data.data || [])
      if(res.data.employee?.isDeleted) setIsDeleted(true)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }finally{
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading />;

  let sickCount = 0,
    casualCount = 0,
    annualCount = 0;
  leaves.forEach((l) => {
    if (l.status === "APPROVED") {
      if (l.type === "SICK") sickCount++;
      else if (l.type === "CASUAL") casualCount++;
      else if (l.type === "ANNUAL") annualCount++;
    }
  });

  const leaveStats = [
    { label: "Sick Leave", value: sickCount, icon: ThermometerIcon },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon },
    { label: "Annual Leave", value: annualCount, icon: PalmtreeIcon },
  ];

  return (
    <div
      className="animate-fade-in p-6 lg:p-8 min-h-full"
      style={{ background: "var(--bg-base)" }}
    >
      {/*  Header  */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileTextIcon
              size={13}
              strokeWidth={1.5}
              style={{ color: "var(--accent)" }}
            />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "var(--accent)" }}
            >
              {isAdmin ? "Admin" : "Employee"}
            </span>
          </div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Manage and review leave applications"
              : "Your leave history and requests"}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary w-full sm:w-auto"
          >
            <PlusIcon size={15} strokeWidth={2} />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Leave stat cards (employee only)  */}
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {leaveStats.map((s, i) => {
            const a = accentMap[i];
            return (
              <div
                key={s.label}
                className="card card-hover relative overflow-hidden group cursor-default"
                style={{ borderRadius: 14, padding: "16px" }}
              >
                <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
                  <div
                    className="w-10 h-10 sm:mb-4 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: a.bg }}
                  >
                    <s.icon
                      size={18}
                      strokeWidth={1.6}
                      style={{ color: a.text }}
                    />
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <div className="flex items-baseline gap-1.5">
                      <p
                        className="text-2xl sm:text-3xl font-semibold tracking-tight leading-none"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {s.value}
                      </p>
                      <span
                        className="text-[11px]"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        taken
                      </span>
                    </div>
                    <p
                      className="text-[12px] sm:text-[13px] font-medium mt-1 sm:mt-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: a.bar }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/*  Leave history  */}
      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />
      {/* Leave Modal */}
      <ApplyLeaveModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          fetchLeaves();
        }}
      />
    </div>
  );
};

export default Leave;
