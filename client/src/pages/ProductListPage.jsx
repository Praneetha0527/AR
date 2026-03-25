import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

const ProductListPage = ({ type }) => {
    const { categorySlug } = useParams();
    const location = useLocation();

    // Get search param from URL
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get("search") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gridCols, setGridCols] = useState(4);
    const [sort, setSort] = useState("alphabetical");

    // Page dynamic content based on category or type
    const getContent = () => {
        if (searchKeyword) return {
            title: `Search: ${searchKeyword}`,
            subtitle: "Results from our loom",
            desc: `Showing search results for "${searchKeyword}" in our curated collection.`,
            banner: "/assets/images/all_collections.png"
        };
        if (type === "all") return {
            title: "Our Collection",
            subtitle: "Masterpieces of Bharani",
            desc: "Explore our complete universe of hand-woven excellence.",
            banner: "/assets/images/all_collections.png"
        };
        if (categorySlug === "silk-sarees") return {
            title: "Silk Sarees",
            subtitle: "Grandeur in Every Thread",
            desc: "Discover timeless elegance with Bharani Silks’ premium silk sarees, handcrafted for sophistication.",
            banner: "/assets/images/silk_saree_hero.png"
        };
        if (categorySlug === "cotton-sarees") return {
            title: "Cotton Saree",
            subtitle: "Hand-picked Cotton Classics",
            desc: "Experience the ultimate comfort and finesse with our curated collection of cotton sarees.",
            banner: "/assets/images/cotton_saree_category.png"
        };
        if (categorySlug === "pure") return {
            title: "Pure Silk",
            subtitle: "Genuinely Woven Excellence",
            desc: "The pinnacle of our craftsmanship. 100% pure silk woven with genuine gold and silver zari.",
            banner: "/assets/images/silk_saree_hero.png"
        };
        return {
            title: categorySlug?.replace('-', ' ') || "Collection",
            subtitle: "",
            desc: "",
            banner: "/assets/images/all_collections.png"
        };
    };

    const content = getContent();

    useEffect(() => {
        setLoading(true);
        let params = { sort };

        if (searchKeyword) {
            params.search = searchKeyword;
        } else if (type === "all") {
            // No specific filter
        } else if (categorySlug === "silk-sarees") {
            params.category = "Silk Sarees";
            params.gender = "women";
        } else if (categorySlug === "cotton-sarees") {
            params.category = "Cotton Sarees";
            params.gender = "women";
        } else if (categorySlug === "pure") {
            params.category = "Silk Sarees";
            params.gender = "women";
        } else if (categorySlug) {
            params.category = categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            params.gender = "women";
        }

        getProducts(params).then(res => {
            setProducts(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [categorySlug, type, searchKeyword, sort]);

    return (
        <div className="bg-white min-h-screen">

            {/* Category Banner */}
            <div className="relative h-[30vh] md:h-[45vh] overflow-hidden">
                <img src={content.banner} alt={content.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                    <h1 className="text-4xl md:text-7xl font-serif tracking-tight mb-2 uppercase text-center">{content.title}</h1>
                    <span className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-bold opacity-80">{content.subtitle}</span>
                </div>
            </div>

            {/* Page Description Header */}
            <div className="container mx-auto px-4 py-16 text-center max-w-4xl border-b border-gray-100">
                <p className="text-gray-500 text-sm md:text-lg leading-relaxed font-light italic">{content.desc}</p>
            </div>

            {/* Grid Controls */}
            <div className="border-b border-gray-100 py-6 mb-8 bg-gray-50/50 sticky top-16 md:top-20 z-40 backdrop-blur-md">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                    {/* Left: Filter */}
                    <div className="flex items-center space-x-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2d2a26]">{products.length} Masterpieces Found</span>
                    </div>

                    {/* Center: Grid Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        {[2, 3, 4, 5, 6].map(num => (
                            <button
                                key={num}
                                onClick={() => setGridCols(num)}
                                className={`p-1 flex space-x-0.5 transition-all ${gridCols === num ? 'opacity-100 scale-110' : 'opacity-20 hover:opacity-100'}`}
                            >
                                {Array.from({ length: num }).map((_, i) => (
                                    <div key={i} className="w-1.5 h-4 bg-black rounded-sm" />
                                ))}
                            </button>
                        ))}
                    </div>

                    {/* Right: Sort */}
                    <div className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sort by:</span>
                        <select
                            className="border-none text-[10px] font-bold tracking-widest uppercase text-gray-700 focus:ring-0 cursor-pointer p-0 pr-6"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="alphabetical">Alphabetically, A-Z</option>
                            <option value="newest">Featured Newest</option>
                            <option value="priceAsc">Price, low to high</option>
                            <option value="priceDesc">Price, high to low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 mb-24 min-h-[40vh]">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4" />
                                <div className="h-2 bg-gray-100 rounded w-3/4 mx-auto mb-2" />
                                <div className="h-2 bg-gray-100 rounded w-1/2 mx-auto" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {products.length > 0 ? (
                            <div className={`grid gap-8 grid-cols-2 lg:grid-cols-${gridCols}`}>
                                {products.map(p => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center flex flex-col items-center">
                                <span className="material-icons text-6xl text-gray-100 mb-4">search_off</span>
                                <p className="text-gray-400 font-serif italic text-lg">No treasures found for this selection.</p>
                                <button onClick={() => window.location.href = '/all-products'} className="mt-8 text-[10px] font-bold border-b border-black pb-1 uppercase tracking-widest hover:text-red-700 hover:border-red-700 transition-all">Clear Selection</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
