"use client"

import { useAuth } from "@/hooks/AuthProvider";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// ----------------- User Dropdown -----------------
interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, onClose, onMouseEnter, onMouseLeave, onFocus, onBlur }) => {
    const { user, logout } = useAuth();
    const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const handleLogOut = () => {

    Swal.fire({
  title: "Are you sure?",
  text: "You wanna log out!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, log out!"
}).then((result) => {
  if (result.isConfirmed) {
  try {
                  logout();
                onClose();
                router.push('/');
              } catch (err) {
                console.error('Logout failed:', err);
              }

    Swal.fire({
      title: "Log Out!",
      text: "Your Account has been Logout.",
      icon: "success"
    });
  }
});

  }

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      tabIndex={0}
      className="absolute right-0 mt-2 w-64 bg-black border border-gray-800 rounded-xl shadow-2xl py-2 z-50"
    >
      <div className="px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center border border-gray-700">
            {user &&  user.photoURL ? (
              <Image src={user.photoURL} alt="User avatar" width={40} height={40} className="w-full h-full object-cover" />
            ) : (
              <User className="h-6 w-6 text-white" />
            )}
          </div>
        {user &&   <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{user.displayName || "User"}</p>
            <p className="text-gray-400 text-sm truncate">{user.email}</p>
          </div>}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Link href="/profile" className="text-gray-200 hover:text-white px-2 py-1 rounded-md">Profile</Link>
          <button
            onClick={ handleLogOut}
            className="text-left text-gray-200 hover:text-white px-2 py-1 rounded-md"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown