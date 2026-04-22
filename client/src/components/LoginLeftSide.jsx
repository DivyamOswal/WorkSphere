import React from 'react'

const LoginLeftSide = () => {
  return (
    <div className='hidden md:flex w-1/2 flex-col justify-between p-10 relative overflow-hidden'
      style={{ background: '#111827' }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap');`}</style>

      {/* Subtle background lines */}
      <div className='absolute top-0 right-36 w-px h-full' style={{ background: 'rgba(255,255,255,0.035)' }} />
      <div className='absolute top-0 right-72 w-px h-full' style={{ background: 'rgba(255,255,255,0.025)' }} />
      <div className='absolute -bottom-16 -right-16 w-56 h-56 rounded-full' style={{ background: 'radial-gradient(circle, rgba(79,110,247,0.12) 0%, transparent 70%)' }} />

      {/* Top logo row */}
      <div className='flex items-center justify-between relative z-10'>
        <div className='flex items-center gap-2.5'>
          <div className='w-8 h-8 rounded-lg flex items-center justify-center' style={{ background: '#4f6ef7' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
              <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>WorkSphere</span>
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>v0.1</span>
      </div>

      {/* Main heading */}
      <div className='relative z-10 flex flex-col gap-4'>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 46, fontWeight: 400, color: '#f9fafb', lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0 }}>
          Employee<br />
          <span style={{ fontStyle: 'italic', color: '#818cf8' }}>Management</span><br />
          System
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, margin: 0, maxWidth: 320 }}>
          Streamline worksphere operations, track attendance, manage payroll, and empower your team from one secure platform.
        </p>
      </div>

      {/* Bottom stats */}
      <div className='relative z-10 flex pt-7' style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {[['5,000+', 'Employees managed'], ['98.9%', 'Uptime SLA'], ['24/7', 'Support available']].map(([num, label], i) => (
          <div key={i} className='flex-1 flex flex-col gap-1'
            style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,0.07)', paddingLeft: 24 } : {}}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#f9fafb', lineHeight: 1 }}>{num}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginLeftSide