import { Loader2Icon, PlusIcon, XIcon, ReceiptIcon } from 'lucide-react'
import React, { useState } from 'react'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const Label = ({ children }) => (
  <label
    className='text-[11.5px] font-medium uppercase tracking-[0.08em] block mb-1.5'
    style={{ color: 'var(--text-subtle)' }}
  >
    {children}
  </label>
)

const GeneratePayslipForm = ({ employees = [], onSuccess }) => {
  const [isOpen,  setIsOpen]  = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess?.()
      setIsOpen(false)
    }, 1000)
  }

  // Trigger button
  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className='btn-primary'>
      <PlusIcon size={15} strokeWidth={2} />
      Generate Payslip
    </button>
  )

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className='w-full max-w-lg animate-slide-up'
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
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.15)' }}
            >
              <ReceiptIcon size={14} strokeWidth={1.6} style={{ color: '#34d399' }} />
            </div>
            <div>
              <h3 className='text-[14.5px] font-semibold' style={{ color: 'var(--text-primary)' }}>
                Generate Monthly Payslip
              </h3>
              <p className='text-[11px] mt-px' style={{ color: 'var(--text-subtle)' }}>
                Create a payslip record for an employee
              </p>
            </div>
          </div>

          <button
            type='button'
            onClick={() => setIsOpen(false)}
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

          {/* Employee */}
          <div>
            <Label>Employee</Label>
            <select name='employeeId' required>
              <option value=''>Select employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} - {emp.position}
                </option>
              ))}
            </select>
          </div>

          {/* Month + Year */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Month</Label>
              <select name='month' required>
                {MONTHS.map((name, i) => (
                  <option key={i + 1} value={i + 1}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Year</Label>
              <input
                type='number'
                name='year'
                required
                defaultValue={new Date().getFullYear()}
                min={2000}
                max={2100}
              />
            </div>
          </div>

          {/* Basic Salary*/}
          <div>
            <Label>Basic Salary (₹)</Label>
            <input
              type='number'
              name='basicSalary'
              required
              placeholder='e.g. 50000'
              min={0}
              step='0.01'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Allowances (₹)</Label>
              <input type='number' name='allowances' defaultValue='0' min={0} step='0.01' />
            </div>
            <div>
              <Label>Deductions (₹)</Label>
              <input type='number' name='deductions' defaultValue='0' min={0} step='0.01' />
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-1'>
            <button type='button' onClick={() => setIsOpen(false)} className='btn-secondary'>
              Cancel
            </button>
            <button type='submit' disabled={loading} className='btn-primary'>
              {loading && <Loader2Icon size={14} strokeWidth={2} className='animate-spin' />}
              {loading ? 'Generating…' : 'Generate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GeneratePayslipForm