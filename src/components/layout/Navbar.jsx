import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Logo,Avatar } from "@/components/ui";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { title: "HOME", path: "/" },
    { title: "ABOUT", path: "/about" },
    { title: "CONTACTS", path: "/contacts" },
    { title: "FAQs", path: "/faqs" },
  ];
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="w-full relative z-50 border-b border-white/[0.02] bg-black/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="pointer-events-auto">
          <Logo className="h-5 w-5" showText={true} />
        </Link>

        <div className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[11px] tracking-widest font-medium text-gray-400">
          {links.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-white transition-colors duration-200 ${isActive ? "text-white" : ""}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1.5 text-[11px] tracking-widest">
            <Search className="w-3.5 h-3.5" />
            <span>SEARCH</span>
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/[0.02]  border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-lg hover:scale-105 transition-all duration-200"
              title={user?.name}
            >
              {<Avatar/>}
            </button>
          ) : (
            <Link
              to="/signin"
              className="px-5 py-2 text-[11px] tracking-wide bg-white text-black font-medium rounded-md hover:bg-white/90 transition-all duration-200"
            >
              Sign In
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#07070a] border-b border-white/5 px-8 py-6 flex flex-col space-y-5 shadow-2xl z-50">
          {links.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-xs font-medium tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              {item.title}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/dashboard");
              }}
              className="w-full flex items-center justify-center gap-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-white"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/[0.02]  flex items-center justify-center text-xs font-bold">
                {<Avatar/>}
              </div>

              <span className="font-medium">{user.name}</span>
            </button>
          ) : (
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 bg-white text-black text-xs font-semibold rounded-md"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
