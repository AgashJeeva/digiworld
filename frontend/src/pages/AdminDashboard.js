import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { message } from "antd";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Stats (Mocked or derived)
    const [stats, setStats] = useState({
        totalProducts: 0,
        pendingInquiries: 8, // Mock
        lowStock: 0,
        todaysSales: 1240 // Mock
    });

    useEffect(() => {
        // Auth check (basic)
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/login");
            return;
        }

        API.get("/products")
            .then((res) => {
                setProducts(res.data);
                
                // Calculate stats
                const lowStockCount = res.data.filter(p => p.stock < 5).length;
                setStats(prev => ({
                    ...prev,
                    totalProducts: res.data.length,
                    lowStock: lowStockCount
                }));

                setLoading(false);
            })
            .catch(() => {
                message.error("Failed to load products");
                setLoading(false);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111518] dark:text-white h-screen overflow-hidden flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white dark:bg-[#1a2632] border-r border-[#dbe1e6] dark:border-gray-700 flex flex-col h-full flex-shrink-0 transition-all duration-300">
                {/* Brand / Header */}
                <div className="p-6 border-b border-[#dbe1e6] dark:border-gray-700 flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                        <span className="material-symbols-outlined text-primary text-2xl">smartphone</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold tracking-tight text-[#111518] dark:text-white">DIGI WORLD</h1>
                        <p className="text-[#617989] dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Admin Console</p>
                    </div>
                </div>
                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:text-primary transition-colors" to="/admin">
                        <span className="material-symbols-outlined fill">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#617989] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#111518] dark:hover:text-white transition-colors" to="/admin/inventory">
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span className="text-sm font-medium">Inventory</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#617989] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#111518] dark:hover:text-white transition-colors" onClick={() => message.info("Inquiries page coming soon")}>
                        <div className="relative">
                            <span className="material-symbols-outlined">chat</span>
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                        </div>
                        <span className="text-sm font-medium">Inquiries</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#617989] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#111518] dark:hover:text-white transition-colors" onClick={() => message.info("User management coming soon")}>
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-sm font-medium">Users</span>
                    </button>
                    <div className="mt-auto pt-4 border-t border-[#dbe1e6] dark:border-gray-700">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#617989] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#111518] dark:hover:text-white transition-colors" onClick={() => message.info("Settings coming soon")}>
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </button>
                    </div>
                </nav>
                {/* Admin Profile Snippet */}
                <div className="p-4 border-t border-[#dbe1e6] dark:border-gray-700 bg-gray-50 dark:bg-[#15202b]">
                    <div className="flex items-center gap-3">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-white dark:border-gray-600 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMpzfgUWM5Myx1zqC4Xyu2MwzuWPxqEtq_yZQNUm8QnmkLIUavc_KhlwGikfh3ahrKQupxviC9vYitQGNmU3TuT_gTSEe7RqIP7WEWa_ZsYcAbZWC77rBVcgfcCNTJ-_J9A9_mlfZmbc7ORDDnoj933C1I4JnHBhtj69CSB7yQHbar7kYKm7_NDEWnegH9h0erSSgNICQ0q9wdHNTScAFmZOKxYwbx4HtPS2AKX9goFib19Qzx_r1GF2wfRxun5x0ynKvhhcNK5oyn")' }}></div>
                        <div className="flex flex-col min-w-0">
                            <p className="text-[#111518] dark:text-white text-sm font-bold truncate">Alex Johnson</p>
                            <p className="text-[#617989] dark:text-gray-400 text-xs truncate">admin@digiworld.com</p>
                        </div>
                        <button onClick={handleLogout} className="ml-auto text-[#617989] hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
                {/* Header */}
                <header className="bg-white dark:bg-[#1a2632] border-b border-[#dbe1e6] dark:border-gray-700 py-4 px-8 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="text-[#111518] dark:text-white text-2xl font-bold leading-tight">Dashboard Overview</h2>
                        <p className="text-[#617989] dark:text-gray-400 text-sm mt-1">Welcome back, Admin. Here is the latest status of your shop.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                            <input className="pl-10 pr-4 py-2 bg-[#f0f3f4] dark:bg-gray-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-64 text-[#111518] dark:text-white" placeholder="Search..." type="text" />
                        </div>
                        <button className="bg-white dark:bg-gray-800 p-2 rounded-full border border-[#dbe1e6] dark:border-gray-600 relative text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        </button>
                    </div>
                </header>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                        {/* KPI Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Stat 1 */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-5 border border-[#dbe1e6] dark:border-gray-700 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-primary">smartphone</span>
                                </div>
                                <p className="text-[#617989] dark:text-gray-400 text-sm font-medium">Total Products</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-[#111518] dark:text-white text-3xl font-bold">{loading ? "..." : stats.totalProducts}</h3>
                                    <span className="text-green-600 text-xs font-medium flex items-center bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                                        <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> +12%
                                    </span>
                                </div>
                            </div>
                            {/* Stat 2 */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-5 border border-[#dbe1e6] dark:border-gray-700 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-yellow-500">mark_chat_unread</span>
                                </div>
                                <p className="text-[#617989] dark:text-gray-400 text-sm font-medium">Pending Inquiries</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-[#111518] dark:text-white text-3xl font-bold">{stats.pendingInquiries}</h3>
                                    <span className="text-yellow-600 text-xs font-medium flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded">
                                        Needs Action
                                    </span>
                                </div>
                            </div>
                            {/* Stat 3 */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-5 border border-[#dbe1e6] dark:border-gray-700 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-red-500">warning</span>
                                </div>
                                <p className="text-[#617989] dark:text-gray-400 text-sm font-medium">Low Stock Items</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-[#111518] dark:text-white text-3xl font-bold">{stats.lowStock}</h3>
                                    <span className="text-red-600 text-xs font-medium flex items-center bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded">
                                        Restock Now
                                    </span>
                                </div>
                            </div>
                            {/* Stat 4 */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-5 border border-[#dbe1e6] dark:border-gray-700 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-green-500">attach_money</span>
                                </div>
                                <p className="text-[#617989] dark:text-gray-400 text-sm font-medium">Today's Sales</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-[#111518] dark:text-white text-3xl font-bold">${stats.todaysSales}</h3>
                                    <span className="text-green-600 text-xs font-medium flex items-center bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                                        <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> +5%
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Main Grid: Recent Inquiries & Inventory Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Inquiries Table */}
                            <div className="lg:col-span-2 bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe1e6] dark:border-gray-700 shadow-sm flex flex-col">
                                <div className="p-5 border-b border-[#dbe1e6] dark:border-gray-700 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[#111518] dark:text-white">Recent Inquiries</h3>
                                    <button className="text-primary text-sm font-medium hover:underline">View All</button>
                                </div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-800/50 text-[#617989] dark:text-gray-400 text-xs uppercase tracking-wide">
                                                <th className="p-4 font-medium">Customer</th>
                                                <th className="p-4 font-medium">Inquiry</th>
                                                <th className="p-4 font-medium">Time</th>
                                                <th className="p-4 font-medium">Status</th>
                                                <th className="p-4 font-medium"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-[#dbe1e6] dark:divide-gray-700">
                                            {/* Static Mock Data for Inquiries */}
                                            <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="p-4 font-medium text-[#111518] dark:text-white flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">JD</div>
                                                    John Doe
                                                </td>
                                                <td className="p-4 text-gray-600 dark:text-gray-300 max-w-[200px] truncate">Price for iPhone 14 Pro Max?</td>
                                                <td className="p-4 text-gray-500">2 min ago</td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium">New</span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">reply</span></button>
                                                </td>
                                            </tr>
                                            <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="p-4 font-medium text-[#111518] dark:text-white flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">SS</div>
                                                    Sarah Smith
                                                </td>
                                                <td className="p-4 text-gray-600 dark:text-gray-300 max-w-[200px] truncate">Do you have the S23 in green?</td>
                                                <td className="p-4 text-gray-500">45 min ago</td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 text-xs font-medium">Pending</span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">reply</span></button>
                                                </td>
                                            </tr>
                                            <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="p-4 font-medium text-[#111518] dark:text-white flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">MB</div>
                                                    Mike Brown
                                                </td>
                                                <td className="p-4 text-gray-600 dark:text-gray-300 max-w-[200px] truncate">Warranty claim for my Pixel 7</td>
                                                <td className="p-4 text-gray-500">3 hrs ago</td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">Resolved</span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Side Widgets: Inventory & Quick Actions */}
                            <div className="flex flex-col gap-6">
                                {/* Inventory Snapshot */}
                                <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#dbe1e6] dark:border-gray-700 shadow-sm p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-[#111518] dark:text-white">Inventory by Brand</h3>
                                        <button className="text-gray-400 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {/* Mock Inventory Bars */}
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-[#111518] dark:text-white">Apple</span>
                                                <span className="text-[#617989] dark:text-gray-400">45%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-black dark:bg-white w-[45%] rounded-full"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-[#111518] dark:text-white">Samsung</span>
                                                <span className="text-[#617989] dark:text-gray-400">30%</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600 w-[30%] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Low Stock Alert */}
                                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 p-5">
                                    <h3 className="text-sm font-bold text-red-800 dark:text-red-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">warning</span> Low Stock Alert
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        {products.filter(p => p.stock < 5).slice(0, 3).map(p => (
                                             <div key={p._id} className="flex justify-between items-center bg-white dark:bg-[#1a2632] p-3 rounded-lg border border-red-100 dark:border-gray-700">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-gray-100 dark:bg-gray-700 rounded w-10 h-10 bg-center bg-cover" style={{ backgroundImage: `url('${p.image || "https://via.placeholder.com/100"}')`}}></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#111518] dark:text-white leading-none">{p.name}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{p.colorOptions?.[0] || 'Standard'}</p>
                                                    </div>
                                                </div>
                                                <span className="text-red-600 font-bold text-sm">{p.stock} Left</span>
                                             </div>
                                        ))}
                                        {products.filter(p => p.stock < 5).length === 0 && <p className="text-sm text-gray-500">No low stock items.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Quick Actions Grid */}
                        <div>
                            <h2 className="text-[#111518] dark:text-white text-lg font-bold mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <button className="flex items-center gap-4 rounded-xl border border-[#dbe1e6] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-4 hover:border-primary hover:shadow-md transition-all group text-left">
                                    <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                        <span className="material-symbols-outlined block">add_circle</span>
                                    </div>
                                    <div>
                                        <h3 className="text-[#111518] dark:text-white font-bold">Add New Product</h3>
                                        <p className="text-sm text-[#617989] dark:text-gray-400">Update catalog</p>
                                    </div>
                                </button>
                                <button className="flex items-center gap-4 rounded-xl border border-[#dbe1e6] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-4 hover:border-primary hover:shadow-md transition-all group text-left">
                                    <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                        <span className="material-symbols-outlined block">chat</span>
                                    </div>
                                    <div>
                                        <h3 className="text-[#111518] dark:text-white font-bold">Reply to Inquiries</h3>
                                        <p className="text-sm text-[#617989] dark:text-gray-400">Check messages</p>
                                    </div>
                                </button>
                                <button className="flex items-center gap-4 rounded-xl border border-[#dbe1e6] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-4 hover:border-primary hover:shadow-md transition-all group text-left">
                                    <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                        <span className="material-symbols-outlined block">manage_accounts</span>
                                    </div>
                                    <div>
                                        <h3 className="text-[#111518] dark:text-white font-bold">Manage Users</h3>
                                        <p className="text-sm text-[#617989] dark:text-gray-400">Admin access</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="mt-12 text-center pb-6">
                        <p className="text-xs text-[#617989] dark:text-gray-500">© 2024 DIGI WORLD Admin Console. All rights reserved.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
