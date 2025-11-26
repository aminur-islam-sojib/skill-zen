import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  courseTitle: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    rating: 5,
    comment:
      "This Advanced Productivity Systems course completely transformed how I manage my workload. The GTD methodology and Notion mastery sections were game-changers for my daily workflow.",
    courseTitle: "Advanced Productivity Systems",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
    comment:
      "The workflow automation techniques I learned have saved me at least 10 hours per week. Worth every penny of the investment!",
    courseTitle: "Advanced Productivity Systems",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Entrepreneur",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    rating: 5,
    comment:
      "The deep work strategies helped me launch my startup while maintaining work-life balance. The Notion templates alone are worth the course price.",
    courseTitle: "Advanced Productivity Systems",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "David Park",
    role: "Marketing Director",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    rating: 5,
    comment:
      "Finally, a productivity course that goes beyond basic tips. The advanced level content delivered exactly what I needed to optimize my personal system.",
    courseTitle: "Advanced Productivity Systems",
    date: "1 week ago",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="mt-6   text-2xl sm:text-3xl lg:text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            What Our
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500">Students Say.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of learners who have transformed their productivity
            with our courses
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow duration-300 border-border"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary opacity-50" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.comment}&quot;
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className=" object-cover"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {testimonial.date}
                    </p>
                  </div>
                </div>

                {/* Course Badge */}
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {testimonial.courseTitle}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              10K+
            </div>
            <div className="text-muted-foreground">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              4.8
            </div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              95%
            </div>
            <div className="text-muted-foreground">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
              50+
            </div>
            <div className="text-muted-foreground">Expert Courses</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
