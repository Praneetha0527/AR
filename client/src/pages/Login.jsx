import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData).then((res) => {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            alert("Welcome back, " + res.data.name);
            navigate("/");
        }).catch((err) => alert(err.response?.data?.message || "Error logging in"));
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl shadow-black/5 border border-gray-100">
                <div className="flex justify-center mb-8">
                    <img src="/assets/images/logo.png" alt="Logo" className="h-14 object-contain" />
                </div>
                <h2 className="text-3xl font-serif text-center mb-8 font-bold text-[#2d2a26]">Sign In</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-semibold text-gray-400 block mb-2 uppercase tracking-widest text-[10px]">Email Address</label>
                        <input type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full h-12 bg-gray-50 border border-gray-200 rounded px-4 focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none transition" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-400 block mb-2 uppercase tracking-widest text-[10px]">Password</label>
                        <input type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full h-12 bg-gray-50 border border-gray-200 rounded px-4 focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none transition" />
                    </div>
                    <button className="w-full h-12 bg-[#b12a32] text-white rounded font-bold shadow-lg active:scale-95 transition-transform uppercase tracking-widest text-xs">Login</button>
                </form>
                <div className="mt-8 text-center text-xs tracking-wide">
                    <span className="text-gray-400">New customer?</span> <Link to="/register" className="text-red-700 font-bold hover:underline ml-1">Create account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
