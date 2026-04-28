import { CalendarIcon, FileTextIcon, AlarmClockIcon, Loader2Icon, XIcon } from 'lucide-react'
import React, { useState } from 'react'

const LEAVE_TYPES = [
  { value: 'SICK',       label: 'Sick Leave'      },
  { value: 'CASUAL',     label: 'Casual Leave'    },
  { value: 'ANNUAL',     label: 'Annual Leave'    },
  { value: 'MATERNITY',  label: 'Maternity Leave' },
  { value: 'PATERNITY',  label: 'Paternity Leave' },
  { value: 'UNPAID',     label: 'Unpaid Leave'    },
]

const Label = ({ children }) => (
  <label
    className='text-[11.5px] font-medium uppercase tracking-[0.08em] block mb-1.5'
    style={{ color: 'var(--text-subtle)' }}
  >
    {children}
  </label>
)

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const today    = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const minDate  = tomorrow.toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess?.()
    }, 1000)
  }

  if (!open) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-lg animate-slide-up'
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/*  Header  */}
        <div
          className='flex items-center justify-between px-6 py-5'
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className='flex items-center gap-3'>
            <div
              className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
            >
              <CalendarIcon size={14} strokeWidth={1.6} style={{ color: '#60a5fa' }} />
            </div>
            <div>
              <h2 className='text-[14.5px] font-semibold' style={{ color: 'var(--text-primary)' }}>
                Apply for Leave
              </h2>
              <p className='text-[11px] mt-px' style={{ color: 'var(--text-subtle)' }}>
                Submit your request for approval
              </p>
            </div>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='p-2 rounded-lg transition-colors duration-150'
            style={{ color: 'var(--text-subtle)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-subtle)'
            }}
          >
            <XIcon size={17} strokeWidth={1.5} />
          </button>
        </div>

        {/*  Form  */}
        <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-5'>

          {/* Leave type */}
          <div>
            <Label>
              <span className='flex items-center gap-1.5'>
                <FileTextIcon size={11} strokeWidth={1.5} />
                Leave Type
              </span>
            </Label>
            <select name='type' required>
              <option value=''>Select leave type</option>
              {LEAVE_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <Label>
              <span className='flex items-center gap-1.5'>
                <CalendarIcon size={11} strokeWidth={1.5} />
                Duration
              </span>
            </Label>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <span
                  className='block text-[10.5px] mb-1.5 uppercase tracking-wider'
                  style={{ color: 'var(--text-subtle)' }}
                >
                  From
                </span>
                <input type='date' name='startDate' required min={minDate} />
              </div>
              <div>
                <span
                  className='block text-[10.5px] mb-1.5 uppercase tracking-wider'
                  style={{ color: 'var(--text-subtle)' }}
                >
                  To
                </span>
                <input type='date' name='endDate' required min={minDate} />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <Label>Reason</Label>
            <textarea
              name='reason'
              required
              rows={3}
              placeholder='Briefly describe why you need this leave…'
              className='resize-none'
            />
          </div>

          {/* Info strip */}
          <div
            className='flex items-start gap-2.5 px-3.5 py-3 rounded-xl'
            style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.15)' }}
          >
            <AlarmClockIcon size={13} strokeWidth={1.5} className='shrink-0 mt-px' style={{ color: '#fbbf24' }} />
            <p className='text-[11.5px]' style={{ color: 'rgba(251,191,36,0.75)', lineHeight: 1.6 }}>
              Requests must be submitted at least one day in advance. Your manager will be notified.
            </p>
          </div>

          {/* Buttons */}
          <div className='flex flex-col-reverse sm:flex-row gap-3 pt-1'>
            <button type='button' onClick={onClose} className='btn-secondary flex-1'>
              Cancel
            </button>
            <button type='submit' disabled={loading} className='btn-primary flex-1'>
              {loading && <Loader2Icon size={14} strokeWidth={2} className='animate-spin' />}
              {loading ? 'Submitting…' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyLeaveModal