"use client"

import { useAuth } from "@/hooks/AuthProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Calendar, Shield, User, AlertCircle } from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth();

  // Loading state
  if (user === undefined) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="border-cyan-500/20">
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // No user found (logged out or error)
  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Alert className="border-cyan-500/30 bg-cyan-500/5">
          <AlertCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <AlertDescription className="text-base ml-2">
            <span className="font-semibold">No user found.</span> Please log in to view your profile.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Get user initials for avatar fallback
  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  // Format date
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {/* Main Profile Card */}
      <Card className="border-cyan-500/20 shadow-lg shadow-cyan-500/5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Your Profile
          </CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-24 w-24 ring-2 ring-cyan-500/30 ring-offset-2 ring-offset-background">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-linear-to-br from-cyan-500 to-blue-600 text-white text-2xl">
                {getInitials(user.displayName, user.email)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left space-y-2">
              <h2 className="text-2xl font-bold">{user.displayName || "Anonymous User"}</h2>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {user.emailVerified && (
                  <Badge className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <Badge variant="outline" className="border-cyan-500/30">
                  <User className="h-3 w-3 mr-1" />
                  {user.providerId || "User"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cyan-500/10"></div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Email */}
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 border border-cyan-500/10">
                <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                  <p className="text-sm font-mono break-all">{user.email || "Not provided"}</p>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 border border-cyan-500/10">
                <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="text-sm">{formatDate(user.metadata?.creationTime)}</p>
                </div>
              </div>
            </div>

            {/* UID */}
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 border border-cyan-500/10">
              <Shield className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-xs font-mono break-all opacity-70">{user.uid}</p>
              </div>
            </div>

            {/* Last Sign In */}
            {user.metadata?.lastSignInTime && (
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 border border-cyan-500/10">
                <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Last Sign In</p>
                  <p className="text-sm">{formatDate(user.metadata.lastSignInTime)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Card */}
      {!user.emailVerified && (
        <Alert className="border-amber-500/30 bg-amber-500/5">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="ml-2">
            Your email address is not verified. Please check your inbox for a verification email.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}