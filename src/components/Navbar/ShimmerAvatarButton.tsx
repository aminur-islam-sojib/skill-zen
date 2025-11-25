"use client";
import { useAuth } from "@/hooks/AuthProvider";
import { User } from "lucide-react";
import Image from "next/image";

// ----------------- Shimmer Avatar Button -----------------
interface UserType {
  displayName?: string;
  email?: string;
  photoURL?: string;

}

interface ShimmerAvatarProps {
  user?: UserType;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}


const ShimmerAvatarButton: React.FC<ShimmerAvatarProps> = ({ onClick, onFocus, onBlur, onMouseEnter, onMouseLeave }) => {

    const {user} = useAuth()
    
  const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes shimmer-spin { to { --angle: 360deg; } }
  `;

  return (
    <div className="flex items-center justify-center font-sans cursor-pointer">
      <style>{customCss}</style>
      <button
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative inline-flex items-center justify-center p-[1.5px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full  text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
          {user?.photoURL ? (
            <Image src={user.photoURL} alt="User avatar" width={32} height={32} className="w-full h-full object-cover rounded-full" />
          ) : (
            <User className="h-6 w-6 text-white" />
          )}
        </span>
      </button>
    </div>
  );
};

export default ShimmerAvatarButton