import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import { format } from "date-fns";

const PrintPayslip = () => {
  const { id } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => slip._id === id));
    setTimeout(() => setLoading(false), 800);
  }, [id]);

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #e2e8f0", borderTopColor: "#64748b", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  if (!payslip)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
        <p style={{ color: "#94a3b8", fontSize: 14 }}>Payslip not found.</p>
      </div>
    );

  const period = format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy");
  const periodRange = `1 ${period} - ${new Date(payslip.year, payslip.month, 0).getDate()} ${period}`;
  const fullName = [payslip.employee?.firstName, payslip.employee?.lastName].filter(Boolean).join(" ");

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0E1521", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ background: "white", border: "0.5px solid #e2e8f0", borderRadius: 16, width: "100%", maxWidth: 680, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

          {/* Header */}
          <div style={{ background: "#0f172a", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(59,130,246,0.18)", border: "0.5px solid rgba(96,165,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "#f8fafc", letterSpacing: "-0.01em" }}>WorkSphere</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Employee Management System</p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 500, color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase" }}>Payslip</p>
              <p style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 500, color: "#f8fafc" }}>{period}</p>
            </div>
          </div>

          {/* Employee details */}
          <div style={{ padding: "24px 32px", borderBottom: "0.5px solid #e2e8f0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { label: "Employee", value: fullName },
                { label: "Position", value: payslip.employee?.position },
                { label: "Email", value: payslip.employee?.email },
                { label: "Pay period", value: periodRange },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ margin: "0 0 2px", fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#0f172a" }}>{value || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings table */}
          <div style={{ padding: "0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "0.5px solid #e2e8f0" }}>
                  <th style={{ textAlign: "left", padding: "14px 0 10px", fontSize: 11, fontWeight: 500, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Description</th>
                  <th style={{ textAlign: "right", padding: "14px 0 10px", fontSize: 11, fontWeight: 500, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "0.5px solid #e2e8f0" }}>
                  <td style={{ padding: "14px 0", fontSize: 14, color: "#0f172a" }}>Basic salary</td>
                  <td style={{ textAlign: "right", padding: "14px 0", fontSize: 14, color: "#0f172a" }}>₹{payslip.basicSalary?.toLocaleString() ?? "0"}</td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid #e2e8f0" }}>
                  <td style={{ padding: "14px 0", fontSize: 14, color: "#0f172a" }}>Allowances</td>
                  <td style={{ textAlign: "right", padding: "14px 0", fontSize: 14, color: "#16a34a" }}>+₹{payslip.allowances?.toLocaleString() ?? "0"}</td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid #e2e8f0" }}>
                  <td style={{ padding: "14px 0", fontSize: 14, color: "#0f172a" }}>Deductions</td>
                  <td style={{ textAlign: "right", padding: "14px 0", fontSize: 14, color: "#dc2626" }}>−₹{payslip.deductions?.toLocaleString() ?? "0"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Net salary */}
          <div style={{ margin: "0 32px 24px", background: "#f8fafc", borderRadius: 10, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Net salary</p>
              <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>After all deductions</p>
            </div>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 500, color: "#0f172a" }}>₹{payslip.netSalary?.toLocaleString() ?? "0"}</p>
          </div>

          {/* Footer */}
          <div style={{ padding: "20px 32px 28px", borderTop: "0.5px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>System generated no signature required</p>
            <button
              className="no-print"
              onClick={() => window.print()}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, padding: "8px 16px", borderRadius: 8, border: "0.5px solid #e2e8f0", background: "white", cursor: "pointer", color: "#0f172a" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 9V3h12v6M6 14h12v7H6z" />
              </svg>
              Print
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default PrintPayslip;