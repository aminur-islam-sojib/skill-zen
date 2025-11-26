'use client'
import { useAuth } from '@/hooks/AuthProvider';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFileAlt, FaRegUser } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
import { useLoader } from '@/hooks/LoaderContext';
import { useAxiosSecure } from '@/lib/useAxiosSecure';
// Use regular <img> for local blob previews to avoid next/image width/height requirement

// --- Icons ---
const ArrowBoxIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 10L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 4H20V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 20H4V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const EyeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

// --- Component ---
const Login2: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const router = useRouter();
  const { googleLogin, signup, user } = useAuth();
  const instanceSecure = useAxiosSecure();
  const { show, hide } = useLoader();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Revoke preview object URL on change/unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  // const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 

  // --- Upload image to ImgBB ---
  const uploadToImgBB = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      if (!IMGBB_API_KEY) {
        console.warn("IMGBB API Key is missing. Set NEXT_PUBLIC_IMGBB_API_KEY in .env.local");
        return null;
      }
      setUploadingImage(true);
      show();
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('ImgBB HTTP error', res.status, text);
        return null;
      }
      const data = await res.json();
      if (process.env.NODE_ENV === 'development') console.debug("ImgBB response:", data);
      // Imgbb may return different properties depending on the API output
      // Prefer display_url, fallback to url
      const url = data?.data?.display_url || data?.data?.url || null;
      if (!url) {
        console.warn("ImgBB returned no url:", data);
      }
      return url;
    } catch (err) {
      console.error("ImgBB upload failed", err);
      return null;
    } finally {
      setUploadingImage(false);
      hide();
    }
  };

  // --- Google login ---
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const res = await googleLogin();
      if (res.error) {
        setErrorMsg(res.error);
        console.error('Google login error:', res.error);
      } else {
        if (process.env.NODE_ENV === 'development') console.debug('Google login success', res.user);
        router.push('/');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.debug(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  // --- Form submit ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const target = e.target as HTMLFormElement;
    const name = (target.elements.namedItem('name') as HTMLInputElement)?.value?.trim();
    const email = (target.elements.namedItem('email') as HTMLInputElement)?.value?.trim();
    const pass = (target.elements.namedItem('password') as HTMLInputElement)?.value;

    if (!email || !pass) {
      setErrorMsg('Please provide both email and password');
      return;
    }
    if (!name || name.length < 2) {
      setErrorMsg('Please provide your name (at least 2 characters)');
      return;
    }
    if (pass.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // --- Upload image if selected ---
      let profileImageUrl: string | null = null;
      if (selectedFile) {
        profileImageUrl = await uploadToImgBB(selectedFile);
        if (!profileImageUrl) {
          // Warn the user and continue without a profile image (optional)
          setErrorMsg("Image upload failed. Signing up without an avatar.");
          // proceed without profile image
          profileImageUrl = null;
        }
        // Clear preview after upload
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setSelectedFile(null);
      }

      // --- Signup ---
      const res = await signup(email, pass);
      if (res.error) {
        setErrorMsg(res.error);
        console.error('Auth error:', res.error);
      } else if (res.user) {
        // --- Update Firebase profile ---
        try {
          await updateProfile(res.user, { displayName: name, photoURL: profileImageUrl || undefined });
        } catch (err) {
          console.error('updateProfile error:', err);
        }

        if (process.env.NODE_ENV === 'development') console.debug('Profile image URL to send to backend:', profileImageUrl);

        // --- Send to backend ---
        // Send profile image as `profileImageUrl` to match DB column (if your backend uses that key)
        await instanceSecure.post("/users", {
          displayName: name,
          email,
          userPassword: pass,
          // send both keys for backward compatibility with existing backend
          profileImage: profileImageUrl,
          profileImageUrl: profileImageUrl,
        });

        if (process.env.NODE_ENV === 'development') console.debug('User signed up:', res.user);
        router.push('/');
      }
    } catch (err) {
      console.error('Unexpected signup error:', err);
      setErrorMsg('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-black sm:shadow-2xl dark:shadow-gray-900/50 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
            <ArrowBoxIcon />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Sign in with email
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          Make a new doc to bring your words, data, and teams together. For free
        </p>

        {/* Form */}
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
              <FaRegUser />
            </span>
            <input
              type="text"
              name='name'
              placeholder="Name"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
              <EmailIcon />
            </span>
            <input
              type="email"
              name='email'
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* File Upload */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
              <FaFileAlt />
            </span>
            <input
              type="file"
              name='file'
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setSelectedFile(f);
                if (f) {
                  const url = URL.createObjectURL(f);
                  setPreviewUrl(url);
                } else {
                  if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setPreviewUrl(null);
                }
              }}
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Preview:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mx-auto mt-1"
                width={96}
                height={96}
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
              <LockIcon />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              name='password'
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 sm:py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Error */}
          {errorMsg && <div className="text-red-600 dark:text-red-400 text-sm">{errorMsg}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || uploadingImage}
            className={`w-full ${isLoading || uploadingImage ? 'opacity-60 cursor-not-allowed' : ''} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-300 transition-transform transform hover:scale-105`}
          >
            {uploadingImage ? 'Uploading image...' : isLoading ? 'Signing in...' : 'Get Started'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 sm:my-6">
          <hr className="grow border-t border-gray-300 dark:border-gray-700" />
          <span className="mx-2 sm:mx-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Or sign in with</span>
          <hr className="grow border-t border-gray-300 dark:border-gray-700" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center space-x-4">
          <button onClick={handleGoogleLogin} aria-label="Sign in with Google"
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-110"
          >
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login2;
