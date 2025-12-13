import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spin } from "antd";
import Navbar from "../components/Navbar";
import InquiryModal from "../components/InquiryModal";
import API from "../api/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Selected Options
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        // Set defaults from product data if available
        if (res.data?.colorOptions?.length > 0) setSelectedColor(res.data.colorOptions[0]);
        if (res.data?.storageOptions?.length > 0) setSelectedStorage(res.data.storageOptions[0]);
        if (res.data?.ramOptions?.length > 0) setSelectedRAM(res.data.ramOptions[0]);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen text-xl">Product not found</div>;
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#111518] dark:text-white antialiased">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* TopNavBar - Reusing Navbar if possible or keeping static as per design */}
         {/* <Navbar />  Using specific header from design request below, or we could reuse Navbar component if consistent */}
         <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] dark:border-gray-800 bg-white dark:bg-[#111a22] px-4 md:px-10 py-3 shadow-sm">
            <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4">
            <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
            </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">DIGI WORLD</h2>
            </div>
            <div className="hidden lg:flex items-center gap-6">
            <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-sm font-medium leading-normal hover:text-primary transition-colors" to="/products">All Products</Link>
            <a className="text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Support</a>
            <a className="text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Contact</a>
            </div>
            </div>
            <div className="flex flex-1 justify-end gap-4 md:gap-8">
            <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#617989] flex border-none bg-[#f0f3f4] dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
            <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] dark:bg-gray-800 focus:border-none h-full placeholder:text-[#617989] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search products..." />
            </div>
            </label>
            <div className="flex items-center gap-2">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
            <span className="truncate">Login</span>
            </button>
            </div>
            </div>
        </header>

        <div className="flex flex-1 justify-center py-6 px-4 md:px-10 lg:px-20">
          <div className="flex flex-col max-w-[1200px] flex-1 w-full gap-8">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#617989] dark:text-gray-400">
              <Link className="hover:text-primary" to="/">Home</Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <Link className="hover:text-primary" to="/products">Products</Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-[#111518] dark:text-white font-medium">{product.name}</span>
            </div>

            {/* Main Product Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left: Image Gallery */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm group">
                  {/* Main Image */}
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" 
                    src={product.image || "https://via.placeholder.com/600"} 
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    In Stock
                  </div>
                </div>
                {/* Thumbnails (Static for now as API might not provide multiple images) */}
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3].map((_, i) => (
                        <button key={i} className={`aspect-square rounded-lg border overflow-hidden p-2 bg-white dark:bg-gray-800 transition-colors ${i === 0 ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}>
                             <img alt={`Thumbnail ${i}`} className="w-full h-full object-contain" src={product.image || "https://via.placeholder.com/150"} />
                        </button>
                    ))}
                  <button className="aspect-square rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-600 overflow-hidden p-2 bg-white dark:bg-gray-800 transition-colors flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <span className="material-symbols-outlined text-gray-400 text-3xl">play_circle</span>
                  </button>
                </div>
              </div>

              {/* Right: Product Details & Configurator */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">New Release</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#111518] dark:text-white leading-tight mb-2">{product.name}</h1>
                  {/* Ratings */}
                  <div className="flex items-center gap-1 mb-4">
                     {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-yellow-400 text-[20px] fill-current">star</span>)}
                     <span className="text-sm text-gray-500 ml-2">(124 Reviews)</span>
                  </div>
                  <div className="flex items-end gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                    <span className="text-3xl font-bold text-primary">${product.price}</span>
                    {/* Fake original price for effect */}
                    <span className="text-lg text-gray-400 line-through mb-1">${(product.price * 1.1).toFixed(2)}</span> 
                  </div>

                  {/* Configurator */}
                  <div className="space-y-6">
                    {/* Color Selection */}
                    {product.colorOptions?.length > 0 && (
                        <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Select Finish: <span className="font-normal text-gray-500">{selectedColor}</span></label>
                        <div className="flex items-center gap-3">
                            {product.colorOptions.map(color => (
                                <button 
                                    key={color} 
                                    aria-label={color} 
                                    onClick={() => setSelectedColor(color)}
                                    style={{backgroundColor: color.toLowerCase()}}
                                    className={`size-10 rounded-full border border-gray-200 focus:outline-none transition-all ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                ></button>
                            ))}
                        </div>
                        </div>
                    )}
                    
                    {/* Storage Selection */}
                     {product.storageOptions?.length > 0 && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Choose Storage</label>
                            <div className="grid grid-cols-3 gap-3">
                                {product.storageOptions.map(storage => (
                                    <button 
                                        key={storage}
                                        onClick={() => setSelectedStorage(storage)}
                                        className={`py-3 px-4 rounded-lg border text-center transition-all ${selectedStorage === storage ? 'border-2 border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-gray-700 hover:border-primary bg-white dark:bg-gray-800'}`}
                                    >
                                        <span className="block text-sm font-bold">{storage}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                     )}

                    {/* RAM Selection */}
                    {product.ramOptions?.length > 0 && (
                         <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Memory (RAM)</label>
                            <div className="flex gap-3">
                                {product.ramOptions.map(ram => (
                                    <button 
                                        key={ram}
                                        onClick={() => setSelectedRAM(ram)}
                                        className={`py-2 px-6 rounded-lg border text-center transition-all ${selectedRAM === ram ? 'border-2 border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-gray-700 hover:border-primary bg-white dark:bg-gray-800'}`}
                                    >
                                        <span className="block text-sm font-bold">{ram}</span>
                                    </button>
                                ))}
                            </div>
                         </div>
                    )}
                   

                    {/* Accessories Bundle */}
                    <div className="bg-blue-50 dark:bg-gray-800/50 p-4 rounded-xl border border-blue-100 dark:border-gray-700">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">layers</span>
                        Add Accessories
                      </h3>
                      <div className="space-y-3">
                        {/* Accessory Item 1 */}
                        <div className="flex items-center justify-between gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <input className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" type="checkbox" />
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">20W USB-C Power Adapter</p>
                              <p className="text-gray-500 text-xs">+$19.00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex gap-4">
                      <Link 
                        to={`/inquiry?id=${product._id}`}
                        className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined">mail</span>
                        Send Inquiry
                      </Link>
                      <button className="size-14 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all bg-white dark:bg-gray-800">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">Inquiries are typically answered within 2 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tabs: Specs & Info */}
            <div className="mt-10">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav aria-label="Tabs" className="-mb-px flex space-x-8 overflow-x-auto">
                  <button className="border-primary text-primary whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Specifications</button>
                  <button className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Description</button>
                  <button className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium">Reviews (124)</button>
                </nav>
              </div>
              <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-lg font-bold mb-4">Technical Details</h3>
                  <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                    <div className="px-0 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-500">Category</dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{product.category}</dd>
                    </div>
                     {product.brand && (
                        <div className="px-0 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-500">Brand</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{product.brand}</dd>
                        </div>
                     )}
                     <div className="px-0 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">{product.description}</dd>
                     </div>
                  </dl>
                </div>
                <div className="bg-blue-50 dark:bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Admin Note</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Stock levels are fluctuating due to high demand. Please ensure you confirm color availability via the inquiry form before promising delivery dates to customers.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-sm">info</span>
                    <span>Only visible to logged in staff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isInquiryModalOpen && (
            <InquiryModal 
                visible={isInquiryModalOpen} 
                onClose={() => setIsInquiryModalOpen(false)} 
                product={{
                    ...product,
                    selectedColor,
                    selectedStorage,
                    selectedRAM
                }} 
            />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
