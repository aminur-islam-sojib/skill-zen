"use client";
import React, { useState,  useCallback, useRef } from "react";
import Link from "next/link";
 
import { motion, Variants, Transition } from "framer-motion";
import { Home, User, GraduationCap, LayoutDashboardIcon, Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import ShimmerButton from "../Button/ShimmerButton";
import ThemeToggle from "../ThemeToggle";
import { useAuth } from "@/hooks/AuthProvider";
import ShimmerAvatarButton from "./ShimmerAvatarButton";
import UserDropdown from "./UserDropdown";

// ----------------- Types -----------------
interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}
 

// ----------------- Menu Items -----------------
const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    href: "/",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    label: "Courses",
    href: "/courses",
    gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
  },
  {
    icon: <LayoutDashboardIcon className="h-5 w-5" />,
    label: "Categories",
    href: "/categories",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400",
  },
  {
    icon: <User className="h-5 w-5" />,
    label: "About",
    href: "/about",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Contact",
    href: "/contact",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400",
  },
];

// ----------------- Animation Variants -----------------
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 2 },
};

const sharedTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

// ----------------- Navbar Component -----------------
export default function ClientNavbar(): React.JSX.Element {
  const pathname = usePathname();
  const { user }  = useAuth();
  const [open, setOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<number | NodeJS.Timeout | null>(null);

  const toggleUserDropdown = useCallback(() => {
    setIsUserDropdownOpen((prev) => !prev);
  }, []);

  const closeUserDropdown = useCallback(() => {
    setIsUserDropdownOpen(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openUserDropdown = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsUserDropdownOpen(true);
  }, []);

  const closeUserDropdownDelayed = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => setIsUserDropdownOpen(false), 180);
  }, []);

  // ----------------- Render Menu Items -----------------
  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    return (
      <motion.li key={item.label} className="relative">
        <motion.div
          className="block rounded-xl overflow-visible group relative"
          style={{ perspective: "600px" }}
          whileHover="hover"
          initial="initial"
        >
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
            variants={glowVariants}
            style={{ background: item.gradient }}
          />
          {/* Front */}
          <Link href={item.href}>
            <motion.div
              className={`flex items-center gap-2 px-4 py-2 z-10 rounded-xl ${
                isActive
                  ? "text-blue-500 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              }`}
              variants={itemVariants}
              transition={sharedTransition}
            >
              <span className={`transition-colors ${item.iconColor}`}>{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          </Link>
          {/* Back */}
          <Link href={item.href}>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 absolute inset-0 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white rounded-xl"
              variants={backVariants}
              transition={sharedTransition}
              style={{ transform: "rotateX(90deg)" }}
            >
              <span className={`transition-colors ${item.iconColor}`}>{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.li>
    );
  };

  return (
    <div className="sticky top-0 z-50 my-3">
      <motion.nav className="p-3 rounded-2xl w-11/12 mx-auto bg-white/60 dark:bg-black/60 backdrop-blur-lg border border-gray-200/80 dark:border-gray-800/80 shadow-lg relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="font-bold text-xl">Logo</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-2 relative z-10">
            {menuItems.map(renderMenuItem)}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2 relative">
            {user ? (
              <div
                className="relative"
                onMouseEnter={openUserDropdown}
                onMouseLeave={closeUserDropdownDelayed}
                onFocus={openUserDropdown}
                onBlur={closeUserDropdownDelayed}
              >
                <ShimmerAvatarButton
                  onClick={toggleUserDropdown}
                  onFocus={openUserDropdown}
                  onBlur={closeUserDropdownDelayed}
                  onMouseEnter={openUserDropdown}
                  onMouseLeave={closeUserDropdownDelayed}
                />
                <UserDropdown
                  isOpen={isUserDropdownOpen}
                  onClose={closeUserDropdown}
                  onMouseEnter={openUserDropdown}
                  onMouseLeave={closeUserDropdownDelayed}
                  onFocus={openUserDropdown}
                  onBlur={closeUserDropdownDelayed}
                />
              </div>
            ) : (
              <>
                <ShimmerButton text="Log In" />
                <ShimmerButton text="Register" />
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-3 flex flex-col gap-3 p-4 rounded-xl bg-white/80 dark:bg-black/70 backdrop-blur-xl"
          >
            {menuItems.map(renderMenuItem)}
            <div className="flex flex-col gap-3 mt-2">
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={openUserDropdown}
                  onMouseLeave={closeUserDropdownDelayed}
                  onFocus={openUserDropdown}
                  onBlur={closeUserDropdownDelayed}
                >
                  <ShimmerAvatarButton
                    onClick={toggleUserDropdown}
                    onFocus={openUserDropdown}
                    onBlur={closeUserDropdownDelayed}
                    onMouseEnter={openUserDropdown}
                    onMouseLeave={closeUserDropdownDelayed}
                  />
                  <UserDropdown
                    isOpen={isUserDropdownOpen}
                    onClose={closeUserDropdown}
                    onMouseEnter={openUserDropdown}
                    onMouseLeave={closeUserDropdownDelayed}
                    onFocus={openUserDropdown}
                    onBlur={closeUserDropdownDelayed}
                  />
                </div>
              ) : (
                <>
                  <ShimmerButton text="Log In" />
                  <ShimmerButton text="Register" />
                </>
              )}
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}
