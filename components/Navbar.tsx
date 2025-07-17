"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store"; // Zustand store
import { logoutUser } from "@/lib/api"; // API call to backend logout

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const router = useRouter();

  // Get user and method to clear user from Zustand store
  const { user, clearUser } = useAuthStore();

  // Logout logic: call backend + clear frontend store + redirect
  const handleLogout = async () => {
    await logoutUser(); // remove token from cookie (server-side)
    clearUser(); // remove user from Zustand state
    router.push("/signin"); // redirect to signin page
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600">MyLMS</span>
        </Link>

        {/* Desktop navigation links (hidden on small screens) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/courses" className="hover:text-blue-600 font-medium">
            Courses
          </Link>
          <Link href="/about" className="hover:text-blue-600 font-medium">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 font-medium">
            Contact
          </Link>
        </div>

        {/* Auth Section - Desktop only */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/my-courses"
                className="text-gray-700 hover:text-blue-600"
              >
                My Courses
              </Link>
              <span className="text-gray-700">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
              <Link
                href="/forgot-password"
                className="text-gray-700 hover:text-blue-600"
              >
                Forgot Password
              </Link>
              <Link
                href="/reset-password"
                className="text-gray-700 hover:text-blue-600"
              >
                Reset Password
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMenu}
          className="md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          title={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link href="/courses" className="block text-gray-700">
            Courses
          </Link>
          <Link href="/about" className="block text-gray-700">
            About
          </Link>
          <Link href="/contact" className="block text-gray-700">
            Contact
          </Link>
          <hr />
          {user ? (
            <>
              <span className="block text-gray-700">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false); // close the mobile menu
                }}
                className="block text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="block text-blue-600">
                Sign In
              </Link>
              <Link href="/signup" className="block text-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
