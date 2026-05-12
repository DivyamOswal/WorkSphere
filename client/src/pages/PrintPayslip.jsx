import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import { format } from "date-fns";
import { PrinterIcon, BuildingIcon } from "lucide-react";

const PrintPayslip = () => {
  const { id } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => slip._id === id));
    setTimeout(() => setLoading(false), 800);
  }, [id]);

  /*  Loading  */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 rounded-full border-2 border-slate-200 border-t-slate-500 animate-spin" />
      </div>
    );

  /*  Not found  */
  if (!payslip)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3">
        <p className="text-slate-400 text-sm">Payslip not found.</p>
      </div>
    );

  const period = format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy");
  const fullName = [payslip.employee?.firstName, payslip.employee?.lastName]
    .filter(Boolean)
    .join(" ");

  const rows = [
    { label: "Basic Salary", value: payslip.basicSalary, muted: false },
    { label: "Allowances", value: payslip.allowances, muted: false },
    { label: "Deductions", value: payslip.deductions, muted: false },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center py-10 px-4 print:bg-white print:p-0 print:block">
      <div
        id="payslip-document"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none print:max-w-none"
      >
        {/*  Header band  */}
        <div className="bg-slate-900 px-8 py-7 flex items-center justify-between print:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
              <BuildingIcon
                size={16}
                strokeWidth={1.5}
                className="text-blue-300"
              />
            </div>
            <div>
              <p className="text-white text-[15px] font-semibold tracking-tight">
                WorkForce Pro
              </p>
              <p className="text-slate-400 text-[11px] tracking-widest uppercase mt-px">
                Management System
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white text-[13px] font-semibold">PAYSLIP</p>
            <p className="text-slate-400 text-[12px] mt-0.5">{period}</p>
          </div>
        </div>

        <div className="px-8 py-7">
          {/*  Employee details  */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8 pb-8 border-b border-slate-100">
            {[
              { label: "Employee Name", value: fullName },
              { label: "Position", value: payslip.employee?.position },
              { label: "Email", value: payslip.employee?.email },
              { label: "Pay Period", value: period },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10.5px] text-slate-400 uppercase tracking-widest mb-1">
                  {label}
                </p>
                <p className="text-[13.5px] font-semibold text-slate-800">
                  {value || "-"}
                </p>
              </div>
            ))}
          </div>

          {/*  Earnings table  */}
          <div className="rounded-xl border border-slate-100 overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left py-3 px-5 text-[10.5px] text-slate-400 uppercase tracking-widest font-medium">
                    Description
                  </th>
                  <th className="text-right py-3 px-5 text-[10.5px] text-slate-400 uppercase tracking-widest font-medium">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ label, value }) => (
                  <tr key={label} className="border-t border-slate-100">
                    <td className="py-3.5 px-5 text-slate-600 text-[13px]">
                      {label}
                    </td>
                    <td className="text-right py-3.5 px-5 text-slate-700 text-[13px] font-medium">
                      ₹{value?.toLocaleString() ?? "0"}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td className="py-4 px-5 text-slate-900 font-semibold text-[13.5px]">
                    Net Salary
                  </td>
                  <td className="text-right py-4 px-5 text-slate-900 font-bold text-[15px]">
                    ₹{payslip.netSalary?.toLocaleString() ?? "0"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/*  Footer note  */}
          <p className="text-[11px] text-slate-400 text-center mb-8">
            This is a system-generated payslip and does not require a signature.
          </p>

          {/*  Print button */}
          <div className="flex justify-center print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13.5px] font-medium bg-slate-900 hover:bg-slate-700 text-white transition-colors duration-150"
            >
              <PrinterIcon size={15} strokeWidth={1.8} />
              Print Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPayslip;
