import {
  Building2Icon,
  Calendar1Icon,
  FileTextIcon,
  TrendingUpIcon,
  UserIcon,
} from 'lucide-react'
import React from 'react'

const statConfig = [
  {
    key: 'totalEmployees',
    icon: UserIcon,
    label: 'Total Employees',
    description: 'Active WorkSphere',
    accent: 'blue',
  },
  {
    key: 'totalDepartments',
    icon: Building2Icon,
    label: 'Departments',
    description: 'Organisation units',
    accent: 'violet',
  },
  {
    key: 'pendingLeaves',
    icon: Calendar1Icon,
    label: 'Pending Leaves',
    description: 'Awaiting approval',
    accent: 'amber',
  },
  {
    key: 'totalPayroll',
    icon: FileTextIcon,
    label: 'Payroll Processed',
    description: 'This month',
    accent: 'emerald',
  },
]

/* accent → tailwind colour tokens */
const accentMap = {
  blue:    { icon: 'bg-blue-500/10 text-blue-400',    bar: 'bg-blue-500',    badge: 'bg-blue-500/10 text-blue-400'    },
  violet:  { icon: 'bg-violet-500/10 text-violet-400', bar: 'bg-violet-500', badge: 'bg-violet-500/10 text-violet-400' },
  amber:   { icon: 'bg-amber-500/10 text-amber-400',   bar: 'bg-amber-500',  badge: 'bg-amber-500/10 text-amber-400'  },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-400', bar: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-400' },
}

const StatCard = ({ icon: Icon, label, description, value, accent }) => {
  const a = accentMap[accent]
  return (
    <div className="
      relative overflow-hidden group
      bg-[#0e1521] border border-white/[0.07] rounded-2xl p-5
      hover:border-white/[0.13] hover:bg-[#111d2e]
      transition-all duration-200 cursor-default
    ">
      {/* Top row — icon + value */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.icon}`}>
          <Icon size={18} strokeWidth={1.6} />
        </div>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full tracking-wide ${a.badge}`}>
          Live
        </span>
      </div>

      {/* Value */}
      <p className="text-3xl font-semibold text-slate-100 tracking-tight leading-none mb-1">
        {value ?? '—'}
      </p>

      {/* Labels */}
      <p className="text-[13px] font-medium text-slate-300 mt-2">{label}</p>
      <p className="text-[11px] text-slate-600 mt-0.5 tracking-wide">{description}</p>

      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${a.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
    </div>
  )
}

const AdminDashboard = ({ data }) => {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="min-h-full bg-[#090e18] p-6 lg:p-8">

      {/*  Page header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.12em]">
              Admin Overview
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
            Dashboard
          </h1>
          <p className="text-[13px] text-slate-500 mt-1">Welcome back - here's your organisation at a glance.</p>
        </div>

        {/* Date badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] self-start sm:self-auto">
          <Calendar1Icon size={13} strokeWidth={1.5} className="text-slate-500 shrink-0" />
          <span className="text-[12px] text-slate-400">{dateStr}</span>
        </div>
      </div>

      {/*  Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statConfig.map((s) => (
          <StatCard
            key={s.key}
            icon={s.icon}
            label={s.label}
            description={s.description}
            value={data?.[s.key]}
            accent={s.accent}
          />
        ))}
      </div>

      {/*  Quick summary strip  */}
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0e1521] border border-white/[0.06]">
        <TrendingUpIcon size={15} strokeWidth={1.5} className="text-blue-400 shrink-0" />
        <p className="text-[12.5px] text-slate-400">
          Organisation running at{' '}
          <span className="text-slate-200 font-medium">
            {data?.totalEmployees ?? 0} employees
          </span>{' '}
          across{' '}
          <span className="text-slate-200 font-medium">
            {data?.totalDepartments ?? 0} departments
          </span>
          . {data?.pendingLeaves ?? 0} leave requests need your attention.
        </p>
      </div>
    </div>
  )
}

export default AdminDashboard