import { format } from 'date-fns'
import { DownloadIcon, ReceiptIcon, WalletIcon } from 'lucide-react'
import React from 'react'

const PayslipList = ({ payslips = [], isAdmin }) => {
  const colSpan = isAdmin ? 5 : 4

  return (
    <div className='card overflow-hidden' style={{ borderRadius: 16 }}>

      {/*  Header  */}
      <div
        className='flex items-center gap-3 px-6 py-4'
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.15)' }}
        >
          <ReceiptIcon size={14} strokeWidth={1.6} style={{ color: '#34d399' }} />
        </div>
        <div>
          <h3 className='text-[13.5px] font-semibold' style={{ color: 'var(--text-primary)' }}>
            Payslips
          </h3>
          <p className='text-[11px] mt-px' style={{ color: 'var(--text-subtle)' }}>
            {payslips.length} record{payslips.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/*  Table  */}
      <div className='overflow-x-auto'>
        <table className='table-modern'>
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>
                  <div className='flex flex-col items-center justify-center py-16 gap-3'>
                    <div
                      className='w-10 h-10 rounded-2xl flex items-center justify-center'
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}
                    >
                      <WalletIcon size={18} strokeWidth={1.3} style={{ color: 'var(--text-subtle)' }} />
                    </div>
                    <p className='text-[13px]' style={{ color: 'var(--text-subtle)' }}>
                      No payslips found
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                const id = payslip._id || payslip.id
                return (
                  <tr key={id}>

                    {/* Employee (admin only) */}
                    {isAdmin && (
                      <td>
                        <span className='text-[13px] font-medium' style={{ color: 'var(--text-primary)' }}>
                          {payslip.employee?.firstName} {payslip.employee?.lastName}
                        </span>
                      </td>
                    )}

                    {/* Period */}
                    <td>
                      <span className='text-[13px] font-medium' style={{ color: 'var(--text-primary)' }}>
                        {format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')}
                      </span>
                    </td>

                    {/* Basic Salary*/}
                    <td>
                      <span className='text-[13px]' style={{ color: 'var(--text-muted)' }}>
                        ₹{payslip.basicSalary?.toLocaleString()}
                      </span>
                    </td>

                    {/* Net Salary*/}
                    <td>
                      <span className='text-[13px] font-medium' style={{ color: '#34d399' }}>
                        ₹{payslip.netSalary?.toLocaleString()}
                      </span>
                    </td>

                    {/* Download*/}
                    <td className='text-center'>
                      <button
                        onClick={() => window.open(`/print/payslips/${id}`)}
                        className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150'
                        style={{
                          background: 'rgba(59,130,246,0.1)',
                          border: '1px solid rgba(59,130,246,0.2)',
                          color: '#60a5fa',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
                      >
                        <DownloadIcon size={12} strokeWidth={2} />
                        Download
                      </button>
                    </td>
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

export default PayslipList