"use client";

import dynamic from "next/dynamic";
import { Course } from "@/components/Card/Card";
const Card = dynamic(() => import("@/components/Card/Card"), {
  ssr: false,
  loading: () => <div className="p-4">Loading card...</div>,
});
import { useAxiosSecure } from "@/lib/useAxiosSecure";
import { useEffect, useState } from "react";

const Courses = () => {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const instanceSecure = useAxiosSecure();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await instanceSecure.get("/courses");
        console.log(res.data.data);
        // Normalize ID fields so Card always has `_id`.
        const normalized = res.data.data.map((item: Course) => ({
          ...item,
          _id: item._id || item.id,
        }));
        setData(normalized);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [instanceSecure]);

  console.log(data)

  return (
    <div className=" w-11/12 mx-auto">
      <h1 className="mt-6 py-5 pb-10 text-2xl sm:text-3xl lg:text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white leading-tight"> All
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500"> Courses</span>
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch">
        {data.map((d, index) => (
          <Card key={index} data={d} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
