import React, { useEffect, useState } from 'react'
import { dummyProfileData } from '../assets/assets'
import Loading from '../components/Loading'
import { LockIcon, ChevronRightIcon } from 'lucide-react'
import ProfileForm from '../components/ProfileForm'
import ChangePasswordModal from '../components/ChangePasswordModal'

const Settings = () => {
  const [profile,           setProfile]           = useState(null)
  const [loading,           setLoading]           = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const fetchProfile = async () => {
    setProfile(dummyProfileData)
    setTimeout(() => setLoading(false), 1000)
  }

  useEffect(() => { fetchProfile() }, [])

  if (loading) return <Loading />

  return (
    <div className='animate-fade-in p-6 lg:p-8 min-h-full' style={{ background: 'var(--bg-base)' }}>

      {/* Header */}
      <div className='page-header'>
        <h1 className='page-title'>Settings</h1>
        <p className='page-subtitle'>Manage your account and preferences</p>
      </div>

      {/*  Profile */}
      {profile && (
        <ProfileForm initialData={profile} onSuccess={fetchProfile} />
      )}

      {/*  Change password card  */}
      <div
        className='card flex items-center justify-between p-5 sm:p-6'
        style={{ borderRadius: 16, maxWidth: 560 }}
      >
        <div className='flex items-center gap-4'>
          <div
            className='w-10 h-10 rounded-xl flex items-center justify-center shrink-0'
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.18)' }}
          >
            <LockIcon size={16} strokeWidth={1.6} style={{ color: '#a78bfa' }} />
          </div>
          <div>
            <p className='text-[13.5px] font-medium' style={{ color: 'var(--text-primary)' }}>
              Password
            </p>
            <p className='text-[12px] mt-0.5' style={{ color: 'var(--text-subtle)' }}>
              Update your account password
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className='btn-secondary flex items-center gap-1.5 shrink-0'
        >
          Change
          <ChevronRightIcon size={13} strokeWidth={2} />
        </button>
      </div>

      {/* Modal  */}
      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  )
}

export default Settings