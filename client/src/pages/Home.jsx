import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res.data.slice(0, 8));
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="bg-white">
            <Hero />

            <CategorySection />

            {/* Featured Luxury Section */}
            <section className="py-24 bg-[#f9f7f4]">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    <div className="lg:w-1/2 relative">
                        <div className="aspect-[4/5] overflow-hidden rounded-sm relative z-10 shadow-2xl">
                            <img
                                src="/assets/images/silk_saree_hero.png"
                                alt="Luxury Silk"
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </div>
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white -z-0 hidden lg:block border border-gray-100 shadow-sm" />
                    </div>

                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="text-[10px] text-red-700 font-bold uppercase tracking-[0.4em] mb-6 block">The Master's Collection</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight tracking-tight">Elegance in Every <br />Single Strand</h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 font-light">
                            Experience the timeless allure of pure Kanchipuram silk. Our master weavers dedicate weeks to craft a single masterpiece, ensuring every pattern tells a story of heritage and sophistication.
                        </p>
                        <Link to="/collections/silk-sarees" className="inline-block bg-[#2d2a26] text-white px-12 py-5 rounded font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-red-900 transition-all shadow-xl active:scale-95">
                            Shop The Masterpiece
                        </Link>
                    </div>
                </div>
            </section>

            {/* Arrivals Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mb-4">Fresh Off The Loom</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">New Arrivals</h2>
                        <div className="h-0.5 w-16 bg-red-700" />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
                        </div>
                    ) : (
                        <ProductGrid products={products} />
                    )}

                    <div className="flex justify-center mt-20">
                        <Link to="/all-products" className="group flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2d2a26] border-b border-[#2d2a26] pb-1 hover:text-red-700 hover:border-red-700 transition-all">
                            <span>View All Products</span>
                            <span className="material-icons text-sm group-hover:translate-x-2 transition-transform">east</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Split Banner Section */}
            <section className="pb-24">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative aspect-video md:aspect-[16/7] overflow-hidden group">
                        <img
                            src="/assets/images/all_collections.png"
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            alt="Promo 1"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-8">
                            <h3 className="text-3xl md:text-4xl font-serif mb-4">The Bridal Edit</h3>
                            <button className="text-[10px] font-bold border-b border-white pb-1 uppercase tracking-widest hover:text-red-300 hover:border-red-300 transition-all">Explore</button>
                        </div>
                    </div>

                    <div className="relative aspect-video md:aspect-[16/7] overflow-hidden group">
                        <img
                            src="/assets/images/mens_kurta_style.png"
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            alt="Promo 2"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-8">
                            <h3 className="text-3xl md:text-4xl font-serif mb-4">The Men's Edit</h3>
                            <button className="text-[10px] font-bold border-b border-white pb-1 uppercase tracking-widest hover:text-red-300 hover:border-red-300 transition-all">Explore</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Virtual Tour Section */}
            <section className="py-24 bg-[#1a1816] text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mb-4">Step Inside</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8">360° Virtual Experience</h2>
                        <div className="h-0.5 w-16 bg-red-700 mx-auto" />
                        <p className="text-gray-400 mt-8 max-w-2xl font-light text-sm md:text-base leading-relaxed">
                            Explore our flagship showroom from anywhere in the world. Immerse yourself in the architecture, browse our collections virtually, and experience the grandeur of Bharani Silks.
                        </p>
                    </div>
                    <div className="w-full relative aspect-video md:aspect-[21/9] overflow-hidden rounded shadow-2xl">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            style={{ width: "100%", height: "100%", border: "none", maxWidth: "100%" }} 
                            allow="xr-spatial-tracking; vr; gyroscope; accelerometer; fullscreen; autoplay; xr" 
                            scrolling="no" 
                            allowFullScreen={true} 
                            src="https://kuula.co/share/collection/7MFDy?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 border-t border-gray-100 bg-white">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    <div className="flex flex-col items-center group">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-red-700 group-hover:text-white transition-all duration-500">
                            <span className="material-icons text-3xl">verified</span>
                        </div>
                        <h4 className="text-lg font-serif mb-4 text-[#2d2a26]">Silk Mark Certified</h4>
                        <p className="text-gray-400 text-xs font-light leading-relaxed max-w-xs">Every piece undergoes rigorous testing to ensure 100% pure silk and authentic zari.</p>
                    </div>
                    <div className="flex flex-col items-center group">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-red-700 group-hover:text-white transition-all duration-500">
                            <span className="material-icons text-3xl">public</span>
                        </div>
                        <h4 className="text-lg font-serif mb-4 text-[#2d2a26]">Worldwide Delivery</h4>
                        <p className="text-gray-400 text-xs font-light leading-relaxed max-w-xs">Bringing the brilliance of Indian silk to homes in over 50 countries with express logistics.</p>
                    </div>
                    <div className="flex flex-col items-center group">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-red-700 group-hover:text-white transition-all duration-500">
                            <span className="material-icons text-3xl">psychology</span>
                        </div>
                        <h4 className="text-lg font-serif mb-4 text-[#2d2a26]">Generation of Expertise</h4>
                        <p className="text-gray-400 text-xs font-light leading-relaxed max-w-xs">Managed by generational experts who understand the soul of traditional weaving.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
