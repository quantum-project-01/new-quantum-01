import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  // Determine the redirect path from location state
  const from = location.state?.from?.pathname || '/dashboard';
  const loginIntent = location.state?.intent;

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authService.login(credentials),
    onSuccess: (response) => {
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        
        // Handle different login intents
        switch (loginIntent) {
          case 'proceed_to_payment':
            // Redirect to a payment or checkout page
            navigate('/booking/checkout', { replace: true });
            break;
          default:
            // Default redirect
            navigate(from, { replace: true });
        }
      } else {
        setError(response.message || "Login failed");
      }
    },
    onError: () => {
      setError("Login failed. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  // Optional: Show a context-aware message based on login intent
  useEffect(() => {
    if (loginIntent === 'proceed_to_payment') {
      setError("Please log in to proceed with your booking.");
    }
  }, [loginIntent]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Login
        </h2>

        {error && (
          <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link 
              to="/login-otp" 
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Login with OTP
            </Link>
            <Link 
              to="/forgot-password" 
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-blue-400 hover:text-blue-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;