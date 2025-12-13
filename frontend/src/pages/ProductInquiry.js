import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api/api";
import { message, Spin } from "antd";

const ProductInquiry = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (productId) {
      API.get(`/products/${productId}`)
        .then((res) => {
          setProduct(res.data);
          setFormData(prev => ({
              ...prev,
              message: `Hi, I'm interested in the ${res.data.name}. Is this model available?`
          }));
          setLoading(false);
        })
        .catch(() => {
            message.error("Product not found");
            setLoading(false);
        });
    } else {
        setLoading(false);
    }
  }, [productId]);

  const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);
      // Simulate API call
      setTimeout(() => {
          message.success("Inquiry sent successfully! We'll contact you soon.");
          setSubmitting(false);
          setFormData({ fullName: "", email: "", phone: "", message: "" });
      }, 1500);
  };

  if(loading) return <div className="flex h-screen items-center justify-center"><Spin size="large"/></div>;

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111518] dark:text-white font-display min-h-screen flex flex-col">
      {/* Navbar - Reused consistency */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] dark:border-gray-800 bg-white dark:bg-[#111a22] px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
                <div className="size-8 text-primary">
                    <span className="material-symbols-outlined text-4xl">devices</span>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">DIGI WORLD</h2>
            </div>
            <div className="hidden md:flex items-center gap-9">
                <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="/">Home</Link>
                <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="/products">Phones</Link>
                <a className="text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Support</a>
            </div>
        </div>
        <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold leading-normal">
            Log In
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 justify-center py-5 sm:py-10 px-4 sm:px-10">
        <div className="flex flex-col max-w-[1200px] flex-1">
            {/* Page Heading Section */}
            <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Product Inquiry</h1>
                <p className="text-[#617989] dark:text-gray-400 text-base font-normal leading-normal">
                    Ask us anything about this device. We typically respond within 24 hours.
                </p>
            </div>

            {/* Split Layout: Product Card (Left) & Form (Right) */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Product Summary Card */}
                {product ? (
                    <div className="w-full lg:w-1/3 flex flex-col gap-6 sticky top-24">
                        <div className="flex flex-col rounded-xl bg-white dark:bg-[#1a2632] shadow-sm border border-[#e5e7eb] dark:border-gray-700 overflow-hidden">
                            <div className="w-full bg-center bg-no-repeat bg-contain aspect-[4/3] bg-white dark:bg-[#1a2632] relative group p-4">
                                <img src={product.image || "https://via.placeholder.com/400"} alt={product.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold leading-tight">{product.name}</h3>
                                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">In Stock</span>
                                    </div>
                                    <p className="text-primary text-lg font-bold leading-normal">${product.price}</p>
                                    <p className="text-[#617989] dark:text-gray-400 text-sm font-normal leading-normal">{product.brand} • {product.ramOptions?.[0]}</p>
                                </div>
                                <div className="h-px bg-[#f0f3f4] dark:bg-gray-700 w-full"></div>
                                <div className="flex flex-col gap-2 text-sm text-[#617989] dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                        <span>1 Year Warranty</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">local_shipping</span>
                                        <span>Free Express Shipping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Help Box */}
                        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-6 border border-blue-100 dark:border-blue-900/30 hidden lg:flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-primary">
                                <span className="material-symbols-outlined">support_agent</span>
                                <h4 className="font-bold">Need faster help?</h4>
                            </div>
                            <p className="text-sm text-[#617989] dark:text-gray-400">Call our support line directly for urgent inquiries.</p>
                            <a className="font-bold hover:text-primary transition-colors" href="tel:+94765751275">+94 76 575 1275</a>
                        </div>
                    </div>
                ) : (
                    <div className="w-full lg:w-1/3 p-6 text-center text-gray-500 rounded-xl border border-dashed border-gray-300">
                         No product selected. <Link to="/products" className="text-primary underline">Browse products</Link>
                    </div>
                )}

                {/* Right Column: Inquiry Form */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-gray-700 p-6 sm:p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">mail</span>
                            Send us a message
                        </h3>
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            {/* Name & Email Row */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <label className="flex flex-col flex-1 gap-2">
                                    <span className="text-sm font-bold leading-normal">Full Name <span className="text-red-500">*</span></span>
                                    <div className="relative">
                                        <input 
                                            className="w-full rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] focus:border-primary h-12 px-4 placeholder:text-gray-400 text-base" 
                                            placeholder="John Doe" 
                                            required 
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">person</span>
                                    </div>
                                </label>
                                <label className="flex flex-col flex-1 gap-2">
                                    <span className="text-sm font-bold leading-normal">Email Address <span className="text-red-500">*</span></span>
                                    <div className="relative">
                                        <input 
                                            className="w-full rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] focus:border-primary h-12 px-4 placeholder:text-gray-400 text-base" 
                                            placeholder="john@example.com" 
                                            required 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">alternate_email</span>
                                    </div>
                                </label>
                            </div>
                            {/* Phone Number Row */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <label className="flex flex-col flex-1 gap-2">
                                    <span className="text-sm font-bold leading-normal">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></span>
                                    <div className="relative">
                                        <input 
                                            className="w-full rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] focus:border-primary h-12 px-4 placeholder:text-gray-400 text-base" 
                                            placeholder="+1 (555) 000-0000" 
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">call</span>
                                    </div>
                                </label>
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                            {/* Message Textarea */}
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-bold leading-normal">Your Question <span className="text-red-500">*</span></span>
                                <textarea 
                                    className="w-full rounded-lg border border-[#dbe1e6] dark:border-gray-600 bg-white dark:bg-[#111a22] focus:border-primary p-4 placeholder:text-gray-400 text-base resize-none" 
                                    placeholder="I'm interested in this product..." 
                                    required 
                                    rows="6"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </label>
                            {/* Terms Checkbox */}
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary/20 cursor-pointer" type="checkbox" required />
                                <span className="text-sm text-[#617989] dark:text-gray-400 group-hover:text-[#111518] dark:group-hover:text-white transition-colors">I agree to the <a className="text-primary underline" href="#">Privacy Policy</a> and consent to being contacted.</span>
                            </label>
                            {/* Submit Button */}
                            <div className="flex items-center justify-end mt-4 pt-4 border-t border-[#f0f3f4] dark:border-gray-700">
                                <button 
                                    className="flex min-w-[160px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-8 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed" 
                                    type="submit"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <span>Sending...</span>
                                    ) : (
                                        <>
                                            <span>Send Inquiry</span>
                                            <span className="material-symbols-outlined text-lg">send</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* Footer */}
       <footer className="bg-white dark:bg-[#1a2632] border-t border-[#f0f3f4] dark:border-gray-800 py-10 px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-[#111518] dark:text-white">
        <span className="material-symbols-outlined text-primary">devices</span>
        <span className="font-bold tracking-tight">DIGI WORLD</span>
        </div>
        <div className="flex gap-8 text-sm text-[#617989] dark:text-gray-400">
        <a className="hover:text-primary transition-colors" href="#">Privacy</a>
        <a className="hover:text-primary transition-colors" href="#">Terms</a>
        <a className="hover:text-primary transition-colors" href="#">Cookies</a>
        </div>
        <p className="text-sm text-[#617989] dark:text-gray-400">© 2024 Digi World Inc. All rights reserved.</p>
        </div>
        </footer>
    </div>
  );
};

export default ProductInquiry;
