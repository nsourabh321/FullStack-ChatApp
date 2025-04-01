import React from "react";
import { useState } from "react";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center text-[#ccd6f6]" style={{backgroundImage:'url(/bg-signup.jpg)'}}>
      <div className="bg-[#233554] p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6">
        {/*logo & heading */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#64ffda]/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#64ffda]" />
            </div>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-[#a8b2d1]">Get started with your free account</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8892b0]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="text-gray-500" />
              ) : (
                <Eye className="text-gray-500" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#64ffda] text-[#020c1b] font-bold rounded-lg transition duration-300 hover:bg-[#52e3c3]"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
