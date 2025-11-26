import useData from "@/hooks/useData";
import GlobalLoader from "../Loader/GlobalLoader";
import Card from "../Card/Card";

const LatestCourses = () => {
  const { data: courses, loading } = useData({ url: "/latest-courses" });

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <div>
 

    <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="mt-6 py-5 pb-10 text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-foreground mb-6">
         Latest
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500">
            {" "}
          Courses
          </span>
        </h1>
    
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-11/12 mx-auto gap-5">
        {courses.map((course, index) => (
          <Card key={index} data={course} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default LatestCourses;
