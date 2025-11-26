"use client";

import CreateCourseForm from "@/app/create-courses/page";
import { useAuth } from "@/hooks/AuthProvider";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const NavProfile = () => {
  const router = useRouter();
  const { user, logout, userRole } = useAuth();
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanna log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          logout();

          router.push("/");
        } catch (err) {
          console.error("Logout failed:", err);
        }

        Swal.fire({
          title: "Log Out!",
          text: "Your Account has been Logout.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="px-4 py-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center border border-gray-700">
          {user && user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User avatar"
              width={10}
              height={10}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-white" />
          )}
        </div>
        {user && (
          <div className="flex-1 min-w-0">
            <p className="  font-medium truncate">
              {user.displayName || "User"}
            </p>
            <p className=" text-sm truncate">{user.email}</p>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <Link href="/profile" className="hover:text-white px-2 py-1 rounded-md">
          Profile
        </Link>
        <Link
          href="/became-teacher"
          className="hover:text-white px-2 py-1 rounded-md"
        >
          Became Teacher
        </Link>
        <Link
          href="/create-courses"
          className="hover:text-white px-2 py-1 rounded-md"
        >
          Create Courses
        </Link>

        <button
          onClick={handleLogOut}
          className="text-left hover:text-white px-2 py-1 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavProfile;
