"use client"

import AccordionPage from "@/components/Hero/Accordion-view";
import Hero2 from "@/components/Hero/HeroSection";
import LatestCourses from "@/components/Hero/LatestCourses";
import TestimonialsSection from "@/components/Hero/Testimonial";

 

export default function Home() {
  return (
     <div>
     <Hero2/>
     <LatestCourses/>
     <AccordionPage/>
     <TestimonialsSection/>
     </div>
  );
}
