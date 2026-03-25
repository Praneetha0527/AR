import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Collections = () => {
    const categories = [
        { title: "Silk Sarees", subtitle: "Grandeur in Gold", img: "/assets/images/silk_saree_hero.png", link: "/collections/silk-sarees" },
        { title: "Cotton Sarees", subtitle: "Summer Finesse", img: "/assets/images/cotton_saree_category.png", link: "/collections/cotton-sarees" },
        { title: "Pure Kanjivaram", subtitle: "The Weaver's Pride", img: "/assets/images/all_collections.png", link: "/collections/pure" },
        { title: "Men's Edit", subtitle: "Modern Classics", img: "/assets/images/mens_kurta_style.png", link: "/men" },
        { title: "Bridal Wear", subtitle: "Your Special Day", img: "/assets/images/silk_saree_hero.png", link: "/collections/silk-sarees" },
        { title: "Accessories", subtitle: "Finishing Touches", img: "/assets/images/all_collections.png", link: "/all-products" },
    ];

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4 py-24">
                <div className="flex flex-col items-center mb-24 text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mb-4">World Of Bharani</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-[#2d2a26] mb-8">Our Collections</h1>
                    <div className="h-0.5 w-16 bg-red-700" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((cat, idx) => (
                        <Link to={cat.link} key={idx} className="group flex flex-col items-center text-center">
                            <div className="w-full aspect-[4/5] bg-gray-50 overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-2">
                                <img
                                    src={cat.img}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />
                            </div>
                            <span className="text-[10px] text-red-700 uppercase font-bold tracking-[0.4em] mb-2">{cat.subtitle}</span>
                            <h3 className="text-2xl font-serif text-[#2d2a26] border-b border-transparent group-hover:border-red-700 pb-1 transition-all">
                                {cat.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
