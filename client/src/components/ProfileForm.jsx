import { Loader2Icon, SaveIcon, UserIcon, AlertCircleIcon, CheckCircle2Icon } from 'lucide-react'
import React, { useState } from 'react'

const Label = ({ children }) => (
  <label
    className='text-[11.5px] font-medium uppercase tracking-[0.08em] block mb-1.5'
    style={{ color: 'var(--text-subtle)' }}
  >
    {children}
  </label>
)

const ReadonlyInput = ({ type = 'text', value }) => (
  <input
    type={type}
    disabled
    value={value ?? ''}
    className='cursor-not-allowed'
    style={{ opacity: 0.5 }}
  />
)

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    setTimeout(() => {
      setLoading(false)
      setMessage('Profile updated successfully.')
      onSuccess?.()
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='card mb-6 animate-fade-in'
      style={{ borderRadius: 16 }}
    >
      {/*  Section header  */}
      <div
        className='flex items-center gap-3 px-5 sm:px-6 py-5'
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <UserIcon size={14} strokeWidth={1.6} style={{ color: '#60a5fa' }} />
        </div>
        <div>
          <h2 className='text-[13.5px] font-semibold' style={{ color: 'var(--text-primary)' }}>
            Public Profile
          </h2>
          <p className='text-[11px] mt-px' style={{ color: 'var(--text-subtle)' }}>
            Manage your personal information
          </p>
        </div>
      </div>

      <div className='p-5 sm:p-6 flex flex-col gap-5'>
        {error && (
          <div
            className='flex items-start gap-3 p-4 rounded-xl text-[13px]'
            style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}
          >
            <AlertCircleIcon size={15} strokeWidth={1.5} className='shrink-0 mt-px' style={{ color: '#f87171' }} />
            <p style={{ color: '#f87171' }}>{error}</p>
          </div>
        )}
        {message && (
          <div
            className='flex items-start gap-3 p-4 rounded-xl text-[13px]'
            style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)' }}
          >
            <CheckCircle2Icon size={15} strokeWidth={1.5} className='shrink-0 mt-px' style={{ color: '#34d399' }} />
            <p style={{ color: '#34d399' }}>{message}</p>
          </div>
        )}

        {/* Name + Email */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <Label>Name</Label>
            <ReadonlyInput value={`${initialData?.firstName ?? ''} ${initialData?.lastName ?? ''}`} />
          </div>
          <div>
            <Label>Email</Label>
            <ReadonlyInput type='email' value={initialData?.email} />
          </div>
        </div>
        <div>
          <Label>Position</Label>
          <ReadonlyInput type='text' value={initialData?.position} />
        </div>

        {/* Bio */}
        <div>
          <Label>Bio</Label>
          <textarea
            name='bio'
            rows={3}
            disabled={initialData?.isDeleted}
            defaultValue={initialData?.bio ?? ''}
            placeholder='Write a brief bio…'
            className='resize-none'
            style={initialData?.isDeleted ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          />
          <p className='text-[11px] mt-1.5' style={{ color: 'var(--text-subtle)' }}>
            This will be displayed on your profile.
          </p>
        </div>

        {/* Deactivated banner OR save button */}
        {initialData?.isDeleted ? (
          <div
            className='flex items-start gap-3 p-4 rounded-xl'
            style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}
          >
            <AlertCircleIcon size={15} strokeWidth={1.5} className='shrink-0 mt-px' style={{ color: '#f87171' }} />
            <div>
              <p className='text-[13px] font-medium' style={{ color: '#f87171' }}>Account Deactivated</p>
              <p className='text-[12px] mt-0.5' style={{ color: 'rgba(248,113,113,0.7)' }}>
                You can no longer update your profile.
              </p>
            </div>
          </div>
        ) : (
          <div className='flex justify-end'>
            <button type='submit' disabled={loading} className='btn-primary w-full sm:w-auto'>
              {loading
                ? <Loader2Icon size={14} strokeWidth={2} className='animate-spin' />
                : <SaveIcon size={14} strokeWidth={2} />}
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default ProfileForm