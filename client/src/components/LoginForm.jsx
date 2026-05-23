import React, { useState } from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  AlertCircleIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setLoading(true)
    try {
      await login(email, password, role)
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response?.error || error.message || "Login failed")
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      {/*  Right Panel  */}
      <div
        className="flex-1 flex items-center justify-center p-10 sm:p-12 lg:p-16"
        style={{ background: "#090e18", minHeight: "100vh" }}
      >
        <div className="w-full max-w-sm">
          {/* Back link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 mb-8 transition-colors duration-150"
            style={{
              color: "rgba(244,240,232,0.3)",
              fontSize: 12,
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(244,240,232,0.65)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(244,240,232,0.3)")
            }
          >
            <ArrowLeftIcon size={13} strokeWidth={1.5} />
            Back to portals
          </Link>

          {/* Header */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-px h-3" style={{ background: "#4f8ef7" }} />
              <p
                className="text-[11px] font-medium uppercase tracking-[0.12em]"
                style={{ color: "#4f8ef7", fontFamily: "'Outfit', sans-serif" }}
              >
                {role}
              </p>
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 32,
                fontWeight: 300,
                color: "#f4f0e8",
                lineHeight: 1.1,
                marginBottom: 6,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(244,240,232,0.4)",
                lineHeight: 1.65,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-5 flex items-center gap-2.5 p-3.5 rounded-xl"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.18)",
              }}
            >
              <AlertCircleIcon
                size={14}
                strokeWidth={1.5}
                style={{ color: "#f87171", flexShrink: 0 }}
              />
              <p
                className="text-[12.5px]"
                style={{ color: "#f87171", fontFamily: "'Outfit', sans-serif" }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[11.5px] font-medium uppercase tracking-[0.08em]"
                style={{
                  color: "rgba(244,240,232,0.35)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="johndoe@example.com"
                className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(244,240,232,0.08)",
                  color: "#f4f0e8",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(79,142,247,0.4)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.08)";
                  e.target.style.background = "rgba(79,142,247,0.04)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(244,240,232,0.08)";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "rgba(255,255,255,0.04)";
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[11.5px] font-medium uppercase tracking-[0.08em]"
                style={{
                  color: "rgba(244,240,232,0.35)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-[13.5px] outline-none transition-all duration-150"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(244,240,232,0.08)",
                    color: "#f4f0e8",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(79,142,247,0.4)";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(79,142,247,0.08)";
                    e.target.style.background = "rgba(79,142,247,0.04)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(244,240,232,0.08)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "rgba(255,255,255,0.04)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
                  style={{ color: "rgba(244,240,232,0.25)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(244,240,232,0.6)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(244,240,232,0.25)")
                  }
                >
                  {showPassword ? (
                    <EyeOffIcon size={15} strokeWidth={1.5} />
                  ) : (
                    <EyeIcon size={15} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-1 rounded-xl text-[13.5px] font-medium flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50"
              style={{
                background: "#3b82f6",
                color: "#fff",
                fontFamily: "'Outfit', sans-serif",
                boxShadow: "0 4px 24px rgba(59,130,246,0.18)",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "#2563eb";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "#3b82f6";
              }}
            >
              {loading && <Loader2Icon size={15} className="animate-spin" />}
              Sign in
            </button>
          </form>
          {/* Footer */}
          <p
            className="text-[11px]"
            style={{
              color: "rgba(244,240,232,0.18)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            © {new Date().getFullYear()} WorkSphere. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
