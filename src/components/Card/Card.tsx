/* eslint-disable @next/next/no-img-element */
"use client";

export type Course = {
  _id: string;
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  language: string;
  price: string;
  discountPrice: string;
  isFree: boolean;
  image: string;
  thumbnail: string;
  whatYouWillLearn: string;
  prerequisites: string;
};
import Link from "next/link";
import ShimmerButton3 from "../Button/ShimmerButton3";

type DataType = {
  data: Course;
  loading: boolean;
};

export default function Card({ data, loading }: DataType) {
 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex items-center justify-center h-full shadow">
      <div className="w-full h-full mx-auto [background:linear-gradient(45deg,#080b11,--theme(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-slate-600/.48)_80%,--theme(--color-teal-500)_86%,--theme(--color-cyan-300)_90%,--theme(--color-teal-500)_94%,--theme(--color-slate-600/.48))_border-box] rounded-2xl border border-transparent animate-border">
        <div className="relative z-10 px-6 py-8 rounded-2xl w-full bg-white dark:bg-black h-full flex flex-col">
          {/* Thumbnail */}
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />

          {/* Title */}
          <h2 className="text-2xl font-bold mt-5">{data.title}</h2>

          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            {data.subtitle}
          </p>

          {/* Category + Level */}
          <div className="flex gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md">
              {data.category}
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md">
              {data.level}
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md">
              {data.language}
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-5 flex items-center gap-3">
            {data.isFree ? (
              <span className="text-teal-500 font-bold text-lg">FREE</span>
            ) : (
              <>
                <span className="text-xl font-bold text-teal-400">
                  ${data.discountPrice}
                </span>
                <span className="line-through text-gray-400">
                  ${data.price}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {data.description}
          </p>

          {/* What You Will Learn */}
          <div className="mt-5">
            <h4 className="font-semibold mb-2">What You Will Learn</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {data.whatYouWillLearn}
            </p>
          </div>

          {/* Prerequisites */}
          <div className="my-5 flex-1">
            <h4 className="font-semibold mb-2">Prerequisites</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {data.prerequisites}
            </p>
          </div>

          {/* Details Button  */}
          <div className=" w-full flex mt-auto">
            {(!(data._id || data.id)) ? (
              <div className="w-full text-center text-sm text-gray-500">No ID available</div>
            ) : (
              <Link href={`/courses/${data._id ?? data.id}`} className=" w-full flex">
              <ShimmerButton3 text="See Details" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
