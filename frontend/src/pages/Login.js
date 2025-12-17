import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { message } from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    
    if (!email || !password) {
      message.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.post("/auth/login", { email, password });
      
      const { token, user } = response.data; 
      // Handle both strict token response or object response
      const finalToken = token || response.data.token;
      
      if(finalToken) {
           localStorage.setItem("adminToken", finalToken); 
           // Set additional keys for compatibility with requested logic
           localStorage.setItem("token", finalToken);
           
           if(user || response.data.user) {
               const userData = user || response.data.user;
                if(userData.email) localStorage.setItem("userEmail", userData.email);
                if(userData.role) localStorage.setItem("role", userData.role);
                if(userData.firstname) localStorage.setItem("firstname", userData.firstname);
           }

           message.success("Login successful!");

           // Role redirection logic
           const userRole = (user && user.role) || "admin";
           
           switch (userRole) {
            case "admin":
              navigate("/admin");
              break;
            case "worker":
               // navigate("/worker"); 
               message.info("Worker dashboard not implemented yet");
               navigate("/");
               break;
            default:
              navigate("/admin");
          }
      } else {
          throw new Error("No token received");
      }

    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed, check your credentials");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative bg-gray-100 dark:bg-[#111518]"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-[#1a2632]">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 relative bg-primary/10 flex flex-col items-center justify-center p-12 overflow-hidden">
           <div className="absolute inset-0 bg-primary/20"></div>
           {/* Background decorative image if needed, or just color */}
           <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
              alt="Background"
           />
           
           <div className="relative z-10 flex flex-col items-center">
                <img src="/digiworld_logo.png" alt="Digi World" className="w-48 object-contain drop-shadow-md mb-6" />
                <h2 className="text-3xl font-bold text-white text-center shadow-lg">DIGI WORLD</h2>
                <p className="text-white/90 text-center mt-2 font-medium drop-shadow-md">Welcome to the future of technology.</p>
           </div>
           
           {/* Decorative Element mimicking the cloud divider */}
           <div className="absolute bottom-0 left-0 right-0 z-20">
              <svg viewBox="0 0 1440 320" className="w-full h-auto text-white dark:text-[#1a2632] fill-current">
                  <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
           </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 md:p-12 bg-white dark:bg-[#1a2632] z-10">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-extrabold text-[#111518] dark:text-white tracking-wide text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-[#617989] dark:text-gray-400 text-sm text-center mb-8">
              Sign in to your Digi World account
            </p>

            <form className="space-y-6" onSubmit={handleLogin} autoComplete="off">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400">mail</span>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400">lock</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-gray-400 text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              <div className="text-right">
                <button type="button" className="text-sm text-primary font-medium hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <div className="flex items-center justify-center my-6">
                <div className="flex-1 border-t border-[#dbe1e6] dark:border-gray-700"></div>
                <span className="px-3 text-gray-500 text-sm bg-white dark:bg-[#1a2632]">or</span>
                <div className="flex-1 border-t border-[#dbe1e6] dark:border-gray-700"></div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => message.info("Registration coming soon!")}
                  className="inline-flex items-center text-sm text-primary font-bold hover:underline"
                >
                  Create a new account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
