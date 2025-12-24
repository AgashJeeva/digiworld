import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import API from "../api/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInquiry = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  // Fetch featured products (limit to first 8 for home page)
  const featuredProducts = products.filter(p => p.category === "Mobile" || p.price > 800).slice(0, 8);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111518] dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
      {/* TopNavBar */}
      <div className="flex flex-col w-full bg-white dark:bg-[#111518] border-b border-[#f0f3f4] dark:border-[#222]">
        <header className="flex flex-col lg:flex-row items-center justify-between whitespace-nowrap px-4 lg:px-10 py-3 gap-4 lg:gap-0 max-w-[1440px] mx-auto w-full">
          <div className="flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-4 text-[#111518] dark:text-white">
              <div className="h-16 flex items-center justify-center">
                <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
              </div>
              <h2 className="text-[#111518] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">DIGI WORLD</h2>
            </div>
            {/* Mobile Menu Button */}
            <button className="lg:hidden flex items-center justify-center text-[#111518] dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
          {/* Search Bar */}
          <label className="flex flex-col min-w-40 !h-10 max-w-64 lg:mx-auto w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#617989] flex border-none bg-[#f0f3f4] dark:bg-[#2a343d] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] dark:bg-[#2a343d] focus:border-none h-full placeholder:text-[#617989] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search products..." />
            </div>
          </label>
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <div className="flex items-center gap-9">
              <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/">Home</Link>
              <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/products">Shop</Link>
              <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/about">About</Link>
              <Link className="text-[#111518] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/contact">Contact</Link>
            </div>
            <div className="flex gap-2">
              <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log In</span>
              </Link>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f3f4] dark:bg-[#2a343d] text-[#111518] dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => alert("Cart feature coming soon!")}>
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </button>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f3f4] dark:bg-[#2a343d] text-[#111518] dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => alert("Profile feature coming soon!")}>
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 lg:px-8">
          
          {/* HeroSection */}
          <div className="@container mb-12">
            <div className="flex flex-col gap-6 py-4 @[480px]:gap-8 @[864px]:flex-row items-center">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl @[480px]:h-auto @[480px]:min-w-[400px] @[864px]:w-1/2 shadow-lg" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzGFNkDhTjCZ67LsxZt9X9w7mtU62frtL56R73tdO-rcGEc5rU4R85z3SzlfNQssaMqHIQChecAnXSU86bybZB3sRa9L0PRMQXtxvetrCibFdew18J_thKVUo8Ai5xDCAAX_n3-J3xnG40QzJZpClkCK3kBT24wdyNRQcYXwORtJQks1BLcuOGVnC9PXckHyOLonvyHP3WGzrEiZaqD91_rs51g_F0egyHq-vnPKmRQRyBK015JPenG7eK4q7XmBS02qtvzWzih0HW")'}}
              >
              </div>
              <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center @[864px]:w-1/2 p-4">
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-primary font-bold tracking-wider uppercase text-sm">New Release</span>
                  <h1 className="text-[#111518] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Experience the Future Today
                  </h1>
                  <h2 className="text-[#617989] dark:text-gray-300 text-sm font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed mt-2">
                    The new Galaxy S24 Ultra is here. Upgrade your world with cutting-edge AI technology and titanium durability.
                  </h2>
                </div>
                <div className="flex gap-4">
                  <Link to="/products" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md">
                    <span className="truncate">Shop Now</span>
                  </Link>
                  <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white dark:bg-[#2a343d] border border-[#e5e7eb] dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#333] transition-colors text-[#111518] dark:text-white text-base font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Learn More</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Header */}
          <div className="flex flex-col gap-2 pb-6 pt-2">
            <h2 className="text-[#111518] dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em]">Browse Categories</h2>
            <p className="text-[#617989] dark:text-gray-400">Find exactly what you're looking for</p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
            <Link to="/products?category=Mobile" className="group flex flex-col gap-3 pb-3 cursor-pointer">
              <div 
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1 relative" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPJuoAGfKSsljzjPzjTCxVUo0PRCwqq5hDuY-bLAMBvOC24w2aT5LHqfAKDs924xsRPdkYkckll2skBbwSKir6kmbNRUHXo74Dkc9r4lnZuMfyfjYRmS9hs4XaElT97Dvp2z875jr7HbSkXXSdaOCL-hPSlyKJLgxHgPg8LNBGXYuNy3GCOIbUUUPAwHHhES7I7QQliv4cbEFui2PFN8uipCjHCq4ExHKpZbA0ZQdM0cHYkzB7nrWJnCl2F3TLUc1uVzbftmtbtrU7")'}}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div>
                <p className="text-[#111518] dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">Mobile Phones</p>
                <p className="text-[#617989] dark:text-gray-400 text-sm font-normal leading-normal">Latest Smartphones</p>
              </div>
            </Link>
            <Link to="/products?category=Laptop" className="group flex flex-col gap-3 pb-3 cursor-pointer">
              <div 
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1 relative" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5gClEo61k96IBII_nMGo0__8cm6nBmz8mzkdPlT6sU2VIoTGRnS2U6usnt3HImeDbShTHY4pLafum_NOBQ-bXS9uYOI6osZws_YFGldf2ytMTci_W0ECJoNsI0oT-4J_1r50i-tAuwUvIzQ-nNGSev6xPTHrIEbMQ4jL3bgtgI4xmXKpo0pGCpYZYGOiWKZMowDCVeB2yIZTGol065njQtoAnIHNv0vZd1l6E-B-Ms6qyjQ1CotvfuEdCg9rLNCj1ZoNo1O0xQysG")'}}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div>
                <p className="text-[#111518] dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">Laptops</p>
                <p className="text-[#617989] dark:text-gray-400 text-sm font-normal leading-normal">High Performance</p>
              </div>
            </Link>
            <Link to="/products?category=Tablet" className="group flex flex-col gap-3 pb-3 cursor-pointer">
              <div 
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1 relative" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvGcS-OWECmJCBN6EGSXvYVBeQUmtB4P-aKSRtCXlN0tUhL6eLcUoW3JzvNbydcwlVTPXhuDL4cqkrjYPWXPZ-oMv40vfPJahYR2AWb-_4RO94dIu0ROdvhnBKzJkYqJ9E-P6vIQgir4g0sKKEr3VubvBsOHovrOtaOP4aD7UQPWidHE9Fu2QMZ9S2yC6h6k11LNkxC6IDhNp48y0thMskNE-zFAi4TkcbBObviAuJwSYyPU_OBLYTIRgGhmKt7MJHkMOqWo_RpbF5")'}}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div>
                <p className="text-[#111518] dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">Tablets</p>
                <p className="text-[#617989] dark:text-gray-400 text-sm font-normal leading-normal">Portable Power</p>
              </div>
            </Link>
            <Link to="/products?category=Accessory" className="group flex flex-col gap-3 pb-3 cursor-pointer">
              <div 
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1 relative" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpx_36iqS_gaDYlqWmpM9caJnIxOQaV9g4oFwZTGMxL_kpWK10wbuF-oSGlrvxYj1aK-8PxJkXqpEBGZdHZGdFXVqd4PAqY1murnnxVD0Jdk5Y8-0vwvRQppuhdE2SLxhPIjz1krP-2OISZ5PBg0zhzeKEH1791Z48C8IVhfQqF0taKsJiPP64qjKG_kgeayG_HnyJyYw8xSeLVY4H6_a-6Ih53nc1Ctfs-VibSIjlyhlX_sucgszov5sNex9rdfHm4t3rU32kMkCH")'}}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div>
                <p className="text-[#111518] dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">Accessories</p>
                <p className="text-[#617989] dark:text-gray-400 text-sm font-normal leading-normal">Essentials</p>
              </div>
            </Link>
          </div>

          {/* Special Offer Banner */}
          <div className="w-full rounded-2xl bg-primary/10 dark:bg-primary/20 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-lg">
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider w-fit">Limited Time</span>
              <h2 className="text-[#111518] dark:text-white text-3xl md:text-4xl font-bold leading-tight">Trade-in Offer</h2>
              <p className="text-[#617989] dark:text-gray-200 text-lg">Get up to <span className="font-bold text-primary dark:text-primary-light">$500 off</span> when you trade in your old device for a new flagship phone.</p>
            </div>
            <div className="shrink-0">
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary hover:bg-primary/90 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg">
                Start Trade-in
              </button>
            </div>
          </div>

          {/* Featured Products Header */}
          <div className="flex items-center justify-between px-2 pb-6 pt-2">
            <h2 className="text-[#111518] dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em]">Featured Products</h2>
            <Link className="text-primary font-bold hover:underline flex items-center gap-1" to="/products">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
          </div>

          {/* Featured Products Grid */}
          {loading ? (
             <div className="flex justify-center p-12"><Spin size="large" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
              {featuredProducts.map((product) => (
                <div key={product._id} className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden border border-[#f0f3f4] dark:border-[#333] hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-[#f8fafc] dark:bg-[#111518] relative group">
                    <Link to={`/products/${product._id}`} 
                      className="block w-full h-full bg-center bg-no-repeat bg-contain p-4" 
                      style={{backgroundImage: `url("${product.image || 'https://via.placeholder.com/300'}")`}}
                    ></Link>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white dark:bg-[#2a343d] p-2 rounded-full shadow-md text-gray-500 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <Link to={`/products/${product._id}`} className="text-[#111518] dark:text-white font-bold text-lg leading-tight truncate hover:text-primary">{product.name}</Link>
                    <p className="text-[#617989] dark:text-gray-400 text-sm truncate">{product.description || product.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#111518] dark:text-white font-bold text-xl">${product.price}</span>
                      <Link 
                        to={`/inquiry?id=${product._id}`}
                        className="flex items-center justify-center rounded-lg h-9 px-3 bg-primary/10 hover:bg-primary hover:text-white text-primary transition-all font-bold text-sm"
                      >
                        <span className="material-symbols-outlined text-[18px] mr-1">add</span> Add
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inquiry / Newsletter Section */}
          <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-[#1a2632] rounded-xl p-8 border border-[#f0f3f4] dark:border-[#333] mb-12">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-3xl">mail</span>
                <h3 className="text-xl font-bold">Have questions?</h3>
              </div>
              <p className="text-[#617989] dark:text-gray-300">Not sure which device is right for you? Send us an inquiry and our experts will help you decide.</p>
            </div>
            <div className="flex-1 w-full">
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <input className="flex-1 bg-[#f0f3f4] dark:bg-[#2a343d] border-none rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary placeholder:text-[#617989] dark:text-white" placeholder="Your Email Address" type="email"/>
                  <button className="h-12 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">Subscribe</button>
                </div>
                <p className="text-xs text-[#617989] dark:text-gray-500">By subscribing you agree to our Terms & Conditions and Privacy Policy.</p>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#111518] border-t border-[#f0f3f4] dark:border-[#222] py-12">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#111518] dark:text-white">
              <div className="h-12 flex items-center justify-center">
                <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl">DIGI WORLD</h3>
            </div>
            <p className="text-[#617989] dark:text-gray-400 text-sm">Your one-stop destination for the latest in mobile technology, computing, and accessories.</p>
            <div className="flex gap-4 mt-2">
              <button className="text-[#617989] hover:text-primary transition-colors"><span className="material-symbols-outlined">public</span></button>
              <button className="text-[#617989] hover:text-primary transition-colors"><span className="material-symbols-outlined">photo_camera</span></button>
              <button className="text-[#617989] hover:text-primary transition-colors"><span className="material-symbols-outlined">alternate_email</span></button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#111518] dark:text-white">Shop</h4>
            <div className="flex flex-col gap-2 text-sm text-[#617989] dark:text-gray-400">
              <Link className="hover:text-primary" to="/products?category=Mobile">Mobile Phones</Link>
              <Link className="hover:text-primary" to="/products?category=Laptop">Laptops</Link>
              <Link className="hover:text-primary" to="/products?category=Tablet">Tablets</Link>
              <Link className="hover:text-primary" to="/products?category=Accessory">Accessories</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#111518] dark:text-white">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-[#617989] dark:text-gray-400">
              <Link className="hover:text-primary" to="/contact">Contact Us</Link>
              <Link className="hover:text-primary" to="/shipping">Shipping Policy</Link>
              <Link className="hover:text-primary" to="/returns">Returns & Exchanges</Link>
              <Link className="hover:text-primary" to="/faq">FAQs</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#111518] dark:text-white">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-[#617989] dark:text-gray-400">
              <div className="flex gap-2 items-center">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>16/6, Huskison Road, Trincomalee.</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="material-symbols-outlined text-sm">phone</span>
                <span>+94 76 575 1275</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>digiworldtrinco@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-[#f0f3f4] dark:border-[#222] flex flex-col md:flex-row justify-between items-center text-sm text-[#617989] dark:text-gray-500">
          <p>© 2023 Digi World. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
              <Link className="hover:text-primary" to="/privacy">Privacy Policy</Link>
              <Link className="hover:text-primary" to="/terms">Terms of Service</Link>
            <Link className="text-primary/70 hover:text-primary flex items-center gap-1 font-medium" to="/login"><span className="material-symbols-outlined text-sm">admin_panel_settings</span> Admin Login</Link>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default Home;
