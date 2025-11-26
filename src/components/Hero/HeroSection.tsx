import Link from "next/link";
import ShimmerButton2 from "../Button/ShimmerButton2";

const Hero: React.FC = () => (
  <section className="relative z-10 text-center py-16 sm:py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 uppercase bg-orange-100 dark:bg-orange-900/30 rounded-full">
        Qupe Finance
      </span>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6">
          Master New Skills. Build
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500">
            {" "}
            Your Future
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question or need assistance? We&apos;re here to help! Reach out
          to our team and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href={"/courses"}>
          <ShimmerButton2 text="Get started - for free" />
        </Link>

        <Link href={"/courses"}>
          <ShimmerButton2 text="Browse Courses" />
        </Link>
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
