import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#020c1b] text-[#ccd6f6] bg-cover bg-center" style={{backgroundImage:'url(/bg-signup.jpg)'}}>
      <div className="bg-[#233554] p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Logo & Heading */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#64ffda]/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#64ffda]" />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-[#a8b2d1]">Sign in to your account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8892b0] w-5 h-5" />
              <input
                type="email"
                className="w-full p-3 pl-10 bg-[#112240] text-white rounded-lg focus:ring-2 focus:ring-[#64ffda] outline-none"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8892b0] w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pl-10 bg-[#112240] text-white rounded-lg focus:ring-2 focus:ring-[#64ffda] outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8892b0]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#64ffda] text-[#020c1b] font-bold rounded-lg transition duration-300 hover:bg-[#52e3c3]"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-[#a8b2d1]">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-[#64ffda] hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;