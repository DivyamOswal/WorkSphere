import { useCallback, useEffect, useState } from "react"
import Loading from "../components/Loading"
import EmployeeDashboard from "../components/EmployeeDashboard"
import AdminDashboard from "../components/AdminDashboard"
import { AlertCircleIcon, RefreshCwIcon } from "lucide-react"
import api from "../api/axios"
import toast from "react-hot-toast"

const Dashboard = () => {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    setError(false)
    api.get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(true)
        toast.error(err.response?.data?.error || err?.message)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  /*  Loading  */
  if (loading) return <Loading />

  /*  Error  */
  if (error || !data) return (
    <div className="min-h-full bg-[#090e18] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-5 text-center max-w-sm">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertCircleIcon size={20} strokeWidth={1.5} className="text-red-400" />
        </div>
        <div>
          <p className="text-[15px] font-medium text-slate-200">Failed to load dashboard</p>
          <p className="text-[13px] text-slate-500 mt-1">
            Something went wrong while fetching your data.
          </p>
        </div>
        <button
          onClick={load}
          className="
            inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            text-[13px] font-medium text-slate-300 hover:text-slate-100
            bg-white/[0.04] hover:bg-white/[0.08]
            border border-white/[0.08] hover:border-white/[0.14]
            transition-all duration-150
          "
        >
          <RefreshCwIcon size={14} strokeWidth={1.8} />
          Try again
        </button>
      </div>
    </div>
  )

  /*  Render  */
  return data.role === "ADMIN"
    ? <AdminDashboard data={data} />
    : <EmployeeDashboard data={data} />
}

export default Dashboard