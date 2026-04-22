import React from "react";
import LoginLeftSide from "../components/LoginLeftSide";
import { ShieldIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LoginLanding = () => {
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, departments, payroll & system configurations",
      icon: ShieldIcon,
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View profile, attendance, time-off requests & payslips",
      icon: UserIcon,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 sm:p-12 lg:p-16 bg-[#E6E6E6] min-h-screen">
        <div className="w-full">

          {/* Header */}
          <div className="mb-7">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', color: '#6366f1', textTransform: 'uppercase', marginBottom: 10 }}>
              Secure Access
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, fontWeight: 400, color: '#0f172a', lineHeight: 1.15, marginBottom: 6 }}>
              Welcome Back
            </h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: '#94a3b8', lineHeight: 1.6 }}>
              Select your portal to continue into the system.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="flex flex-col gap-3 mb-7">
            {portalOptions.map((portal) => (
              <Link
                key={portal.to}
                to={portal.to}
                className="group flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 group-hover:bg-indigo-100 transition-colors flex-shrink-0">
                    <portal.icon className="w-[18px] h-[18px] text-slate-500 group-hover:text-indigo-500 transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {portal.title}
                    </span>
                    <span className="text-xs font-light text-slate-400 leading-snug">
                      {portal.description}
                    </span>
                  </div>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" strokeWidth={1.5} />
              </Link>
            ))}
          </div>

          {/* Footer */}
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} WorkSphere. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;