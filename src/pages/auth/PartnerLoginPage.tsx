import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

const PartnerLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Partner login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authService.partnerLogin(credentials),
    onSuccess: (response) => {
      if (response.success && response.data) {
        // Verify that the logged-in user is a partner
        if (response.data.user.role !== 'partner') {
          setError("Access denied. Not a partner account.");
          return;
        }
        
        login(response.data.user, response.data.token);
        navigate("/partner/dashboard");
      } else {
        setError(response.message || "Partner Login failed");
      }
    },
    onError: (error: any) => {
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || "Partner Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Partner Login Error:", error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-primary-500 to-primary-700 opacity-10 -z-10"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {/* You can replace this with your actual logo */}
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-700">Q</span>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-neutral-900 tracking-tight mb-3">
            Partner Portal
          </h2>
          <p className="text-base text-neutral-600">
            Manage your sports venue with precision
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in">
        <div className="bg-white py-10 px-8 shadow-large sm:rounded-3xl border border-neutral-100 relative overflow-hidden">
          {/* Subtle decorative element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-700"></div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm 
              transition-all duration-300 ease-in-out animate-pulse">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-800 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-2 border-neutral-200 rounded-xl shadow-soft py-3 px-4 
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                transition-all duration-300 ease-in-out hover:border-primary-300
                placeholder-neutral-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-neutral-800 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-2 border-neutral-200 rounded-xl shadow-soft py-3 px-4 
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                transition-all duration-300 ease-in-out hover:border-primary-300
                placeholder-neutral-400"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  className="font-semibold text-primary-600 hover:text-primary-700 
                  transition-colors duration-300 ease-in-out"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-medium 
                text-base font-bold text-white bg-primary-600 hover:bg-primary-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign in to Partner Portal"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-neutral-500 font-semibold">
                  New to our platform?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/partner/register"
                className="w-full flex justify-center py-3 px-4 border-2 border-primary-500 rounded-xl 
                text-base font-bold text-primary-700 bg-white hover:bg-primary-50
                transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Partner Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLoginPage; 