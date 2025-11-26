import Accordion from "./Accordion";

// --- Data for the Accordion ---
const faqData = [
  {
    title: "How do I enroll in a course?",
    content:
      "Enrolling in a course is simple! Browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You can choose between the regular price or take advantage of our discount price if available. Once payment is completed, you'll get instant access to all course materials.",
  },
  {
    title: "What's the difference between free and paid courses?",
    content:
      "Free courses provide access to basic learning materials and introductory content. Paid courses offer comprehensive curriculum, advanced topics, downloadable resources, certificates of completion, and lifetime access to course updates. Premium courses like 'Advanced Productivity Systems' include exclusive content on GTD methodology, Notion mastery, and workflow automation.",
  },
  {
    title: "Do I need any prerequisites to start learning?",
    content:
      "Prerequisites vary by course level. Beginner courses require no prior knowledge, while Intermediate courses expect basic familiarity with the topic. Advanced courses, such as our productivity systems course, require foundational knowledge in the subject area. Check each course's 'Prerequisites' section for specific requirements.",
  },
  {
    title: "What will I learn from the courses?",
    content:
      "Each course is designed with clear learning outcomes. For example, our Advanced Productivity Systems course covers GTD methodology, Notion mastery, workflow automation, and deep work techniques. Every course page includes a 'What You Will Learn' section detailing the specific skills and knowledge you'll gain.",
  },
  {
    title: "Are the courses available in different languages?",
    content:
      "Currently, most of our courses are available in English, with plans to expand to multiple languages based on demand. Each course listing displays the available language(s) so you can choose courses that match your language preference.",
  },
  {
    title: "How long do I have access to the course materials?",
    content:
      "Once you enroll in a paid course, you get lifetime access to all course materials, including future updates and additions. You can learn at your own pace and revisit the content whenever you need a refresher.",
  },
  {
    title: "What categories of courses do you offer?",
    content:
      "We offer courses across multiple categories including Productivity, Development, Design, Business, Marketing, and more. Use our category filters to easily find courses that match your learning goals and professional development needs.",
  },
  {
    title: "Can I get a refund if I'm not satisfied?",
    content:
      "We offer a 30-day money-back guarantee on all paid courses. If you're not satisfied with your purchase, simply contact our support team within 30 days of enrollment for a full refund. We want to ensure you're completely happy with your learning experience.",
  },
];

// --- The Page Component ---
export default function AccordionPage() {
  return (
    <div className="flex flex-col items-center justify-center font-sans p-4 pt-5 transition-colors duration-500 w-11/12 sm:w-10/12 md:w-8/12 mx-auto">
      <div className="w-full mx-auto">
        <h1 className="mt-6 text-2xl sm:text-3xl lg:text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
          Frequently Ask
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500"> Questions.</span>
        </h1>
        <p className="text-gray-600 dark:text-slate-400 text-center mb-10">
          Find answers to common questions about our courses, enrollment,
          pricing, and learning experience.
        </p>

        {/* Here we use the reusable component with our data */}
        <Accordion items={faqData} />
      </div>
    </div>
  );
}
