import React from "react"
import LoginLeftSide from "../components/LoginLeftSide"
import { ShieldIcon, UserIcon, ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

const portalOptions = [
  {
    to: "/login/admin",
    title: "Admin Portal",
    description: "Manage employees, departments, payroll & system configurations",
    icon: ShieldIcon,
    accent: 'blue',
  },
  {
    to: "/login/employee",
    title: "Employee Portal",
    description: "View profile, attendance, time-off requests & payslips",
    icon: UserIcon,
    accent: 'violet',
  },
]

const accentMap = {
  blue:   { icon: 'rgba(79,142,247,0.12)',  iconText: '#60a5fa', border: 'rgba(79,142,247,0.25)',  bg: 'rgba(79,142,247,0.05)'  },
  violet: { icon: 'rgba(139,92,246,0.12)', iconText: '#a78bfa', border: 'rgba(139,92,246,0.25)', bg: 'rgba(139,92,246,0.05)' },
}

const LoginLanding = () => (
  <div className="min-h-screen flex flex-col md:flex-row">
    <LoginLeftSide />

    {/* Right Panel */}
    <div
      className="w-full md:w-1/2 flex items-center justify-center p-10 sm:p-12 lg:p-16"
      style={{ background: '#090e18', minHeight: '100vh' }}
    >
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-px h-3" style={{ background: '#4f8ef7' }} />
            <p className="text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: '#4f8ef7', fontFamily: "'Outfit', sans-serif" }}>
              Secure Access
            </p>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 34,
            fontWeight: 300,
            color: '#f4f0e8',
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            Welcome back
          </h2>
          <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(244,240,232,0.4)', lineHeight: 1.65, fontFamily: "'Outfit', sans-serif" }}>
            Select your portal to continue into the system.
          </p>
        </div>

        {/* Portal cards */}
        <div className="flex flex-col gap-3 mb-8">
          {portalOptions.map((portal) => {
            const a = accentMap[portal.accent]
            return (
              <Link
                key={portal.to}
                to={portal.to}
                className="group flex items-center justify-between p-4 rounded-xl transition-all duration-150"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(244,240,232,0.07)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = a.bg
                  e.currentTarget.style.borderColor = a.border
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(244,240,232,0.07)'
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-150"
                    style={{ background: a.icon, border: `1px solid ${a.border}` }}>
                    <portal.icon size={17} strokeWidth={1.5} style={{ color: a.iconText }} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13.5px] font-medium" style={{ color: '#f4f0e8', fontFamily: "'Outfit', sans-serif" }}>
                      {portal.title}
                    </span>
                    <span className="text-[11.5px]" style={{ color: 'rgba(244,240,232,0.35)', fontFamily: "'Outfit', sans-serif", lineHeight: 1.5, fontWeight: 300 }}>
                      {portal.description}
                    </span>
                  </div>
                </div>
                <ArrowRightIcon size={15} strokeWidth={1.5} className="shrink-0 transition-colors duration-150"
                  style={{ color: 'rgba(244,240,232,0.2)' }} />
              </Link>
            )
          })}
        </div>
        {/* Footer */}
        <p className="text-[11px]" style={{ color: 'rgba(244,240,232,0.18)', fontFamily: "'Outfit', sans-serif" }}>
          © {new Date().getFullYear()} WorkSpace. All rights reserved.
        </p>
      </div>
    </div>
  </div>
)

export default LoginLanding