"use client";

import { useAuth } from "@/hooks/AuthProvider";
import { useAxiosSecure } from "@/lib/useAxiosSecure";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
  phoneNumber: string;
  experience: number;
  options: string;
  file: FileList | null; // FIXED HERE
  bio: string;
};

import ProtectedRoute from '@/components/ProtectedRoute';

export default function TeacherFormCard() {
  const { handleSubmit, register } = useForm<Inputs>();
  const instanceSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("SUBMITTED DATA:", data);

    // Access uploaded file (optional)
    const file = data.file?.[0];
    if (file) {
      console.log("Uploaded File:", file);
    }

    const name = data.name;
    const email = data.email;
    const experience = data.experience;
    const bio = data.bio;
    const phoneNumber = data.phoneNumber;
    const category = data.options;

    const userInfo = { name, email, experience, bio, phoneNumber, category };

    try {
      const res = await instanceSecure.post("/became-teacher", userInfo);

      console.log("RESPONSE DATA", res.data.role);

      if (res.data.role == "teacher") {
        toast.info("You are already a teacher");
      } else {
        toast.success("Teacher Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }

    //  reset()
  };

  return (
    <ProtectedRoute>
      <div className="w-11/12 mx-auto flex items-center justify-center p-4">
        <div className="w-full mx-auto [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.teal.500)_86%,theme(colors.cyan.300)_90%,theme(colors.teal.500)_94%,theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border">
          <div className="relative text-center z-10 px-8 py-12 rounded-2xl w-full bg-white dark:bg-black h-full mx-auto">
            {/* Header */}
            <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              Become a Teacher
            </h1>
            <p className="text-sm mt-2 text-gray-600 dark:text-slate-400">
              Fill the form to apply as an instructor
            </p>

            {/* FORM START */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex flex-col gap-6 text-left"
            >
              {/* GRID WRAPPER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400"
                    placeholder="John Doe"
                    {...register("name", { required: true })}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400"
                    defaultValue={user?.email || ""}
                    readOnly
                    {...register("email", { required: true } )}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400"
                    placeholder="+8801XXXXXXXXX"
                    {...register("phoneNumber")}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                    Teaching Experience (Years)
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400"
                    placeholder="2"
                    {...register("experience")}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                    Teaching Category
                  </label>
                  <select
                    {...register("options")}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="">Select category</option>
                    <option value="web">Web Development</option>
                    <option value="design">UI/UX Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="productivity">Productivity</option>
                  </select>
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400"
                    {...register("file")}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                  Short Bio
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 focus:ring-2 focus:ring-cyan-400"
                  placeholder="Tell us about yourself..."
                  {...register("bio")}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors duration-300"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
