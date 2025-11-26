"use client";

import { useAxiosSecure } from "@/lib/useAxiosSecure";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Clock, 
  BookOpen, 
  Globe, 
  CheckCircle2, 
  PlayCircle,
  Tag,
  Calendar
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  price: string;
  discountPrice: string;
  isFree: boolean;
  image: string;
  thumbnail: string;
  level: string;
  language: string;
  prerequisites: string;
  whatYouWillLearn: string;
  promoVideo: string | null;
  createdAt: string;
}

export default function DetailsPage() {
  const params = useParams();
  const id = params?.id;
  const instanceSecure = useAxiosSecure();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await instanceSecure.get(`/course/${id}`);
        setCourse(res.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [instanceSecure, id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-96 w-full rounded-lg" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card className="p-6 text-center">
          <CardTitle className="text-destructive mb-2">Error</CardTitle>
          <CardDescription>{error || "Course not found"}</CardDescription>
        </Card>
      </div>
    );
  }

  const learningPoints = course.whatYouWillLearn.split(",").map(item => item.trim());
  const discount = course.discountPrice ? 
    Math.round(((parseFloat(course.price) - parseFloat(course.discountPrice)) / parseFloat(course.price)) * 100) : 0;

  return (
 <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {course.promoVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Button size="lg" className="gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Watch Preview
                </Button>
              </div>
            )}
          </div>

          {/* Course Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
              {course.isFree && <Badge className="bg-green-600">Free</Badge>}
            </div>
            <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-xl text-muted-foreground">{course.subtitle}</p>
          </div>

          <Separator />

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </CardContent>
          </Card>

          {/* What You'll Learn */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                What You will Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learningPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Level</p>
                  <p className="text-sm text-muted-foreground">{course.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-muted-foreground">{course.language}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Prerequisites</p>
                  <p className="text-sm text-muted-foreground">{course.prerequisites}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(course.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted mb-4">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {!course.isFree && (
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${course.discountPrice}</span>
                    {discount > 0 && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">${course.price}</span>
                        <Badge variant="destructive" className="gap-1">
                          <Tag className="h-3 w-3" />
                          {discount}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              )}
              {course.isFree && (
                <div className="text-3xl font-bold text-green-600">Free</div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg">
                {course.isFree ? "Enroll for Free" : "Buy Now"}
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Add to Cart
              </Button>
              <Separator />
              <div className="text-sm text-center text-muted-foreground">
                30-Day Money-Back Guarantee
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
 </ProtectedRoute>
  );
}