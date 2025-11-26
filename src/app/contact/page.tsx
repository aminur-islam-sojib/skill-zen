"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'sojibahmed.mailme@gmail.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+8 (801) 123-4567',
      description: 'Mon-Fri from 9am to 6pm',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Learning Street, Education City',
      description: 'Dhaka, BD',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon-Fri: 9am - 6pm',
      description: 'Weekend: Closed',
    },
  ];

  const faqs = [
    {
      question: 'How quickly will I get a response?',
      answer: 'We typically respond within 24 hours during business days.',
    },
    {
      question: 'Can I get technical support?',
      answer: 'Yes! Our support team can help with any technical issues you encounter.',
    },
    {
      question: 'Do you offer course consultation?',
      answer: 'Absolutely! We can help you choose the right courses for your goals.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-cyan-500/5 dark:from-cyan-500/5 dark:to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Get in
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500">
              {' '}Touch
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or need assistance? We&apos;re here to help! Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-cyan-500" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted && (
                    <div className="mb-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <p className="text-cyan-600 dark:text-cyan-400 font-medium">
                        Thank you! Your message has been sent successfully.
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className={`mt-2 ${errors.name ? 'border-red-500' : ''}`}
                        {...register('name', { 
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <Label htmlFor="subject" className="text-foreground">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help you?"
                        className={`mt-2 ${errors.subject ? 'border-red-500' : ''}`}
                        {...register('subject', { 
                          required: 'Subject is required',
                          minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                        })}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <Label htmlFor="message" className="text-foreground">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className={`mt-2 resize-none ${errors.message ? 'border-red-500' : ''}`}
                        {...register('message', { 
                          required: 'Message is required',
                          minLength: { value: 10, message: 'Message must be at least 10 characters' }
                        })}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="w-full bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="border-border hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-linear-to-br from-cyan-500/20 to-cyan-600/20 dark:from-cyan-400/20 dark:to-cyan-500/20">
                          <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          <p className="text-foreground font-medium mb-1">
                            {info.content}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQs Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Quick Answers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-4">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Prefer to Talk?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sometimes it&apos;s easier to discuss things directly. Schedule a call with our team to get personalized assistance with your learning journey.
          </p>
          <Button className="bg-linear-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white hover:shadow-lg transition-all duration-300 px-8 py-3">
            Schedule a Call
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;