import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authService.login(credentials),
    onSuccess: (response) => {
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate("/dashboard");
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

  return (
    <div className="min-h-screen flex pt-16">
      {/* Left Side - Video Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Sports Video Background - Working Implementation */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Primary Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => {
              console.log('Video failed to load:', e);
              // Fallback to next video or image
              const video = e.target as HTMLVideoElement;
              const parent = video.parentElement;
              if (parent) {
                parent.style.backgroundImage = `
                  linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(17,24,39,0.9) 100%),
                  url('https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')
                `;
                parent.style.backgroundSize = 'cover';
                parent.style.backgroundPosition = 'center';
              }
            }}
          >
            <source
              src="/videos/video.mp4"
              type="video/mp4"
            />
          </video>
          
          {/* Fallback: Try YouTube embed if video fails */}
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/NcBjx_eyvxc?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=NcBjx_eyvxc&start=0"
            title="Football Sports Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ display: 'none' }}
            onLoad={(e) => {
              // Show iframe if video fails
              const iframe = e.target as HTMLIFrameElement;
              const video = iframe.parentElement?.querySelector('video');
              if (video && video.readyState === 0) {
                iframe.style.display = 'block';
                video.style.display = 'none';
              }
            }}
          ></iframe>
          
          {/* Final Fallback: Static Sports Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(17,24,39,0.8) 100%),
                url('https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')
              `,
              zIndex: -1
            }}
          ></div>
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        
        {/* Interactive gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/30 to-green-900/40 mix-blend-multiply"></div>
        
        {/* Content */}
        <div className="absolute top-[320px] inset-0 flex flex-col justify-center items-start p-16 text-white z-10 mt-auto">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Book Your Perfect Turf
            </h1>
            <p className="text-xl max-w-md opacity-90 mb-8 leading-relaxed">
              Join thousands of players who trust our platform to book premium sports venues. 
              From football to cricket, find your game today.
            </p>
          </div>
          
          {/* Interactive Stats */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-yellow-400">500+</div>
              <div className="text-sm text-gray-200">Venues Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400">24/7</div>
              <div className="text-sm text-gray-200">Booking Support</div>
            </div>
          </div>
        </div>

        {/* Floating sports icons */}
        {/* <div className="absolute top-1/4 right-8 animate-bounce">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            ⚽
          </div>
        </div> */}
        {/* <div className="absolute top-1/2 right-16 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            🏸
          </div>
        </div> */}
        {/* <div className="absolute bottom-1/3 right-12 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            🏀
          </div>
        </div> */}
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue to Quantum</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-100/10 p-3 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transform hover:scale-[1.02] transition-all duration-200"
              >
                {loginMutation.isPending ? "Signing in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Not a member?{" "}
              <Link to="/register" className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                Create an account
              </Link>
            </p>
            <div className="mt-4">
              <Link
                to="/login-otp"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Login with OTP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;