import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, User, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-[#0A192F] border-b border-[#112240] fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-all"
        >
          <div className="size-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Chatto</h1>
        </Link>

        <div className="flex items-center gap-3">
          {authUser && (
            <>
              <Link
                to="/profile"
                className=" flex items-center btn btn-sm gap-2 bg-[#112240] text-white hover:bg-blue-500/20"
              >
                <User className="size-5 text-blue-400" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center btn btn-sm gap-2 bg-[#112240] text-white hover:bg-blue-500/20"
              >
                <Settings className="size=5 text-blue-400" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                className="flex gap-2 items-center text-white bg-[#112240] px-3 py-2 rounded-lg hover:bg-red-500/20"
                onClick={logout}
              >
                <LogOut className="size-5 text-red-400" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
