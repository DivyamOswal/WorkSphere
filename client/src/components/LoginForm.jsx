import React, { useState } from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-10 sm:p-12 lg:p-16 bg-[#E6E6E6]">
        <div className="w-full">

          {/* Back link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-xs mb-8 transition-colors"
          >
            <ArrowLeftIcon size={14} strokeWidth={1.5} />
            Back to portals
          </Link>

          {/* Header */}
          <div className="mb-7">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', color: '#6366f1', textTransform: 'uppercase', marginBottom: 8 }}>
              {role}
            </p>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400, color: '#0f172a', lineHeight: 1.15, marginBottom: 6 }}>
              {title}
            </h1>
            <p style={{ fontSize: 13, fontWeight: 300, color: '#94a3b8', lineHeight: 1.6 }}>
              {subtitle}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-lg flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500 tracking-wide">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="johndoe@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-light text-slate-800 placeholder:text-slate-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-lg text-sm font-light text-slate-800 placeholder:text-slate-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOffIcon size={16} strokeWidth={1.5} /> : <EyeIcon size={16} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2Icon size={15} className="animate-spin" />}
              Sign in
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-slate-500 mt-6">
            © {new Date().getFullYear()} WorkSphere. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;