import React, { useState } from 'react'
import { Loader2Icon, LockIcon, XIcon, AlertCircleIcon, CheckCircle2Icon } from 'lucide-react'

const ChangePasswordModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    setTimeout(() => {
      setLoading(false)
      setMessage({ type: 'success', text: 'Password updated successfully.' })
    }, 1000)
  }

  if (!open) return null

  const isSuccess = message.type === 'success'
  const MsgIcon   = isSuccess ? CheckCircle2Icon : AlertCircleIcon

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-md animate-slide-up'
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header  */}
        <div
          className='flex items-center justify-between px-6 py-5'
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className='flex items-center gap-3'>
            <div
              className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <LockIcon size={14} strokeWidth={1.6} style={{ color: '#a78bfa' }} />
            </div>
            <div>
              <h2 className='text-[14.5px] font-semibold' style={{ color: 'var(--text-primary)' }}>
                Change Password
              </h2>
              <p className='text-[11px] mt-px' style={{ color: 'var(--text-subtle)' }}>
                Update your account credentials
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

        {/*  Form */}
        <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-5'>

          {/* Message */}
          {message.text && (
            <div
              className='flex items-start gap-3 p-3.5 rounded-xl text-[13px]'
              style={{
                background: isSuccess ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)',
                border:     isSuccess ? '1px solid rgba(16,185,129,0.18)' : '1px solid rgba(239,68,68,0.18)',
              }}
            >
              <MsgIcon
                size={15} strokeWidth={1.5}
                className='shrink-0 mt-px'
                style={{ color: isSuccess ? '#34d399' : '#f87171' }}
              />
              <p style={{ color: isSuccess ? '#34d399' : '#f87171' }}>{message.text}</p>
            </div>
          )}

          {/* Current password */}
          <div>
            <label
              className='text-[11.5px] font-medium uppercase tracking-[0.08em] block mb-1.5'
              style={{ color: 'var(--text-subtle)' }}
            >
              Current Password
            </label>
            <input type='password' name='currentPassword' required placeholder='••••••••' />
          </div>

          {/* New password */}
          <div>
            <label
              className='text-[11.5px] font-medium uppercase tracking-[0.08em] block mb-1.5'
              style={{ color: 'var(--text-subtle)' }}
            >
              New Password
            </label>
            <input type='password' name='newPassword' required placeholder='Min. 8 characters' />
          </div>

          {/* Actions */}
          <div className='flex gap-3 pt-1'>
            <button type='button' onClick={onClose} className='btn-secondary flex-1'>
              Cancel
            </button>
            <button type='submit' disabled={loading} className='btn-primary flex-1'>
              {loading && <Loader2Icon size={14} strokeWidth={2} className='animate-spin' />}
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal