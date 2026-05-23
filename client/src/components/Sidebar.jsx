import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarCheckIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

/*  small reusable nav link  */
const NavLink = ({ item, pathname }) => {
  const isActive = pathname.startsWith(item.href);
  return (
    <Link
      to={item.href}
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-normal
        transition-all duration-150 group
        ${
          isActive
            ? "bg-blue-500/10 text-blue-400"
            : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
        }
      `}
    >
      {/* Active left bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-500 rounded-r-full" />
      )}

      <item.icon
        size={15}
        strokeWidth={1.6}
        className={`shrink-0 transition-colors duration-150
          ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}
      />

      <span className="flex-1 tracking-[0.01em]">{item.name}</span>

      {isActive && (
        <ChevronRightIcon
          size={12}
          strokeWidth={2}
          className="text-blue-500/50"
        />
      )}
    </Link>
  );
};

/* main sidebar */
const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, logout } = useAuth();
  const role = user?.role ?? "EMPLOYEE";
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarCheckIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  useEffect(() => {
    api.get("/profile").then(({ data }) => {
      if (data.firstName)
        setUserName(`${data.firstName} ${data.lastName || ""}`.trim());
    });
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const initials = userName
    ? userName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  /* sidebar body  */
  const Body = ({ onClose }) => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-[22px] border-b border-white/[0.06]">
        {/* Logo mark */}
        <div className="w-8 h-8 rounded-[8px] bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect
              x="1"
              y="1"
              width="6"
              height="6"
              rx="1.5"
              fill="#60a5fa"
              opacity="0.9"
            />
            <rect
              x="9"
              y="1"
              width="6"
              height="6"
              rx="1.5"
              fill="#60a5fa"
              opacity="0.45"
            />
            <rect
              x="1"
              y="9"
              width="6"
              height="6"
              rx="1.5"
              fill="#60a5fa"
              opacity="0.45"
            />
            <rect
              x="9"
              y="9"
              width="6"
              height="6"
              rx="1.5"
              fill="#60a5fa"
              opacity="0.2"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-slate-100 tracking-[0.01em]">
            WorkSphere
          </p>
          <p className="text-[10px] text-slate-500 mt-px tracking-widest uppercase">
            Employee Management
          </p>
        </div>

        {/* Mobile close */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <XIcon size={17} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/*  User card */}
      {userName && (
        <div className="mx-3 mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-blue-400 tracking-wide">
              {initials}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-medium text-slate-200 truncate">
              {userName}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest">
              {role === "ADMIN" ? "Administrator" : "Employee"}
            </p>
          </div>

          {/* Online dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
      )}

      {/*  Section label  */}
      <p className="px-5 pt-5 pb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
        Navigation
      </p>

      {/* Nav items  */}
      <nav className="flex-1 px-2.5 flex flex-col gap-0.5 overflow-y-auto">
        {loading ? (
          <div className="px-3 py-3 flex items-center gap-2 text-slate-500">
            <Loader2 className="animate-spin w-4 h-4" />
            <span className="text-sm">Loading....</span>
          </div>
        ) : (
          navItems.map((item) => (
            <NavLink key={item.name} item={item} pathname={pathname} />
          ))
        )}
      </nav>

      {/*  Divider */}
      <div className="mx-3 my-3 h-px bg-white/[0.06]" />

      {/*  Logout  */}
      <div className="px-2.5 pb-4">
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
            text-[13px] text-slate-500
            hover:text-red-400 hover:bg-red-500/[0.07]
            transition-all duration-150
          "
        >
          <LogOutIcon size={15} strokeWidth={1.6} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/*  Mobile hamburger  */}
      <button
        onClick={() => setMobileOpen(true)}
        className="
          lg:hidden fixed top-4 left-4 z-50
          p-2 rounded-lg bg-slate-900 border border-white/[0.08]
          text-slate-400 hover:text-slate-200
          shadow-xl transition-colors
        "
      >
        <MenuIcon size={18} strokeWidth={1.5} />
      </button>

      {/*  Mobile overlay  */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/*  Desktop sidebar  */}
      <aside className="hidden lg:block h-full w-60 bg-[#0e1521] border-r border-white/[0.06] shrink-0">
        <Body />
      </aside>

      {/*  Mobile sidebar  */}
      <aside
        className={`
          lg:hidden fixed inset-y-0 left-0 z-50 w-64
          bg-[#0e1521] border-r border-white/[0.06]
          transform transition-transform duration-200 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Body onClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
};

export default Sidebar;