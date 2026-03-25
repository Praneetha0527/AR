import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/api";

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        category: "Silk Sarees",
        gender: "women",
        price: "",
        description: "",
        stock: "",
        imageUrl: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await createProduct({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                images: [formData.imageUrl || "/assets/images/silk_saree_hero.png"]
            });
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Let's try again.");
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f9f7f4] min-h-screen py-24">
            <div className="container mx-auto px-4 max-w-2xl">

                <div className="bg-white p-12 shadow-2xl rounded-sm border border-gray-100 animate-in zoom-in-95 duration-500">
                    <div className="mb-12 text-center">
                        <span className="text-[10px] text-red-700 font-bold uppercase tracking-[0.4em] mb-4 block">Crafting The Legacy</span>
                        <h1 className="text-4xl font-serif text-[#2d2a26]">Commission New Weave</h1>
                        <div className="h-0.5 w-12 bg-red-700 mx-auto mt-6" />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest p-4 mb-8 text-center rounded-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Masterpiece Name</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Traditional Kanchipuram Gold"
                                className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-red-700 transition-all font-serif bg-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Genre</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-200 py-3 text-xs focus:outline-none focus:border-red-700 bg-transparent uppercase tracking-widest font-bold"
                                >
                                    <option value="women">Women's Collection</option>
                                    <option value="men">Men's Masterpieces</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Class</label>
                                <input
                                    required
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g. Silk Sarees"
                                    className="w-full border-b border-gray-200 py-3 text-xs focus:outline-none focus:border-red-700 bg-transparent uppercase tracking-widest font-bold"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Valuation (₹)</label>
                                <input
                                    required
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="15000"
                                    className="w-full border-b border-gray-200 py-3 text-base focus:outline-none focus:border-red-700 bg-transparent font-serif"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Stock Available</label>
                                <input
                                    required
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="5"
                                    className="w-full border-b border-gray-200 py-3 text-base focus:outline-none focus:border-red-700 bg-transparent font-serif"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">The Narrative (Description)</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Describe the soul of this weave..."
                                className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-red-700 transition-all font-light italic bg-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Masterpiece Portrait (Local Image URL)</label>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                type="text"
                                placeholder="/assets/images/silk_saree_1.png"
                                className="w-full border-b border-gray-200 py-3 text-[11px] focus:outline-none focus:border-red-700 transition-all font-mono"
                            />
                            <p className="text-[9px] text-gray-300 italic">Portrait path within our curated archives.</p>
                        </div>

                        <div className="pt-10 flex space-x-6">
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                className="w-1/3 border border-gray-200 py-4 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-all rounded-sm active:scale-95"
                            >
                                Reconsider
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-2/3 bg-[#2d2a26] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl rounded-sm active:scale-95 ${loading ? 'opacity-50 cursor-wait' : ''}`}
                            >
                                {loading ? 'Enshrining...' : 'Enshrine Masterpiece'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
