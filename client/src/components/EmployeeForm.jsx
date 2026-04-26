import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../assets/assets'
import {
  Loader2Icon, UserIcon, BriefcaseIcon,
  ShieldIcon, ChevronDownIcon,
} from 'lucide-react'

/*  Reusable field wrapper  */
const Field = ({ label, children, span2 = false }) => (
  <div className={span2 ? 'sm:col-span-2' : ''}>
    <label
      className='block text-[11.5px] font-medium uppercase tracking-[0.08em] mb-2'
      style={{ color: 'rgba(244,240,232,0.35)' }}
    >
      {label}
    </label>
    {children}
  </div>
)

/*  Section card  */
const Section = ({ icon: Icon, title, subtitle, children }) => (
  <div className='card' style={{ borderRadius: 16 }}>
    {/* Section header */}
    <div
      className='flex items-center gap-3 px-5 py-4'
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
        style={{ background: 'var(--accent-glow)', border: '1px solid rgba(59,130,246,0.2)' }}
      >
        <Icon size={14} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
      </div>
      <div>
        <p className='text-[13.5px] font-medium' style={{ color: 'var(--text-primary)' }}>{title}</p>
        {subtitle && (
          <p className='text-[11px] mt-0.5' style={{ color: 'var(--text-subtle)' }}>{subtitle}</p>
        )}
      </div>
    </div>

    <div className='p-5 sm:p-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        {children}
      </div>
    </div>
  </div>
)

/*  Main form  */
const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate   = useNavigate()
  const [loading, setLoading] = useState(false)
  const isEditMode = !!initialData

  const handleSubmit = async (e) => {
    e.preventDefault()
    // your submit logic here
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-5 animate-slide-up'
    >
      {/*  Personal Information  */}
      <Section
        icon={UserIcon}
        title='Personal Information'
        subtitle='Basic identity and contact details'
      >
        <Field label='First Name'>
          <input
            name='firstName'
            required
            defaultValue={initialData?.firstName}
            placeholder='John'
          />
        </Field>

        <Field label='Last Name'>
          <input
            name='lastName'
            required
            defaultValue={initialData?.lastName}
            placeholder='Doe'
          />
        </Field>

        <Field label='Phone Number'>
          <input
            name='phone'
            required
            defaultValue={initialData?.phone}
            placeholder='+91 98765 43210'
          />
        </Field>

        <Field label='Join Date'>
          <input
            name='joinDate'
            type='date'
            required
            defaultValue={
              initialData?.joinDate
                ? new Date(initialData.joinDate).toISOString().split('T')[0]
                : ''
            }
          />
        </Field>

        <Field label='Bio (Optional)' span2>
          <textarea
            name='bio'
            rows={3}
            defaultValue={initialData?.bio}
            placeholder='Brief description about the employee…'
            className='resize-none'
          />
        </Field>
      </Section>

      {/*  Employment Details  */}
      <Section
        icon={BriefcaseIcon}
        title='Employment Details'
        subtitle='Role, department, and compensation'
      >
        <Field label='Department'>
          <div className='relative'>
            <select name='department' defaultValue={initialData?.department || ''}>
              <option value=''>Select Department</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <ChevronDownIcon
              size={13} strokeWidth={1.5}
              className='absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none'
              style={{ color: 'var(--text-subtle)' }}
            />
          </div>
        </Field>

        <Field label='Position'>
          <input
            name='position'
            required
            defaultValue={initialData?.position}
            placeholder='e.g. Software Engineer'
          />
        </Field>

        <Field label='Basic Salary (₹)'>
          <input
            type='number'
            name='basicSalary'
            min='0'
            step='0.01'
            required
            defaultValue={initialData?.basicSalary || 0}
            placeholder='0.00'
          />
        </Field>

        <Field label='Allowances (₹)'>
          <input
            type='number'
            name='allowances'
            min='0'
            step='0.01'
            required
            defaultValue={initialData?.allowances || 0}
            placeholder='0.00'
          />
        </Field>

        <Field label='Deductions (₹)'>
          <input
            type='number'
            name='deductions'
            min='0'
            step='0.01'
            required
            defaultValue={initialData?.deductions || 0}
            placeholder='0.00'
          />
        </Field>

        {isEditMode && (
          <Field label='Employment Status'>
            <div className='relative'>
              <select name='employmentStatus' defaultValue={initialData?.employmentStatus}>
                <option value='ACTIVE'>Active</option>
                <option value='INACTIVE'>Inactive</option>
                <option value='ON_LEAVE'>On Leave</option>
              </select>
              <ChevronDownIcon
                size={13} strokeWidth={1.5}
                className='absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none'
                style={{ color: 'var(--text-subtle)' }}
              />
            </div>
          </Field>
        )}
      </Section>

      {/*  Account Setup  */}
      <Section
        icon={ShieldIcon}
        title='Account Setup'
        subtitle='Login credentials and system access'
      >
        <Field label='Work Email' span2>
          <input
            name='email'
            type='email'
            required
            defaultValue={initialData?.email}
            placeholder='john.doe@company.com'
          />
        </Field>

        {!isEditMode ? (
          <Field label='Temporary Password'>
            <input
              type='password'
              name='password'
              required
              placeholder='Min. 8 characters'
            />
          </Field>
        ) : (
          <Field label='Change Password (Optional)'>
            <input
              type='password'
              name='password'
              placeholder='Leave blank to keep current'
            />
          </Field>
        )}

        <Field label='System Role'>
          <div className='relative'>
            {/* Fixed typo: "EMPLOOYEE" → "EMPLOYEE" */}
            <select name='role' defaultValue={initialData?.user?.role || 'EMPLOYEE'}>
              <option value='EMPLOYEE'>Employee</option>
              <option value='ADMIN'>Admin</option>
            </select>
            <ChevronDownIcon
              size={13} strokeWidth={1.5}
              className='absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none'
              style={{ color: 'var(--text-subtle)' }}
            />
          </div>
        </Field>
      </Section>

      {/*  Actions  */}
      <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-1 pb-1'>
        <button
          type='button'
          className='btn-secondary'
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={loading}
          className='btn-primary'
        >
          {loading && <Loader2Icon size={14} strokeWidth={2} className='animate-spin' />}
          {isEditMode ? 'Update Employee' : 'Create Employee'}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm