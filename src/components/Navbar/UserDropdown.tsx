"use client"

 
import { useEffect, useRef } from "react";
import NavProfile from "../Profile/NavProfile";

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
      className="absolute right-0 mt-2 w-64 bg-gray-400 border-2 border-cyan-500 rounded-xl shadow-2xl py-2 z-50"
    >
      <div className="px-4 py-3">
         <NavProfile/>
      </div>
    </div>
  );
};

export default UserDropdown