"use client";

import { useState } from "react";
import { useLoader } from "@/hooks/LoaderContext";
import { useAxiosSecure } from "@/lib/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

type CourseInputs = {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  language: string;

  price: number;
  discountPrice: number;
  isFree: boolean | string;

  thumbnail: string;
  promoVideo: FileList | null;

  prerequisites: string;
  whatYouWillLearn: string;
};

export default function CreateCourseForm() {
  const { register, handleSubmit, reset } = useForm<CourseInputs>();

  const instanceSecure = useAxiosSecure();
  const { show, hide } = useLoader();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [uploadingImage, setUploadingImage] = useState(false);
const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: CourseInputs) => {


    const courseDetail = {
      title: data.title,
      subtitle: data.subtitle,
      category: data.category,
      level: data.level,
      language: data.language,
      price: data.price,
      discountPrice: data.discountPrice,
      isFree: data.isFree === true || data.isFree === "true",
      promoVideo: null,
      description: data.description,
      prerequisites: data.prerequisites,
      whatYouWillLearn: data.whatYouWillLearn,
      thumbnail : data.thumbnail
    };

    try {
        show();
        setLoading(true)
     await instanceSecure.post("/create-course", courseDetail);
   
      toast.success("Course created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create course");
    }finally {
        setLoading(false)
        hide();
    }

reset()
  
  };

  return (
   <ProtectedRoute>
     <div className="w-11/12 mx-auto flex items-center justify-center p-4">
      <div className="w-full mx-auto [background:linear-gradient(45deg,#080b11,--theme(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-slate-600/.48)_80%,--theme(--color-teal-500)_86%,--theme(--color-cyan-300)_90%,--theme(--color-teal-500)_94%,--theme(--color-slate-600/.48))_border-box] rounded-2xl border border-transparent animate-border">
        <div className="relative text-center z-10 px-8 py-12 rounded-2xl w-full bg-white dark:bg-black h-full mx-auto">
          {/* HEADER */}
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            Create a New Course
          </h1>
          <p className="text-sm mt-2 text-gray-600 dark:text-slate-400">
            Fill the form to publish your course
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-6 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TITLE */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="JavaScript for Beginners"
                  {...register("title", { required: true })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* SUBTITLE */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Subtitle
                </label>
                <input
                  type="text"
                  placeholder="Learn JavaScript with hands-on examples"
                  {...register("subtitle")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="">Select category</option>
                  <option value="web">Web Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="productivity">Productivity</option>
                </select>
              </div>

              {/* LEVEL */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Level
                </label>
                <select
                  {...register("level")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* LANGUAGE */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Language
                </label>
                <input
                  type="text"
                  placeholder="English"
                  {...register("language")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* PRICE */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Price (USD)
                </label>
                <input
                  type="number"
                  placeholder="19.99"
                  {...register("price")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* DISCOUNT PRICE */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Discount Price
                </label>
                <input
                  type="number"
                  placeholder="9.99"
                  {...register("discountPrice")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* FREE TOGGLE */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Is this course free?
                </label>
                <select
                  {...register("isFree")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              {/* THUMBNAIL */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Course Thumbnail Image
                </label>
                <input
                  type="text"
                  {...register("thumbnail")}
                  placeholder="https//:www.example.com"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                />
               
              </div>

              {/* PROMO VIDEO */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Promo Video
                </label>
                <input
                  type="file"
                  {...register("promoVideo")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Course Description
              </label>
              <textarea
                rows={4}
                placeholder="Write the full course description..."
                {...register("description")}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
              ></textarea>
            </div>

            {/* PREREQUISITES */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Prerequisites (comma separated)
              </label>
              <input
                type="text"
                placeholder="Basic computer knowledge, Internet"
                {...register("prerequisites")}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* LEARNING OUTCOMES */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                What students will learn (comma separated)
              </label>
              <input
                type="text"
                placeholder="JavaScript basics, DOM, Functions"
                {...register("whatYouWillLearn")}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Publishing..." : "Publish Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
   </ProtectedRoute>
  );
}
