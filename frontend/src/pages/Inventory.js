import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { message } from "antd";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem("adminToken");
    if (!token) {
        navigate("/login");
        return;
    }

    fetchProducts();
  }, [navigate]);

  const fetchProducts = () => {
    setLoading(true);
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
          console.error(err);
          message.error("Failed to fetch inventory");
          setLoading(false);
      });
  };

  const handleStockUpdate = (id, newStock) => {
      if(newStock < 0) return;
      
      // Optimistic update
      const updatedProducts = products.map(p => p._id === id ? {...p, stock: newStock} : p);
      setProducts(updatedProducts);

      // In a real app, you'd call API to update stock here
      // API.patch(`/products/${id}`, { stock: newStock })...
  };

  const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to delete this product?")) {
          // Optimistic update
          setProducts(products.filter(p => p._id !== id));
          // API.delete(`/products/${id}`)...
          message.success("Product deleted");
      }
  };

  // Stats
  const totalProducts = products.length;
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const lowStockCount = products.filter(p => p.stock < 5).length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111518] antialiased overflow-hidden h-screen flex">
      {/* Sidebar Navigation - Reused for consistency */}
      <aside className="flex w-64 flex-col border-r border-[#dbe1e6] bg-white dark:bg-[#1a2632] h-full shrink-0 z-20 transition-all duration-300">
        <div className="flex h-full flex-col justify-between p-4">
            <div className="flex flex-col gap-6">
                {/* Branding */}
                <div className="flex gap-3 items-center px-2">
                    <div className="bg-primary/10 rounded-xl p-2">
                        <span className="material-symbols-outlined text-primary text-3xl">smartphone</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[#111518] dark:text-white text-lg font-bold leading-tight tracking-tight">DIGI WORLD</h1>
                        <p className="text-[#617989] text-xs font-normal leading-normal">Admin Console</p>
                    </div>
                </div>
                {/* Nav Items */}
                <nav className="flex flex-col gap-2">
                    <Link className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors" to="/admin">
                        <span className="material-symbols-outlined text-[#617989]">dashboard</span>
                        <p className="text-[#617989] dark:text-gray-400 text-sm font-medium leading-normal">Dashboard</p>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#f0f3f4] dark:bg-primary/20 group cursor-pointer transition-colors" to="/admin/inventory">
                        <span className="material-symbols-outlined text-[#111518] dark:text-primary">inventory_2</span>
                        <p className="text-[#111518] dark:text-white text-sm font-bold leading-normal">Inventory</p>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors" onClick={() => message.info("Inquiries page coming soon")}>
                        <span className="material-symbols-outlined text-[#617989]">chat_bubble</span>
                        <p className="text-[#617989] dark:text-gray-400 text-sm font-medium leading-normal">Inquiries</p>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors" onClick={() => message.info("Orders page coming soon")}>
                        <span className="material-symbols-outlined text-[#617989]">shopping_cart</span>
                        <p className="text-[#617989] dark:text-gray-400 text-sm font-medium leading-normal">Orders</p>
                    </button>
                </nav>
            </div>
            {/* Bottom Settings */}
            <div className="flex flex-col gap-2 border-t border-[#dbe1e6] pt-4">
                 <div className="flex items-center gap-3 px-3 py-2 mt-2">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqROzRNAqkf3vLYohY2ffyzZl3be8YTgHdvbYXZRjV2s7HsjxkZP5h17ODWo9Ap_jfcOI3IQ56rVr0M7lPVlKNJ7fZaY5dnfPUe-0Kt-0eEx76Qy0i5X5YVZq6dJ2qPSywI7jUJ946UP-nH_ZIDs76j5zj-XcF2YTiQ3bkTyBykKujBQKR5_LzItHx_wq_dtf_6Ofrqw7u44nM5Ey6rdoRMawgPF5naXyygWmY7CvUh2KAoXtPcOgwLRXPxNRNqskBgKGca_jnRifE")'}}></div>
                    <div className="flex flex-col">
                        <p className="text-[#111518] dark:text-white text-sm font-medium leading-tight">Alex Johnson</p>
                        <p className="text-[#617989] text-xs font-normal leading-normal">Store Manager</p>
                    </div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        {/* Top Header */}
        <header className="bg-white dark:bg-[#1a2632] border-b border-[#dbe1e6] px-8 py-5 flex justify-between items-center shrink-0">
            <div>
                <h2 className="text-[#111518] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Inventory Dashboard</h2>
                <p className="text-[#617989] text-base font-normal mt-1">Manage Digi World's products and stock levels</p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center justify-center size-10 rounded-full bg-[#f0f3f4] hover:bg-gray-200 transition-colors text-[#111518]">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Products */}
                    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2632] border border-[#dbe1e6] shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                                <span className="material-symbols-outlined">devices</span>
                            </div>
                            <span className="text-[#078838] bg-green-50 px-2 py-1 rounded text-xs font-bold leading-normal">+12%</span>
                        </div>
                        <div className="mt-2">
                            <p className="text-[#617989] text-sm font-medium leading-normal">Total Products</p>
                            <p className="text-[#111518] dark:text-white tracking-tight text-3xl font-bold leading-tight">{loading ? '...' : totalProducts}</p>
                        </div>
                    </div>
                    {/* Total Value */}
                    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2632] border border-[#dbe1e6] shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <span className="text-[#078838] bg-green-50 px-2 py-1 rounded text-xs font-bold leading-normal">+5%</span>
                        </div>
                        <div className="mt-2">
                            <p className="text-[#617989] text-sm font-medium leading-normal">Total Inventory Value</p>
                            <p className="text-[#111518] dark:text-white tracking-tight text-3xl font-bold leading-tight">${loading ? '...' : totalValue.toLocaleString()}</p>
                        </div>
                    </div>
                    {/* Low Stock Alert */}
                    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2632] border border-red-200 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-5">
                            <span className="material-symbols-outlined text-8xl text-red-600">warning</span>
                        </div>
                        <div className="flex justify-between items-start z-10">
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600">
                                <span className="material-symbols-outlined">priority_high</span>
                            </div>
                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold leading-normal">Action Needed</span>
                        </div>
                        <div className="mt-2 z-10">
                            <p className="text-[#617989] text-sm font-medium leading-normal">Low Stock Items</p>
                            <p className="text-[#111518] dark:text-white tracking-tight text-3xl font-bold leading-tight">{loading ? '...' : lowStockCount}</p>
                        </div>
                    </div>
                </div>

                {/* Alert Banner */}
                {lowStockCount > 0 && (
                     <div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-4 rounded-r shadow-sm flex justify-between items-center" role="alert">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined">warning</span>
                            <p className="font-medium">Warning: {lowStockCount} products have reached critical stock levels.</p>
                        </div>
                        <button className="text-sm font-bold underline hover:text-orange-900">View Items</button>
                    </div>
                )}

                {/* Actions Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-[#dbe1e6] shadow-sm">
                    <div className="flex flex-1 w-full gap-3">
                        <div className="relative flex-1 max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                            <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#dbe1e6] bg-[#f6f7f8] focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium placeholder:text-gray-400" placeholder="Search by name, SKU or brand..." type="text"/>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md shadow-blue-200 dark:shadow-none w-full md:w-auto">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span>Add New Product</span>
                    </button>
                </div>

                {/* Inventory Table */}
                <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe1e6] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f9fafb] dark:bg-[#2c3b49] border-b border-[#dbe1e6]">
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#617989]">Product</th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#617989]">Category</th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#617989]">Stock Level</th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#617989]">Price</th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#617989]">Status</th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#617989] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#dbe1e6]">
                                {products.map(product => (
                                    <tr key={product._id} className={`group hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors ${product.stock === 0 ? 'opacity-70' : product.stock < 5 ? 'bg-red-50/30' : ''}`}>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                                    <img 
                                                        alt={product.name} 
                                                        className={`w-full h-full object-cover ${product.stock === 0 ? 'grayscale' : ''}`} 
                                                        src={product.image || "https://via.placeholder.com/100"} 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#111518] dark:text-white">{product.name}</p>
                                                    <p className="text-xs text-[#617989]">{product.colorOptions?.[0]}, {product.storageOptions?.[0]}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-[#111518] dark:text-gray-300">{product.category}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleStockUpdate(product._id, product.stock - 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded border border-[#dbe1e6] hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 disabled:opacity-50"
                                                    disabled={product.stock <= 0}
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">remove</span>
                                                </button>
                                                <span className={`w-8 text-center font-bold text-sm ${product.stock < 5 ? 'text-red-600' : ''}`}>{product.stock}</span>
                                                <button 
                                                    onClick={() => handleStockUpdate(product._id, product.stock + 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded border border-[#dbe1e6] hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-bold text-[#111518] dark:text-white">${product.price}</td>
                                        <td className="py-4 px-6">
                                            {product.stock === 0 ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                    Out of Stock
                                                </span>
                                            ) : product.stock < 5 ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 animate-pulse">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                                                    Low Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                                    In Stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-blue-50">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
