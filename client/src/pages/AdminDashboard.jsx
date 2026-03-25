import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/");
            return;
        }

        getProducts().then(res => {
            setProducts(res.data);
            setLoading(false);
        });
    }, [navigate]);

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-16">

                <div className="flex justify-between items-center mb-16 border-b border-gray-100 pb-12">
                    <div>
                        <span className="text-[10px] text-red-700 font-bold uppercase tracking-[0.4em] mb-4 block">Curator Panel</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26]">Legacy Management</h1>
                    </div>
                    <Link to="/admin/add-product" className="bg-[#2d2a26] text-white px-8 py-4 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                        Add New Masterpiece
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-[#f9f9f9] p-10 border border-gray-100 rounded-sm">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Total Weaves</p>
                        <h2 className="text-5xl font-serif text-[#2d2a26]">{products.length}</h2>
                    </div>
                    <div className="bg-[#f9f9f9] p-10 border border-gray-100 rounded-sm">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Low Stock Items</p>
                        <h2 className="text-5xl font-serif text-red-700">{products.filter(p => p.stock < 5).length}</h2>
                    </div>
                    <div className="bg-[#f9f9f9] p-10 border border-gray-100 rounded-sm">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Hidden Treasures</p>
                        <h2 className="text-5xl font-serif text-[#2d2a26]">0</h2>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Product</th>
                                <th className="py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Category</th>
                                <th className="py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Stock</th>
                                <th className="py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Price</th>
                                <th className="py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((p) => (
                                <tr key={p._id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="py-8">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-16 h-20 bg-gray-100 overflow-hidden rounded-sm">
                                                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-serif text-[#2d2a26] mb-1">{p.name}</p>
                                                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{p.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 text-[11px] font-medium text-gray-500 uppercase tracking-widest">{p.category}</td>
                                    <td className="py-8">
                                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.stock > 10 ? 'bg-green-50 text-green-700' : p.stock > 0 ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'}`}>
                                            {p.stock} in stock
                                        </span>
                                    </td>
                                    <td className="py-8 text-sm font-medium text-[#2d2a26]">₹{p.price.toLocaleString()}</td>
                                    <td className="py-8 text-right">
                                        <div className="flex justify-end space-x-4">
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#2d2a26] transition-all">Edit</button>
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-red-300 hover:text-red-700 transition-all">Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
