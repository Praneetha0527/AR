import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile } from "../services/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            navigate("/login");
            return;
        }

        getProfile().then(res => {
            setUser(res.data);
            setLoading(false);
        }).catch(() => {
            localStorage.removeItem("userInfo");
            navigate("/login");
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

    if (loading) return (
        <div className="h-[70vh] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">

                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-b border-gray-100 pb-12 mb-16 space-y-6 md:space-y-0 text-center md:text-left">
                        <div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.4em] mb-4 block">Personal Sanctuary</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26]">Welcome, {user.name}</h1>
                            {user.isAdmin && (
                                <Link to="/admin" className="inline-block mt-4 text-[9px] font-bold uppercase tracking-[0.4em] bg-red-50 text-red-700 px-6 py-2 rounded-full hover:bg-red-700 hover:text-white transition-all">
                                    Access Admin Vault
                                </Link>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="hidden md:block px-8 py-3 border border-gray-200 rounded text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-700 hover:border-red-700 transition-all font-sans"
                        >
                            Sign Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

                        {/* Account Details */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d2a26] border-b border-gray-100 pb-4 mb-8">Profile Details</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">Full Name</p>
                                        <p className="text-base font-serif text-gray-800">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">Email Address</p>
                                        <p className="text-base font-serif text-gray-800">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1">Account Type</p>
                                        <p className="text-base font-serif text-gray-800 uppercase tracking-widest text-[11px]">{user.isAdmin ? 'Curator (Admin)' : 'Valued Member'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Orders Overview */}
                        <div className="md:col-span-2 space-y-12">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d2a26] border-b border-gray-100 pb-4 mb-8">Order History</h3>
                                <div className="bg-[#f9f9f9] rounded-sm p-16 text-center border border-gray-100">
                                    <span className="material-icons text-5xl text-gray-200 mb-6">shopping_basket</span>
                                    <p className="text-gray-400 text-sm italic font-serif leading-relaxed mb-8">Your loom history is waiting to be written. Explore our latest weaves to start your collection.</p>
                                    <Link to="/all-products" className="inline-block bg-[#2d2a26] text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-black transition-all">Start Exploring</Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-24 pt-12 border-t border-gray-100 flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="bg-transparent text-gray-300 hover:text-red-700 text-[10px] font-bold uppercase tracking-[0.3em] transition-all flex items-center space-x-3"
                        >
                            <span className="material-icons text-sm">logout</span>
                            <span>Sign Out of Account</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
