import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeDashboard = ({ data }) => {
  const emp = data?.employee
  
  const cards = [
    {
      icon: CalendarIcon,
      value: data?.currentMonthAttendence || 0,
      title: "Days Present",
      subtitle: "This month"
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves || 0,
      title: "Pending Leaves",
      subtitle: "Awaiting approval"
    },
    {
      icon: DollarSignIcon,
      value: data?.latestPayslip
        ? `$${data.latestPayslip.netSalary.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout"
    }
  ]

  return (
    <div className='animate-fade-in'>
      <div className='page-header mb-6'>
        <h1 className='page-title text-2xl font-bold'>Welcome, {emp?.firstName}!</h1>
        <p className='page-subtitle text-slate-500'>
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'>
        {cards.map((card, index) => (
          <div key={index} className='card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between border rounded-xl shadow-sm bg-white'>
            {/* Decorative Left Border Accent */}
            <div className='absolute left-0 top-0 bottom-0 w-1 bg-slate-500/70 group-hover:bg-indigo-500/70 transition-colors' />
            
            <div className='flex flex-col'>
              <p className='text-sm font-medium text-slate-500'>{card.title}</p>
              <p className='text-2xl font-bold text-slate-900 mt-1'>{card.value}</p>
              <p className='text-xs text-slate-400 mt-1'>{card.subtitle}</p>
            </div>

            <card.icon className='size-12 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200' />
          </div>
        ))}
      </div>
      <div className='flex flex-col sm:flex-row gap-3'>
        <Link to={"/attendance"} className='btn-primary text-center inline-flex items-center justify-center gap-2'>Mark Attendece<ArrowRightIcon className='w-4 h-4'/></Link>
        <Link to={"/leave"} className='btn-secondary text-center'>
        Apply for Leave</Link>
      </div>
    </div>
  )
}

export default EmployeeDashboard