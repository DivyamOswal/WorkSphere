import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { dummyProfileData } from '../assets/assets';
import {
  CalendarCheckIcon, ChevronRightIcon, DollarSignIcon,
  FileTextIcon, LayoutGridIcon, LogOutIcon, MenuIcon,
  SettingsIcon, UserIcon, XIcon
} from 'lucide-react'

const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = "ADMIN"; // or "EMPLOYEE"

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarCheckIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => { window.location.href = "/login"; };

  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-[22px] border-b border-white/5">
        <div className="w-[30px] h-[30px] bg-indigo-500 rounded-[7px] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
            <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
            <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
            <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-white/85">WorkSphere</p>
          <p className="text-[10px] text-white/30 mt-px">Management System</p>
        </div>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/30 hover:text-white/70 p-1">
          <XIcon size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* User card */}
      {userName && (
        <div className="mx-3 mt-3 mb-1 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[7px] bg-[#1e2d40] border border-white/[0.08] flex items-center justify-center shrink-0">
            <span className="text-[11px] font-medium text-indigo-400">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-white/80 truncate">{userName}</p>
            <p className="text-[10px] text-white/30 mt-px">{role === "ADMIN" ? "Administrator" : "Employee"}</p>
          </div>
        </div>
      )}

      {/* Section label */}
      <p className="px-5 pt-4 pb-2 text-[10px] font-medium uppercase tracking-widest text-white/25">
        Navigation
      </p>

      {/* Nav items */}
      <nav className="flex-1 px-2.5 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-[7px] text-[13px] font-normal transition-colors
                ${isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-white/40 hover:text-white/75 hover:bg-white/[0.04]"
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-indigo-500 rounded-r-full" />
              )}
              <item.icon
                className={`w-[15px] h-[15px] shrink-0 ${isActive ? "text-indigo-400" : "text-white/35 group-hover:text-white/60"}`}
                strokeWidth={1.5}
              />
              <span className="flex-1">{item.name}</span>
              {isActive && <ChevronRightIcon className="w-3 h-3 text-indigo-500/50" strokeWidth={2} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2.5 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[7px] text-[13px] font-normal text-white/35 hover:text-red-400 hover:bg-red-500/[0.07] transition-colors"
        >
          <LogOutIcon className="w-[15px] h-[15px]" strokeWidth={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10"
      >
        <MenuIcon size={18} strokeWidth={1.5} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col h-full w-60 bg-[#111827] shrink-0 border-r border-white/5">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-[#111827] z-50 flex flex-col transform transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;