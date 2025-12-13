import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { message } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post("/auth/login", formData)
      .then((res) => {
        message.success("Login successful!");
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      })
      .catch((err) => {
        message.error("Login failed! Check credentials.");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center items-center p-4 font-display">
      <div className="w-full max-w-md bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl border border-[#dbe1e6] dark:border-gray-700 overflow-hidden">
        <div className="p-8">
            <div className="flex justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-5xl">lock</span>
            </div>
            <h2 className="text-2xl font-bold text-center text-[#111518] dark:text-white mb-2">Admin Login</h2>
            <p className="text-center text-[#617989] dark:text-gray-400 mb-8">Enter your credentials to access the dashboard</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold text-[#111518] dark:text-white">Email Address</span>
                    <input 
                        className="w-full rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 text-base outline-none transition-all dark:text-white"
                        type="email"
                        required
                        placeholder="digiabi30@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </label>
                
                <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold text-[#111518] dark:text-white">Password</span>
                    <input 
                        className="w-full rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 text-base outline-none transition-all dark:text-white"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </label>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="mt-2 w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {loading ? "Signing in..." : (
                        <>
                            <span>Sign In</span>
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </>
                    )}
                </button>
            </form>
        </div>
        <div className="bg-[#f6f7f8] dark:bg-[#111a22] p-4 text-center border-t border-[#dbe1e6] dark:border-gray-700">
            <a href="/" className="text-sm font-medium text-[#617989] hover:text-primary transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Store
            </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
