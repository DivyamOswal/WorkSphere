import React from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'
import { format } from 'date-fns'
import { CalendarDaysIcon } from 'lucide-react'

const statusBadge = (status) => {
  switch (status) {
    case 'PRESENT': return 'badge badge-success'
    case 'LATE':    return 'badge badge-warning'
    default:        return 'badge badge-danger'
  }
}

const AttendanceHistory = ({ history = [] }) => {
  return (
    <div className='card overflow-hidden' style={{ borderRadius: 16 }}>

      {/* Header */}
      <div
        className='flex items-center gap-3 px-6 py-4'
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <CalendarDaysIcon size={14} strokeWidth={1.6} style={{ color: '#60a5fa' }} />
        </div>
        <div>
          <h3 className='text-[13.5px] font-semibold' style={{ color: 'var(--text-primary)' }}>
            Recent Activity
          </h3>
          <p className='text-[11px] mt-px' style={{ color: 'var(--text-subtle)' }}>
            {history.length} record{history.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='table-modern'>
          <thead>
            <tr>
              {['Date', 'Check In', 'Check Out', 'Working Hours', 'Day Type', 'Status'].map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className='flex flex-col items-center justify-center py-16 gap-3'>
                    <div
                      className='w-10 h-10 rounded-2xl flex items-center justify-center'
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}
                    >
                      <CalendarDaysIcon size={18} strokeWidth={1.3} style={{ color: 'var(--text-subtle)' }} />
                    </div>
                    <p className='text-[13px]' style={{ color: 'var(--text-subtle)' }}>No records found</p>
                  </div>
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record)
                return (
                  <tr key={record._id || record.id}>
                    {/* Date */}
                    <td>
                      <span className='text-[13px] font-medium' style={{ color: 'var(--text-primary)' }}>
                        {format(new Date(record.date), 'MMM dd, yyyy')}
                      </span>
                    </td>

                    {/* Check In */}
                    <td>
                      <span className='text-[13px]' style={{ color: 'var(--text-muted)' }}>
                        {record.checkIn ? format(new Date(record.checkIn), 'hh:mm a') : '—'}
                      </span>
                    </td>

                    {/* Check Out */}
                    <td>
                      <span className='text-[13px]' style={{ color: 'var(--text-muted)' }}>
                        {record.checkOut ? format(new Date(record.checkOut), 'hh:mm a') : '—'}
                      </span>
                    </td>

                    {/* Working Hours - fix: text-lsate-600 typo */}
                    <td>
                      <span className='text-[13px] font-medium' style={{ color: 'var(--text-muted)' }}>
                        {getWorkingHoursDisplay(record)}
                      </span>
                    </td>

                    {/* Day Type */}
                    <td>
                      {dayType.label !== '-'
                        ? <span className={`badge ${dayType.className}`}>{dayType.label}</span>
                        : <span style={{ color: 'var(--text-subtle)' }}>—</span>}
                    </td>

                    {/* Status */}
                    <td>
                      <span className={statusBadge(record.status)}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceHistory