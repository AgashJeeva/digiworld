
import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111a22] px-10 py-4">
        <div className="flex items-center gap-4 text-[#111518] dark:text-white">
          <div className="h-16 flex items-center justify-center">
            <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">DIGI WORLD</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/products">Products</Link>
            <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="#">Services</Link>
            <Link className="text-primary text-sm font-medium leading-normal" to="/contact">Contact Us</Link>
          </nav>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-[#111518] dark:text-white cursor-pointer">menu</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-10 py-8 max-w-7xl">
          {/* Page Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-3 max-w-2xl">
              <p className="text-[#111518] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Get in Touch</p>
              <p className="text-[#617989] dark:text-gray-400 text-lg font-normal leading-normal">Have a question about a new device or need a repair? We're here to help you connect with the future of tech.</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Contact Info & Map */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Contact Details Card */}
              <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-[#111518] dark:text-white mb-6">Contact Information</h3>
                <div className="flex flex-col gap-2">
                  {/* Address */}
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#111518] dark:text-white text-base font-medium">Headquarters</p>
                      <p className="text-[#617989] dark:text-gray-400 text-sm">16/6, Huskison Road, Trincomalee.</p>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#111518] dark:text-white text-base font-medium">Phone Support</p>
                      <p className="text-[#617989] dark:text-gray-400 text-sm">+94 76 575 1275</p>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#111518] dark:text-white text-base font-medium">Email Us</p>
                      <p className="text-[#617989] dark:text-gray-400 text-sm">digiworldtrinco@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white dark:bg-[#1a2632] rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-800 h-64 overflow-hidden relative group">
                <img 
                  alt="Map view of Silicon City location" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" 
                  data-alt="Map view of Silicon City location" 
                  data-location="Silicon City" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhax2c3yB7QffWXDyi0-cWZnGxyc2J71q0SRPQO-v5mmB8WIP0iTgOBvp43-pJITOQ8LJBpfLenaOJ_dI66K18k2ht9UQPowFSnbwjbwzpyABjpo7rlSo4LkjZe8hRzZEEGTNThCXU29kMx2P0_9W-qpF2kSyj1C0SmHajGlgebIZiDXV9wp7nFV5Vpq5dA9aPghTye05Wk3UCHmvuBAssF3HRZTRtWar-5kTCBPOy9v-S_HBxsBEYo0Gxr3O6oL80HPTmb39IpsNK"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none">
                  <div className="bg-white dark:bg-[#1a2632] p-2 rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">pin_drop</span>
                  </div>
                </div>
              </div>

              {/* FAQ Teaser */}
              <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary text-3xl">help_center</span>
                  <div>
                    <h4 className="text-lg font-bold text-[#111518] dark:text-white">Need a quick answer?</h4>
                    <p className="text-[#617989] dark:text-gray-400 text-sm mt-1 mb-3">Check our Frequently Asked Questions for instant help regarding shipping, returns, and warranties.</p>
                    <Link className="text-primary text-sm font-bold hover:underline flex items-center gap-1" to="#">
                      Visit Help Center <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-[#111518] dark:text-white mb-2">Send us a Message</h3>
                  <p className="text-[#617989] dark:text-gray-400 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
                  <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#111518] dark:text-white" htmlFor="firstName">First Name</label>
                        <input className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-3 text-[#111518] dark:text-white focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all" id="firstName" placeholder="Jane" type="text" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#111518] dark:text-white" htmlFor="lastName">Last Name</label>
                        <input className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-3 text-[#111518] dark:text-white focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all" id="lastName" placeholder="Doe" type="text" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#111518] dark:text-white" htmlFor="email">Email Address</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-3.5 text-gray-400">mail</span>
                        <input className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark pl-10 pr-4 py-3 text-[#111518] dark:text-white focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all" id="email" placeholder="jane@example.com" type="email" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#111518] dark:text-white" htmlFor="subject">What is this regarding?</label>
                      <div className="relative">
                        <select className="w-full appearance-none rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-3 text-[#111518] dark:text-white focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all pr-10" id="subject">
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Warranty Claim</option>
                          <option>Sales & Bulk Orders</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-3.5 text-gray-400 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#111518] dark:text-white" htmlFor="message">How can we help?</label>
                      <textarea className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-3 text-[#111518] dark:text-white focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all resize-none" id="message" placeholder="Tell us about your issue or question..." rows="5"></textarea>
                    </div>
                    <div className="pt-2">
                      <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-primary/20" type="submit">
                        <span>Send Message</span>
                        <span className="material-symbols-outlined text-sm">send</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111a22]">
        <div className="container mx-auto px-10 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-[#111518] dark:text-white">
              <div className="h-12 flex items-center justify-center">
                  <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tight">DIGI WORLD</span>
            </div>
            <div className="flex gap-8 text-sm text-[#617989] dark:text-gray-400">
              <Link className="hover:text-primary transition-colors" to="#">Privacy Policy</Link>
              <Link className="hover:text-primary transition-colors" to="#">Terms of Service</Link>
              <Link className="hover:text-primary transition-colors" to="#">Cookie Settings</Link>
            </div>
            <div className="text-sm text-[#617989] dark:text-gray-400">
              © 2024 Digi World Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
