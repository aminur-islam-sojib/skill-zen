import ShimmerButton2 from "../Button/ShimmerButton2";


const Hero: React.FC = () => (
  <section className="relative z-10 text-center py-16 sm:py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-orange-600 dark:text-orange-400 uppercase bg-orange-100 dark:bg-orange-900/30 rounded-full">
        Qupe Finance
      </span>
      <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
        Master New Skills. Build Your  
        <span className="text-orange-500"> Future.</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
        Learn fast with curated mini-courses designed for real-world growth.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <ShimmerButton2 text="Get started - for free"/>
       
       <ShimmerButton2 text="Discover Qupe" />
        
        
      </div>
    </div>
  </section>
);

export default function Hero2() {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-black">
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-160 h-160 bg-linear-to-tr from-orange-200 dark:from-orange-800/30 to-transparent opacity-20 dark:opacity-10 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none">
        <div className="w-160 h-160 bg-linear-to-bl from-orange-200 dark:from-orange-800/30 to-transparent opacity-20 dark:opacity-10 rounded-full blur-3xl" />
      </div>
       
      <main>
        <Hero />
      </main>
    </div>
  );
}
