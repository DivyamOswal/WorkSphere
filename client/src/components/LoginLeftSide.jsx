import React from 'react'

const LoginLeftSide = () => {
  return (
    <div
      className='hidden md:flex w-1/2 flex-col justify-between p-10 lg:p-14 relative overflow-hidden'
      style={{ background: '#0e1521', minHeight: '100vh' }}
    >
      {/* Dot grid */}
      <div className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(244,240,232,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />

      {/* Glow orbs */}
      <div className='absolute pointer-events-none'
        style={{ top: -140, right: -140, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)' }}
      />
      <div className='absolute pointer-events-none'
        style={{ bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.05) 0%, transparent 70%)' }}
      />

      {/* Right border fade */}
      <div className='absolute top-0 right-0 bottom-0 w-px pointer-events-none'
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(244,240,232,0.07) 30%, rgba(244,240,232,0.07) 70%, transparent)' }}
      />

      {/* Brand */}
      <div className='relative z-10 flex items-center justify-between'>
        <div className='flex items-center gap-2.5'>
          <div className='w-8 h-8 rounded-lg flex items-center justify-center'
            style={{ background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#60a5fa" opacity="0.9"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#60a5fa" opacity="0.45"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#60a5fa" opacity="0.45"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#60a5fa" opacity="0.2"/>
            </svg>
          </div>
          <span className='text-[13px] font-medium tracking-wide' style={{ color: 'rgba(244,240,232,0.65)', fontFamily: "'Outfit', sans-serif" }}>
            WorkSphere
          </span>
        </div>
        <span className='text-[11px]' style={{ color: 'rgba(244,240,232,0.2)', letterSpacing: '0.06em', fontFamily: "'Outfit', sans-serif" }}>v1.0.0</span>
      </div>

      {/* Headline */}
      <div className='relative z-10 flex flex-col gap-5'>
        <div>
          <div className='flex items-center gap-2 mb-4'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
            </span>
            <span className='text-[11px] font-medium uppercase tracking-[0.12em]' style={{ color: 'rgba(244,240,232,0.3)', fontFamily: "'Outfit', sans-serif" }}>
              System Online
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.4rem, 3.6vw, 3.2rem)',
            fontWeight: 300,
            color: '#f4f0e8',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            Manage your<br />
            <em style={{ fontStyle: 'italic', color: '#60a5fa' }}>people,</em><br />
            not paperwork.
          </h1>
        </div>

        {/* Divider */}
        <div className='flex items-center gap-3'>
          <div className='flex-1 h-px' style={{ background: 'rgba(244,240,232,0.07)' }} />
          <div className='w-1 h-1 rounded-full' style={{ background: 'rgba(79,142,247,0.5)' }} />
          <div className='h-px' style={{ width: 32, background: 'rgba(244,240,232,0.07)' }} />
        </div>

        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13.5,
          fontWeight: 300,
          color: 'rgba(244,240,232,0.42)',
          lineHeight: 1.8,
          margin: 0,
          maxWidth: 320,
        }}>
          Simplify HR management with real-time attendance tracking, automated payroll processing, and tools that empower your team - all within one secure platform.
        </p>
      </div>

      {/*  Stats strip */}
      <div className='relative z-10 flex pt-6' style={{ borderTop: '1px solid rgba(244,240,232,0.07)' }}>
        {[['12K+', 'Employees managed'], ['99.9%', 'Uptime SLA'], ['24 / 7', 'Support']].map(([num, label], i) => (
          <div key={i} className='flex-1 flex flex-col gap-1'
            style={i > 0 ? { borderLeft: '1px solid rgba(244,240,232,0.07)', paddingLeft: 20 } : {}}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, color: '#f4f0e8', lineHeight: 1 }}>
              {num}
            </span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: 'rgba(244,240,232,0.3)', letterSpacing: '0.06em' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginLeftSide