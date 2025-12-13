import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display">
            {/* Top Navigation - Reused Logic */}
            <div className="w-full bg-white dark:bg-[#1a2632] border-b border-[#f0f3f4] dark:border-[#2a3b4c]">
                <div className="px-4 md:px-10 lg:px-40 py-3 flex items-center justify-between mx-auto max-w-[1440px]">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-[#111518] dark:text-white">
                            <div className="h-16 flex items-center justify-center">
                                <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
                            </div>
                            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">DIGI WORLD</h2>
                        </div>
                        <div className="hidden lg:flex items-center gap-9">
                            <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/">Home</Link>
                            <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/products">Shop</Link>
                            <Link className="text-primary text-sm font-bold leading-normal" to="/about">About Us</Link>
                            <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
                        
                        {/* Hero Section */}
                        <div className="@container p-4 md:p-10 lg:px-8 lg:py-10">
                            <div className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 relative overflow-hidden group shadow-lg" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgYkFj1XV6ncHQQHXffO6c_B2m3ZWrjeZq2i1KcoeifBGXuO5fVxd2NCzkiBBSg-vbL0vC12ZBMKawQpqjklxr0OAfasNT06G5_vpKxAnppnOxu-WCcgsjGRKLynHt8bXJnI5cm3PhlLJGMDNQi2mLwte4xeIsBdtLxLVDuWCKrWdob6it2GOqgOJcbx0w5ZwYGWL_XgefRKtXKOx3QJr-LOkFvoa2gIKqhNDfFPF2dJ013lCb0Yt6KmtFaX5_520w_gzlE004QTkR")'}}>
                                <div className="relative z-10 flex flex-col gap-4 text-center max-w-[700px]">
                                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
                                        Connecting You to the Future
                                    </h1>
                                    <h2 className="text-gray-100 text-lg md:text-xl font-normal leading-relaxed">
                                        Empowering your digital life with the latest smartphones and accessories. We are more than just a store; we are your gateway to innovation.
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Mission & Vision */}
                        <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-8 py-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-[#111518] dark:text-white text-3xl font-bold leading-tight">Driven by technology, grounded in values.</h2>
                                    <p className="text-[#617989] dark:text-gray-400 text-lg leading-relaxed">
                                        At DIGI WORLD, we believe technology should be accessible, transparent, and exciting. Since 2020, we've been bridging the gap between cutting-edge innovation and everyday users.
                                    </p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-3 rounded-xl border border-[#dbe1e6] dark:border-[#2a3b4c] bg-white dark:bg-[#1a2632] p-6 hover:shadow-md transition-shadow">
                                        <div className="text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined">flag</span>
                                        </div>
                                        <h3 className="text-[#111518] dark:text-white text-lg font-bold">Our Mission</h3>
                                        <p className="text-[#617989] dark:text-gray-400 text-sm">To provide the latest technology with verified authenticity and unmatched support.</p>
                                    </div>
                                    <div className="flex flex-col gap-3 rounded-xl border border-[#dbe1e6] dark:border-[#2a3b4c] bg-white dark:bg-[#1a2632] p-6 hover:shadow-md transition-shadow">
                                        <div className="text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined">visibility</span>
                                        </div>
                                        <h3 className="text-[#111518] dark:text-white text-lg font-bold">Our Vision</h3>
                                        <p className="text-[#617989] dark:text-gray-400 text-sm">To become the region's most trusted digital retailer, connecting people through innovation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Counter */}
                        <div className="w-full bg-primary/5 dark:bg-primary/10 py-12 rounded-xl my-8">
                            <div className="px-4 md:px-10 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-transparent">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-4xl font-black text-primary">5k+</h3>
                                    <p className="text-[#617989] dark:text-gray-400 font-medium">Phones Sold</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-4xl font-black text-primary">99%</h3>
                                    <p className="text-[#617989] dark:text-gray-400 font-medium">Happy Customers</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-4xl font-black text-primary">24/7</h3>
                                    <p className="text-[#617989] dark:text-gray-400 font-medium">Support Available</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-4xl font-black text-primary">50+</h3>
                                    <p className="text-[#617989] dark:text-gray-400 font-medium">Brands Partnered</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-8 py-16">
                            <div className="text-center max-w-[720px] mx-auto mb-8">
                                <h2 className="text-[#111518] dark:text-white text-3xl font-black leading-tight mb-4">Why Choose DIGI WORLD?</h2>
                                <p className="text-[#617989] dark:text-gray-400 text-lg">We bring you the best in tech with a promise of quality that you can rely on.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center text-center gap-4 rounded-xl bg-white dark:bg-[#1a2632] p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <span className="material-symbols-outlined" style={{fontSize: '32px'}}>verified</span>
                                    </div>
                                    <h3 className="text-[#111518] dark:text-white text-xl font-bold">100% Authentic</h3>
                                    <p className="text-[#617989] dark:text-gray-400">We guarantee that every product we sell is genuine and sourced directly from manufacturers.</p>
                                </div>
                                <div className="flex flex-col items-center text-center gap-4 rounded-xl bg-white dark:bg-[#1a2632] p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <span className="material-symbols-outlined" style={{fontSize: '32px'}}>payments</span>
                                    </div>
                                    <h3 className="text-[#111518] dark:text-white text-xl font-bold">Transparent Pricing</h3>
                                    <p className="text-[#617989] dark:text-gray-400">Honest pricing with zero hidden fees. What you see is exactly what you pay.</p>
                                </div>
                                <div className="flex flex-col items-center text-center gap-4 rounded-xl bg-white dark:bg-[#1a2632] p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <span className="material-symbols-outlined" style={{fontSize: '32px'}}>support_agent</span>
                                    </div>
                                    <h3 className="text-[#111518] dark:text-white text-xl font-bold">Dedicated Service</h3>
                                    <p className="text-[#617989] dark:text-gray-400">Our support team is here to answer your technical questions and help you choose the right device.</p>
                                </div>
                            </div>
                        </div>

                        {/* History / Timeline */}
                        <div className="px-4 md:px-10 lg:px-8 py-10">
                            <h2 className="text-[#111518] dark:text-white text-3xl font-bold mb-10 text-center">Our Journey</h2>
                            <div className="max-w-[800px] mx-auto">
                                <div className="grid grid-cols-[60px_1fr] gap-x-4">
                                    {/* Step 1 */}
                                    <div className="flex flex-col items-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-md">
                                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                                        </div>
                                        <div className="w-[2px] bg-gray-200 dark:bg-gray-700 h-full -mt-2"></div>
                                    </div>
                                    <div className="pb-10 pt-2">
                                        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded mb-2 inline-block">2020</span>
                                        <h3 className="text-[#111518] dark:text-white text-xl font-bold mb-2">Founded</h3>
                                        <p className="text-[#617989] dark:text-gray-400">Started as a small startup in a garage with a passion for bringing the latest tech to our community.</p>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="flex flex-col items-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2632] border-2 border-primary text-primary flex items-center justify-center z-10">
                                            <span className="material-symbols-outlined text-sm">storefront</span>
                                        </div>
                                        <div className="w-[2px] bg-gray-200 dark:bg-gray-700 h-full -mt-2"></div>
                                    </div>
                                    <div className="pb-10 pt-2">
                                        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded mb-2 inline-block">2021</span>
                                        <h3 className="text-[#111518] dark:text-white text-xl font-bold mb-2">First Flagship Store</h3>
                                        <p className="text-[#617989] dark:text-gray-400">Opened our first physical location in downtown, creating a space for people to experience tech hands-on.</p>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="flex flex-col items-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1a2632] border-2 border-primary text-primary flex items-center justify-center z-10">
                                            <span className="material-symbols-outlined text-sm">public</span>
                                        </div>
                                    </div>
                                    <div className="pb-2 pt-2">
                                        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded mb-2 inline-block">2023</span>
                                        <h3 className="text-[#111518] dark:text-white text-xl font-bold mb-2">Online Expansion</h3>
                                        <p className="text-[#617989] dark:text-gray-400">Launched digiworld.com to serve customers nationwide, bringing our catalog to your fingertips.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Section */}
                        <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-8 py-16">
                            <div className="text-center">
                                <h2 className="text-[#111518] dark:text-white text-3xl font-black leading-tight mb-2">Meet the Team</h2>
                                <p className="text-[#617989] dark:text-gray-400">The people behind the screens.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {/* Team Member 1 */}
                                <div className="group flex flex-col items-center gap-4">
                                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative shadow-sm">
                                        <img alt="Alex Morgan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQVWt6LC9he1WfhpqxCbCRQ0yqQo-ZtuDM-JmmIr2ra-hzsNTPVuI9aPCXNN7_VWKXzplP03fhrr-tAaET99rcc3YYQWec_XvVC0Y6QfNmcURdZqZJg8YJW1kHfTYhOj8-VVOWTNt_98TMGLHjhQPIs_JaQE2bbCyHTPz2Q-Z6T6-xTD6zi4Loh6MLZI5UNaVWtVkiTSQSyNdE1WaNuOAvZ-JfW0j36bK5hQn-LCfQCYm6siWdv-yQLQ7HpE72bd0hwHqcDFZG-R8T"/>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[#111518] dark:text-white font-bold text-lg">Alex Morgan</h3>
                                        <p className="text-primary text-sm font-medium">Founder & CEO</p>
                                    </div>
                                </div>
                                {/* Team Member 2 */}
                                <div className="group flex flex-col items-center gap-4">
                                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative shadow-sm">
                                        <img alt="Sarah Chen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6h5sZFtWKRNtf_nNd5gc0D47pXZk2VHCYWeK0EBWp5wtRKBLLQ4dwLn4Qzo7zli1-QhdQcJBxxorTizqAEUBCKdAmyw7DpsHCwt-oueZ--4hVaikllPAwFSICbYYPUUyrahLORHIfQR6MBsbrd_vyX2B75PFLVRaIvK3V38k7LvB-KXkDu3el0IftJif-OpUu6MkViQiBDIHVJZQqbCs5dzWNEfkzsY5PpBPCNWtRZzlzUZnSIJYjZ7DreBXu8T9YNBt6CWga8PRU"/>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[#111518] dark:text-white font-bold text-lg">Sarah Chen</h3>
                                        <p className="text-primary text-sm font-medium">Head of Product</p>
                                    </div>
                                </div>
                                {/* Team Member 3 */}
                                <div className="group flex flex-col items-center gap-4">
                                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative shadow-sm">
                                        <img alt="David Kim" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiXYfHkAerGCfQa3Zlj5csivq4R-txR9gEsWyyDCbye3M7Etx3pWBhF7eFr59YyFNzGCnr2Ofeyg65jwoDWX4WFAGFtkeczDx2d4yM_nAJ5YFsK39eQT8UuzrSYpHH8EOainp8_B3_WGf5qqX5gx3SyTyw2PjxHUi9uIwf6DIRyvtvV8BDAU0G6kZ0fVLoFFRv3V-AKdTZ71uWl5TPWPAuB127KWq4JQOXbrwnOuUcMle8mOqH_Tb2h_HvWHP9V6U72UAQWiLdAu2i"/>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[#111518] dark:text-white font-bold text-lg">David Kim</h3>
                                        <p className="text-primary text-sm font-medium">Tech Lead</p>
                                    </div>
                                </div>
                                {/* Team Member 4 */}
                                <div className="group flex flex-col items-center gap-4">
                                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative shadow-sm">
                                        <img alt="Emily Davis" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoxxXO70wn_dAkfzLDjeypfmc_yiKUJA2Q-BCbegzazQGwdKGn5Y39KIQdlUu-V6yfdI82XwaVDZyCTBfYzqKFoiYFs3iw5r7PiAfJlYG1kDdb9bIeiEfcac3MuE41fxi2M0v3jGcMtMMN-xPIS0KdECXvB5AR0Yn893ZZLZySPWfj4Cc-YIW_4U59ANzNbn63s1bys6v1OKhtvGtm6LiN9Nl42Zv_3mgyNNXdzSaj-RnY7BSrOxm_Rq6izz8HgGRzxc0uvhf0jEod"/>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[#111518] dark:text-white font-bold text-lg">Emily Davis</h3>
                                        <p className="text-primary text-sm font-medium">Customer Success</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="px-4 md:px-10 lg:px-8 pb-20 pt-10">
                            <div className="bg-primary rounded-2xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="relative z-10 flex flex-col items-center gap-6">
                                    <h2 className="text-3xl md:text-4xl font-black">Ready to Upgrade?</h2>
                                    <p className="text-white/90 text-lg max-w-2xl">Browse our extensive collection of the latest smartphones and accessories today.</p>
                                    <div className="flex gap-4 flex-wrap justify-center">
                                        <Link to="/products" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                            Browse Collection
                                        </Link>
                                        <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                                            Contact Support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-[#1a2632] border-t border-[#f0f3f4] dark:border-[#2a3b4c] py-12 px-4 md:px-10 lg:px-40">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1200px] mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="h-12 flex items-center justify-center">
                            <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
                        </div>
                        <span className="text-[#111518] dark:text-white font-bold text-lg">DIGI WORLD</span>
                    </div>
                    <div className="text-[#617989] dark:text-gray-400 text-sm">
                        © 2023 DIGI WORLD. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link className="text-[#617989] dark:text-gray-400 hover:text-primary transition-colors text-sm" to="/privacy">Privacy Policy</Link>
                        <Link className="text-[#617989] dark:text-gray-400 hover:text-primary transition-colors text-sm" to="/terms">Terms of Service</Link>
                        <Link className="text-[#617989] dark:text-gray-400 hover:text-primary transition-colors text-sm" to="/login">Admin Login</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
