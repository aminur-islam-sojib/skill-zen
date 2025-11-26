import React from 'react';
import { BookOpen, Users, Award, Target, Zap, Heart, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Crafted Curriculum',
      description: 'Every course is designed by industry professionals with proven track records in their fields.',
    },
    {
      icon: Zap,
      title: 'Learn at Your Pace',
      description: 'Lifetime access to all materials means you can learn on your schedule, without pressure.',
    },
    {
      icon: Award,
      title: 'Affordable Excellence',
      description: 'Premium education with transparent pricing and regular discounts to make learning accessible.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Join 10,000+ students who have transformed their careers and achieved their goals.',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To bridge the gap between ambition and achievement by offering expert-led courses that deliver real, applicable skills—not just theoretical knowledge.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in building a supportive learning community where students can grow together and share their successes.',
    },
    {
      icon: Heart,
      title: 'Quality Education',
      description: 'We are committed to maintaining the highest standards in course content, instructor expertise, and learning experience.',
    },
    {
      icon: Shield,
      title: 'Student Success',
      description: 'Your success is our success. We provide comprehensive support, resources, and tools to ensure you achieve your learning goals.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Students' },
    { value: '50+', label: 'Expert Courses' },
    { value: '4.8', label: 'Average Rating' },
    { value: '95%', label: 'Completion Rate' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-cyan-500/5 dark:from-cyan-500/5 dark:to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Empowering Learners to Master
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500">
                Tomorrow&apos;s Skills
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We believe that quality education should be accessible, practical, and transformative. Our platform was born from a simple observation: traditional learning often fails to keep pace with the rapidly evolving demands of modern careers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Our platform was founded with a vision to democratize access to high-quality, practical education. We saw too many talented individuals held back not by lack of ambition, but by lack of access to the right learning resources.
            </p>
            <p className="text-lg">
              What started as a small collection of productivity courses has grown into a comprehensive learning platform serving over 10,000 students worldwide. We&apos;ve expanded across multiple categories—from advanced productivity systems to technical skills—always maintaining our commitment to quality and practical application.
            </p>
            <p className="text-lg">
              Today, we&apos;re proud to offer courses at every level, from beginners taking their first steps to advanced learners optimizing their expertise. Every course is crafted with care, tested by real students, and continuously improved based on feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
            We&apos;re not just another online learning platform. Here&apos;s what makes us different.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-400/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-linear-to-br from-cyan-500/20 to-cyan-600/20 dark:from-cyan-400/20 dark:to-cyan-500/20">
                        <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Our Core Values
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
            These principles guide everything we do, from course creation to student support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-500/20 to-cyan-600/20 dark:from-cyan-400/20 dark:to-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Our Approach
          </h2>
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Personalized Learning Paths
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We don&apos;t believe in one-size-fits-all education. Whether you&apos;re a beginner taking your first steps or an advanced learner seeking to optimize your systems, our courses meet you where you are with clear prerequisites and structured learning paths.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Practical, Real-World Skills
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every lesson is designed with practical application in mind. From GTD methodology to Notion mastery, from workflow automation to deep work techniques—you&apos;ll learn skills you can implement immediately to see real results.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Continuous Improvement
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We listen to our students and continuously update our courses based on feedback and industry developments. Your lifetime access means you benefit from all future improvements and additions at no extra cost.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their careers and achieving their goals. Your future self will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/courses"} className="px-8 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Browse Courses
            </Link>
            <Link href={"/contact"} className="px-8 py-3 rounded-lg border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 font-semibold hover:bg-cyan-500/10 dark:hover:bg-cyan-400/10 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;