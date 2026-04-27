import React, { useCallback, useEffect, useState } from 'react'
import { dummyAttendanceData } from '../assets/assets'
import Loading from '../components/Loading'
import CheckInButton from '../components/attendance/CheckInButton'
import AttendanceStats from '../components/attendance/AttendanceStats'
import AttendanceHistory from '../components/attendance/AttendanceHistory'
import { AlertCircleIcon } from 'lucide-react'

const Attendance = () => {
  const [history,   setHistory]   = useState([])
  const [loading,   setLoading]   = useState(true)
  // Fix: isDelted → isDeleted (typo in original state setter name)
  const [isDeleted, setIsDeleted] = useState(false)

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData)
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return <Loading />

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayRecord = history.find(
    r => new Date(r.date).toDateString() === today.toDateString()
  )

  return (
    <div className='animate-fade-in p-6 lg:p-8 min-h-full' style={{ background: 'var(--bg-base)' }}>

      {/*  Header  */}
      <div className='page-header'>
        <h1 className='page-title'>Attendance</h1>
        <p className='page-subtitle'>Track your work hours and daily check-ins</p>
      </div>

      {/*  Clock in / deleted banner  */}
      {isDeleted && (
          <div
            className='flex items-start gap-3 p-5 rounded-2xl mb-6'
            style={{
              background: 'rgba(239,68,68,0.07)',
              border: '1px solid rgba(239,68,68,0.18)',
            }}
          >
            <div
              className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5'
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <AlertCircleIcon size={15} strokeWidth={1.6} style={{ color: '#f87171' }} />
            </div>
            <div>
              <p className='text-[13.5px] font-medium' style={{ color: '#f87171' }}>
                Account Deactivated
              </p>
              <p className='text-[12.5px] mt-0.5' style={{ color: 'rgba(248,113,113,0.7)' }}>
                Your employee record has been marked as deleted. Clock-in and clock-out are no longer available.
              </p>
            </div>
          </div>
      )}

      {/* CheckInButton renders itself as fixed bottom-right */}
      {!isDeleted && <CheckInButton todayRecord={todayRecord} onAction={fetchData} />}

      {/*  Stats  */}
      <AttendanceStats history={history} />

      {/*  History table  */}
      <AttendanceHistory history={history} />
    </div>
  )
}

export default Attendance