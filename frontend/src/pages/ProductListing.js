import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Navbar from "../components/Navbar";
import InquiryModal from "../components/InquiryModal";
import API from "../api/api";
import { Link, useSearchParams } from 'react-router-dom';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filters
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRAM, setSelectedRAM] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

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

  // Derive unique filter options from data
  const allBrands = [...new Set(products.map(p => p.brand || "Generic"))];
  const allRAM = [...new Set(products.flatMap(p => p.ramOptions || []))];
  const allColors = [...new Set(products.flatMap(p => p.colorOptions || []))];

  // Filter Logic
  const filteredProducts = products.filter(p => {
    // Price match (dummy implementation if price is just a number)
    // const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    
    // Brand
    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand || "Generic");

    // RAM
    const matchRAM = selectedRAM.length === 0 || p.ramOptions.some(r => selectedRAM.includes(r));

    // Color
    const matchColor = selectedColors.length === 0 || p.colorOptions.some(c => selectedColors.includes(c));

    // Category (from URL)
    const matchCategory = !categoryParam || (p.category && p.category.toLowerCase() === categoryParam.toLowerCase());

    return matchBrand && matchRAM && matchColor && matchCategory; 
  });

  const toggleFilter = (state, setter, value) => {
    if (state.includes(value)) {
      setter(state.filter(item => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111518] antialiased min-h-screen flex flex-col">
       {/* Top Navigation Bar - Reused from Home or extracted Component */}
       <div className="layout-container flex w-full flex-col bg-white dark:bg-[#1a2630] border-b border-[#f0f3f4] dark:border-[#2a3640]">
        <div className="flex justify-center w-full">
          <div className="layout-content-container flex flex-col max-w-[1440px] flex-1 px-4 md:px-10">
            <header className="flex items-center justify-between whitespace-nowrap py-3">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-[#111518] dark:text-white">
                  <div className="h-16 flex items-center justify-center">
                    <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
                  </div>
                  <h2 className="text-xl font-bold leading-tight tracking-tight">DIGI WORLD</h2>
                </div>
                <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <div className="text-[#617989] flex border-none bg-[#f0f3f4] dark:bg-[#2a3640] items-center justify-center pl-4 rounded-l-lg border-r-0">
                      <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] dark:bg-[#2a3640] focus:border-none h-full placeholder:text-[#617989] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search phones..." />
                  </div>
                </label>
              </div>
              <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-[#111518] dark:text-white text-sm font-medium hover:text-primary transition-colors">Home</Link>
                    <Link to="/products" className="text-primary text-sm font-bold">Categories</Link>
                    <Link className="text-[#111518] dark:text-white text-sm font-medium hover:text-primary transition-colors" to="/about">About</Link>
                    <Link className="text-[#111518] dark:text-white text-sm font-medium hover:text-primary transition-colors" to="/contact">Contact</Link>
                </div>
                <Link to="/inquiry" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary/10 hover:bg-primary/20 transition-colors text-primary gap-2 text-sm font-bold px-4">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span className="hidden sm:inline">Inquiries</span>
                </Link>
              </div>
            </header>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex justify-center w-full flex-1 py-8 px-4 md:px-10">
        <div className="layout-content-container flex flex-col max-w-[1440px] flex-1">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 px-0 pb-4">
            <Link to="/" className="text-[#617989] text-sm font-medium leading-normal hover:underline">Home</Link>
            <span className="text-[#617989] text-sm font-medium leading-normal">/</span>
            <span className="text-[#111518] dark:text-white text-sm font-medium leading-normal">All Products</span>
          </div>

          {/* Headline */}
          <h1 className="text-[#111518] dark:text-white text-[32px] md:text-[40px] font-bold leading-tight px-0 pb-6">All Products</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-[280px] flex-shrink-0">
              <div className="bg-white dark:bg-[#1a2630] rounded-xl p-6 border border-[#e5e7eb] dark:border-[#2a3640] sticky top-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#111518] dark:text-white">Filters</h3>
                  <button 
                    onClick={() => {
                        setSelectedBrands([]);
                        setSelectedRAM([]);
                        setSelectedColors([]);
                    }}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                {/* Brand Filter */}
                <div className="mb-8 border-t border-[#f0f3f4] dark:border-[#2a3640] pt-6">
                  <h4 className="text-sm font-bold text-[#111518] dark:text-white mb-3">Brand</h4>
                  <div className="space-y-3">
                    {allBrands.map(brand => (
                         <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                             <div className="relative flex items-center">
                                 <input 
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                                    className="peer size-5 rounded border-[#dbe1e6] text-primary focus:ring-primary/20 cursor-pointer appearance-none checked:bg-primary checked:border-transparent bg-white border" type="checkbox"
                                 />
                                 <span className="material-symbols-outlined absolute text-white text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100 left-[2px] top-[2px]">check</span>
                             </div>
                             <span className="text-[#111518] dark:text-gray-300 text-sm">{brand}</span>
                         </label>
                    ))}
                  </div>
                </div>

                {/* RAM Filter */}
                <div className="mb-8 border-t border-[#f0f3f4] dark:border-[#2a3640] pt-6">
                  <h4 className="text-sm font-bold text-[#111518] dark:text-white mb-3">RAM</h4>
                  <div className="flex flex-wrap gap-2">
                    {allRAM.map(ram => (
                        <button 
                            key={ram}
                            onClick={() => toggleFilter(selectedRAM, setSelectedRAM, ram)}
                            className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${selectedRAM.includes(ram) ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-[#dbe1e6] bg-white text-[#111518] hover:border-primary hover:text-primary'}`}
                        >
                            {ram}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="border-t border-[#f0f3f4] dark:border-[#2a3640] pt-6">
                  <h4 className="text-sm font-bold text-[#111518] dark:text-white mb-3">Color</h4>
                  <div className="flex flex-wrap gap-3">
                    {allColors.map(color => (
                        <button 
                            key={color}
                            onClick={() => toggleFilter(selectedColors, setSelectedColors, color)}
                            style={{ backgroundColor: color.toLowerCase() }}
                            className={`size-8 rounded-full border border-gray-200 ${selectedColors.includes(color) ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            title={color}
                        >
                        </button>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* Product Grid Section */}
            <main className="flex-1 min-w-0">
               {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white dark:bg-[#1a2630] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3640]">
                    <p className="text-[#617989] text-sm font-medium">Showing <span className="text-[#111518] dark:text-white font-bold">{filteredProducts.length}</span> products</p>
                    <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-[#111518] dark:text-white whitespace-nowrap" htmlFor="sort">Sort by:</label>
                    <div className="relative">
                        <select className="appearance-none bg-[#f0f3f4] dark:bg-[#2a3640] border-none text-[#111518] dark:text-white text-sm rounded-lg py-2 pl-4 pr-10 focus:ring-1 focus:ring-primary cursor-pointer" id="sort">
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest Arrivals</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#617989] pointer-events-none text-[20px]">expand_more</span>
                    </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center p-12"><Spin size="large" /></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                             <div key={product._id} className="group flex flex-col bg-white dark:bg-[#1a2630] rounded-xl border border-[#e5e7eb] dark:border-[#2a3640] overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                                <Link to={`/products/${product._id}`} className="relative aspect-[4/3] bg-[#f8f9fa] dark:bg-[#131d25] p-6 flex items-center justify-center">
                                    {/* <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded">NEW</span> */}
                                    <button className="absolute top-3 right-3 text-[#617989] hover:text-red-500 transition-colors z-10" onClick={(e) => { e.preventDefault(); /* Logic for fav */ }}>
                                        <span className="material-symbols-outlined">favorite</span>
                                    </button>
                                    <img 
                                        alt={product.name} 
                                        className="h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                                        src={product.image || "https://via.placeholder.com/300"} 
                                    />
                                </Link>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <Link to={`/products/${product._id}`} className="text-lg font-bold text-[#111518] dark:text-white leading-tight group-hover:text-primary transition-colors">{product.name}</Link>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4 text-xs text-[#617989] font-medium">
                                        {/* Display some specs if available */}
                                        {product.ramOptions?.[0] && (
                                             <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">memory</span> {product.ramOptions[0]}</span>
                                        )}
                                        {product.storageOptions?.[0] && (
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">sd_storage</span> {product.storageOptions[0]}</span>
                                        )}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-[#f0f3f4] dark:border-[#2a3640] flex items-center justify-between">
                                        <span className="text-xl font-bold text-primary">${product.price}</span>
                                        <div className="flex gap-2">
                                            <Link to={`/products/${product._id}`} className="size-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </Link>
                                            <Link 
                                                to={`/inquiry?id=${product._id}`}
                                                className="h-9 px-3 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors"
                                            >
                                                Inquire
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        ))}
                    </div>
                )}
                
                {/* Pagination (Static for now) */}
                <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                        <button className="size-10 flex items-center justify-center rounded-lg border border-[#dbe1e6] bg-white text-[#111518] hover:bg-[#f0f3f4] transition-colors disabled:opacity-50" disabled="">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30">1</button>
                        <button className="size-10 flex items-center justify-center rounded-lg border border-[#dbe1e6] bg-white text-[#111518] hover:border-primary hover:text-primary transition-colors">2</button>
                        <button className="size-10 flex items-center justify-center rounded-lg border border-[#dbe1e6] bg-white text-[#111518] hover:border-primary hover:text-primary transition-colors">3</button>
                        <span className="px-2 text-[#617989]">...</span>
                        <button className="size-10 flex items-center justify-center rounded-lg border border-[#dbe1e6] bg-white text-[#111518] hover:bg-[#f0f3f4] transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </main>
          </div>
        </div>
      </div>

       {/* Footer */}
       <footer className="bg-white dark:bg-[#1a2630] border-t border-[#f0f3f4] dark:border-[#2a3640] py-12 px-10">
        <div className="layout-content-container max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 text-[#111518] dark:text-white">
                <div className="h-12 flex items-center justify-center">
                    <img src="/digiworld_logo.png" alt="DIGI WORLD" className="h-full object-contain" />
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-tight">DIGI WORLD</h2>
            </div>
            <div className="text-[#617989] text-sm font-medium">
                © 2024 DIGI WORLD. All rights reserved.
            </div>
        </div>
      </footer>
     
      {selectedProduct && (
        <InquiryModal visible={!!selectedProduct} onClose={handleCloseModal} product={selectedProduct} />
      )}
    </div>
  );
};

export default ProductListing;
