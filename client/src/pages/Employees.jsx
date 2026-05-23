import React, { useCallback, useEffect, useState } from "react";
import {DEPARTMENTS } from "../assets/assets";
import {
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/axios";

/*  Spinner  */
const Spinner = () => (
  <div className="col-span-full flex justify-center py-20">
    <div
      className="h-8 w-8 rounded-full border-2 animate-spin"
      style={{
        borderColor: "rgba(59,130,246,0.25)",
        borderTopColor: "var(--accent)",
      }}
    />
  </div>
);

/*  Empty state  */
const EmptyState = ({ search }) => (
  <div
    className="col-span-full flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed"
    style={{
      background: "rgba(255,255,255,0.01)",
      borderColor: "var(--border)",
    }}
  >
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border)",
      }}
    >
      <UsersIcon
        size={20}
        strokeWidth={1.3}
        style={{ color: "var(--text-subtle)" }}
      />
    </div>
    <p
      className="text-[14px] font-medium mb-1"
      style={{ color: "var(--text-muted)" }}
    >
      {search ? `No results for "${search}"` : "No employees found"}
    </p>
    <p className="text-[12px]" style={{ color: "var(--text-subtle)" }}>
      {search
        ? "Try a different name or position"
        : "Add your first employee to get started"}
    </p>
  </div>
);

/*  Modal wrapper  */
const Modal = ({ title, subtitle, onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-3xl my-8 animate-slide-up"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal header */}
      <div
        className="flex items-center justify-between px-6 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <h2
            className="text-[15px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h2>
          <p
            className="text-[12px] mt-0.5"
            style={{ color: "var(--text-subtle)" }}
          >
            {subtitle}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg transition-colors duration-150"
          style={{ color: "var(--text-subtle)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-subtle)";
          }}
        >
          <XIcon size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Modal body */}
      <div className="p-6">{children}</div>
    </div>
  </div>
);

/*  Page  */
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async() => {
    try {
      const url = selectedDept ? `/employees?department=${selectedDept}` : "/employees"
      const res = await api.get(url)
      setEmployees(res.data)
    } catch (error) {
      console.error("Failed to fetch employees")
    }finally{
      setLoading(false)
    }
  }, [selectedDept]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div
      className="animate-fade-in p-6 lg:p-8 min-h-full"
      style={{ background: "var(--bg-base)" }}
    >
      {/*  Header  */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <UsersIcon
              size={13}
              strokeWidth={1.5}
              style={{ color: "var(--accent)" }}
            />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "var(--accent)" }}
            >
              Team
            </span>
          </div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">
            {loading
              ? "Loading…"
              : `${filtered.length} of ${employees.length} member${employees.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary w-full sm:w-auto"
        >
          <PlusIcon size={15} strokeWidth={2} />
          Add Employee
        </button>
      </div>

      {/*  Filters  */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon
            size={14}
            strokeWidth={1.5}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-subtle)" }}
          />
          <input
            type="text"
            placeholder="Search by name or position…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.25rem" }}
          />
        </div>

        {/* Department */}
        <div className="relative">
          <SlidersHorizontalIcon
            size={13}
            strokeWidth={1.5}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-subtle)" }}
          />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="sm:w-48"
            style={{ paddingLeft: "2.25rem" }}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*  Grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          filtered.map((emp) => (
            <EmployeeCard
              key={emp._id}
              employee={emp}
              onDelete={(deleteId) =>
                setEmployees((prev) =>
                  prev.filter((e) => e._id !== deleteId),
                )
              }
              onEdit={setEditEmployee}
            />
          ))
        )}
      </div>

      {/*  Create modal  */}
      {showCreateModal && (
        <Modal
          title="Add New Employee"
          subtitle="Create a user account and employee profile"
          onClose={() => setShowCreateModal(false)}
        >
          <EmployeeForm
            initialData={null}
            onSuccess={() => {
              setShowCreateModal(false);
              fetchEmployees();
            }}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>
      )}

      {/*  Edit modal  */}
      {editEmployee && (
        <Modal
          title="Edit Employee"
          subtitle="Update employee details and account settings"
          onClose={() => setEditEmployee(null)}
        >
          <EmployeeForm
            initialData={editEmployee}
            onSuccess={() => {
              setEditEmployee(null);
              fetchEmployees();
            }}
            onCancel={() => setEditEmployee(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Employees;
