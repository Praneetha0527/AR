import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

const Men = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sort, setSort] = useState("alphabetical");

    useEffect(() => {
        setLoading(true);
        const params = {
            gender: "men",
            sort
        };
        if (categoryFilter !== "all") {
            params.category = categoryFilter;
        }

        getProducts(params).then((res) => {
            setProducts(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [categoryFilter, sort]);

    const categories = [
        { name: "All Collections", value: "all" },
        { name: "Sherwanis", value: "Sherwanis" },
        { name: "Suits", value: "Suits" },
        { name: "Kurtas", value: "Kurtas" },
        { name: "Dhotis", value: "Dhotis" },
        { name: "Bundis", value: "Bundis" }
    ];

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Editorial Header */}
            <div className="relative h-[50vh] md:h-[75vh] bg-[#2d2a26] flex items-center justify-center overflow-hidden">
                <img
                    src="/assets/images/mens_sherwani_1.png"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] hover:scale-110"
                    alt="Men's Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
                <div className="relative text-center text-white px-4 animate-in fade-in duration-1000">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold opacity-80 mb-8 block">The Sovereign Male</span>
                    <h1 className="text-6xl md:text-9xl font-serif mb-6 leading-tight tracking-tight">Elegance <br />Redefined</h1>
                    <p className="text-[10px] md:text-sm italic font-serif opacity-70 tracking-widest uppercase">Pure Hand-woven traditional & contemporary attire</p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-24">

                {/* Horizontal Navigation / Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 pb-12 mb-16 space-y-8 md:space-y-0 sticky top-20 bg-white/80 backdrop-blur-md z-40 py-4">
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-10">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setCategoryFilter(cat.value)}
                                className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] pb-1 transition-all border-b-2 ${categoryFilter === cat.value ? 'text-red-700 border-red-700' : 'text-gray-400 border-transparent hover:text-black hover:border-black'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sort by:</span>
                        <select
                            className="border-none text-[10px] font-bold tracking-widest uppercase text-[#2d2a26] focus:ring-0 cursor-pointer p-0 pr-8"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="alphabetical">A-Z</option>
                            <option value="newest">Latest</option>
                            <option value="priceAsc">Price Low</option>
                            <option value="priceDesc">Price High</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="animate-pulse space-y-4">
                                <div className="bg-gray-50 aspect-[3/4] rounded-sm" />
                                <div className="h-2 bg-gray-50 w-3/4 mx-auto" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                                {products.map((p) => (
                                    <div key={p._id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <ProductCard product={p} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-40 border-2 border-dashed border-gray-50 rounded-lg">
                                <span className="material-icons text-7xl text-gray-100 mb-6">inventory_2</span>
                                <h3 className="text-2xl font-serif text-gray-300 italic mb-8">The master weavers are currently crafting this collection.</h3>
                                <button onClick={() => setCategoryFilter('all')} className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-red-700 hover:border-red-700 transition-all">Browse All Collections</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Men;
