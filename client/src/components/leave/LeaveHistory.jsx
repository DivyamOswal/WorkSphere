import { format } from 'date-fns'
import { CheckIcon, Loader2Icon, XIcon, CalendarDaysIcon } from 'lucide-react'
import React, { useState } from 'react'

const statusBadge = (status) => {
  switch (status) {
    case 'APPROVED': return 'badge badge-success'
    case 'REJECTED': return 'badge badge-danger'
    default: return 'badge badge-warning'
  }
}

const LeaveHistory = ({ leaves = [], isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null)

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id)
    try {
      await onUpdate?.(id, status)
    } finally {
      setProcessing(null)
    }
  }

  const colSpan = isAdmin ? 6 : 4

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
            Leave Applications
          </h3>
          <p className='text-[11px] mt-px' style={{ color: 'var(--text-subtle)' }}>
            {leaves.length} application{leaves.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='table-modern'>
          <thead>
            <tr>
              {/* Fix: was missing import, now properly declared */}
              {isAdmin && <th>Employee</th>}
              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>
              {isAdmin && <th className='text-center'>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>
                  <div className='flex flex-col items-center justify-center py-16 gap-3'>
                    <div
                      className='w-10 h-10 rounded-2xl flex items-center justify-center'
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}
                    >
                      <CalendarDaysIcon size={18} strokeWidth={1.3} style={{ color: 'var(--text-subtle)' }} />
                    </div>
                    <p className='text-[13px]' style={{ color: 'var(--text-subtle)' }}>
                      No leave applications found
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                const id = leave._id || leave.id
                const isProcessing = processing === id

                return (
                  <tr key={id}>
                    {isAdmin && (
                      <td>
                        <span className='text-[13px] font-medium' style={{ color: 'var(--text-primary)' }}>
                          {leave.employee?.firstName} {leave.employee?.lastName}
                        </span>
                      </td>
                    )}
                    <td>
                      <span
                        className='badge'
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {leave.type}
                      </span>
                    </td>

                    {/* Dates */}
                    <td>
                      <span className='text-[12px] whitespace-nowrap' style={{ color: 'var(--text-muted)' }}>
                        {format(new Date(leave.startDate), 'MMM dd, yyyy')}
                        {' '}-{' '}
                        {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                      </span>
                    </td>

                    {/* Reason */}
                    <td className='max-w-[200px]'>
                      <span
                        className='text-[12.5px] block truncate'
                        style={{ color: 'var(--text-muted)' }}
                        title={leave.reason}
                      >
                        {leave.reason || '-'}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={statusBadge(leave.status)}>
                        {leave.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td>
                        {leave.status === 'PENDING' && (
                          <div className='flex justify-center gap-2'>
                            {/* Approve */}
                            <button
                              onClick={() => handleStatusUpdate(id, 'APPROVED')}
                              disabled={!!processing}
                              className='p-1.5 rounded-lg transition-all duration-150 disabled:opacity-50'
                              style={{
                                background: 'rgba(16,185,129,0.1)',
                                border: '1px solid rgba(16,185,129,0.2)',
                                color: '#34d399',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.2)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
                            >
                              {isProcessing
                                ? <Loader2Icon size={15} strokeWidth={1.8} className='animate-spin' />
                                : <CheckIcon size={15} strokeWidth={2} />}
                            </button>

                            {/* Reject */}
                            <button
                              onClick={() => handleStatusUpdate(id, 'REJECTED')}
                              disabled={!!processing}
                              className='p-1.5 rounded-lg transition-all duration-150 disabled:opacity-50'
                              style={{
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.2)',
                                color: '#f87171',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                            >
                              {isProcessing
                                ? <Loader2Icon size={15} strokeWidth={1.8} className='animate-spin' />
                                : <XIcon size={15} strokeWidth={2} />}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
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

export default LeaveHistory