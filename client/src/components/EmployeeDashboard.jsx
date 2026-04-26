import {
  ArrowRightIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  SparklesIcon,
} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

/*  Card config  */
const cardConfig = [
  {
    key:    'currentMonthAttendence',
    icon:   CalendarIcon,
    title:  'Days Present',
    subtitle: 'This month',
    accent: 'blue',
    format: (v) => v ?? 0,
  },
  {
    key:    'pendingLeaves',
    icon:   FileTextIcon,
    title:  'Pending Leaves',
    subtitle: 'Awaiting approval',
    accent: 'amber',
    format: (v) => v ?? 0,
  },
  {
    key:    'latestPayslip',
    icon:   DollarSignIcon,
    title:  'Latest Payslip',
    subtitle: 'Most recent payout',
    accent: 'emerald',
    format: (v) => (v ? `₹${v.netSalary.toLocaleString()}` : 'N/A'),
  },
]

const accentTokens = {
  blue:    { bg: 'rgba(59,130,246,0.1)',   text: '#60a5fa', border: 'rgba(59,130,246,0.2)',   bar: '#3b82f6'  },
  amber:   { bg: 'rgba(245,158,11,0.1)',   text: '#fbbf24', border: 'rgba(245,158,11,0.2)',   bar: '#f59e0b'  },
  emerald: { bg: 'rgba(16,185,129,0.1)',   text: '#34d399', border: 'rgba(16,185,129,0.2)',   bar: '#10b981'  },
}

/*  MetricCard  */
const MetricCard = ({ icon: Icon, title, subtitle, value, accent }) => {
  const a = accentTokens[accent]
  return (
    <div
      className='card card-hover relative overflow-hidden group cursor-default'
      style={{ borderRadius: 16, borderColor: a.border, padding: '20px' }}
    >
      {/* Icon */}
      <div
        className='w-10 h-10 rounded-xl flex items-center justify-center mb-5'
        style={{ background: a.bg }}
      >
        <Icon size={18} strokeWidth={1.6} style={{ color: a.text }} />
      </div>

      {/* Value */}
      <p className='text-3xl font-semibold tracking-tight leading-none' style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>

      {/* Labels */}
      <p className='text-[13px] font-medium mt-2' style={{ color: 'var(--text-muted)' }}>{title}</p>
      <p className='text-[11px] mt-0.5' style={{ color: 'var(--text-subtle)' }}>{subtitle}</p>

      {/* Hover bottom bar */}
      <div
        className='absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        style={{ background: a.bar }}
      />
    </div>
  )
}

/*  EmployeeDashboard  */
const EmployeeDashboard = ({ data }) => {
  const emp       = data?.employee
  const firstName = emp?.firstName ?? 'there'
  const hour      = new Date().getHours()
  const greeting  = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className='min-h-full p-6 lg:p-8 animate-fade-in' style={{ background: 'var(--bg-base)' }}>

      {/*  Header  */}
      <div className='mb-8'>
        {/* Eyebrow */}
        <div className='flex items-center gap-2 mb-3'>
          <SparklesIcon size={13} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
          <span
            className='text-[11px] font-medium uppercase tracking-[0.12em]'
            style={{ color: 'var(--text-subtle)' }}
          >
            {greeting}
          </span>
        </div>

        {/* Title */}
        <h1 className='page-title'>
          Welcome back,{' '}
          <span style={{ color: 'var(--accent)' }}>{firstName}</span>
        </h1>

        {/* Role / dept pills */}
        <div className='flex items-center gap-2 mt-2 flex-wrap'>
          {emp?.position && (
            <span
              className='text-[12px] px-2.5 py-0.5 rounded-full'
              style={{
                color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
              }}
            >
              {emp.position}
            </span>
          )}
          {emp?.department && (
            <>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span
                className='text-[12px] px-2.5 py-0.5 rounded-full'
                style={{
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                }}
              >
                {emp.department}
              </span>
            </>
          )}
        </div>
      </div>

      {/*  Metric cards  */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
        {cardConfig.map((c) => (
          <MetricCard
            key={c.key}
            icon={c.icon}
            title={c.title}
            subtitle={c.subtitle}
            value={c.format(data?.[c.key])}
            accent={c.accent}
          />
        ))}
      </div>

      {/*  Actions  */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <Link to='/attendance' className='btn-primary'>
          Mark Attendance
          <ArrowRightIcon size={15} strokeWidth={2} />
        </Link>
        <Link to='/leave' className='btn-secondary'>
          Apply for Leave
        </Link>
      </div>
    </div>
  )
}

export default EmployeeDashboard