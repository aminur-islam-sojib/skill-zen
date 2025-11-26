/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAxiosSecure } from "@/lib/useAxiosSecure";
import  { useEffect, useState } from "react";

type UrlType = {
  url: string;
};

const useData = ({ url }: UrlType) => {
  const instanceSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await instanceSecure.get(`${url}`);
        setData(res.data);
      } catch (error) {
        setError(error)
      }finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [instanceSecure, url]);

  return {data, loading, error};
};

export default useData;
