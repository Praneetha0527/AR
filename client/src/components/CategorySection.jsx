import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
    const categories = [
        {
            title: "Silk Sarees",
            subtitle: "The Hand-woven Legacy",
            img: "/assets/images/silk_saree_hero.png",
            link: "/collections/silk-sarees"
        },
        {
            title: "Cotton Sarees",
            subtitle: "Comfort & Grace",
            img: "/assets/images/cotton_saree_category.png",
            link: "/collections/cotton-sarees"
        },
        {
            title: "Men's Edit",
            subtitle: "Dapper & Traditional",
            img: "/assets/images/mens_kurta_style.png",
            link: "/men"
        },
        {
            title: "Collections",
            subtitle: "The Universe of Bharani",
            img: "/assets/images/all_collections.png",
            link: "/collections"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] mb-4">Curated Selections</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-6">Shop by Category</h2>
                    <div className="h-0.5 w-16 bg-red-700" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((item, idx) => (
                        <Link to={item.link} key={idx} className="relative aspect-[3/4] group overflow-hidden bg-gray-50">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-700" />

                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white transition-transform duration-700 transform group-hover:-translate-y-2">
                                <span className="text-[10px] tracking-[0.3em] font-bold uppercase mb-2 opacity-80">{item.subtitle}</span>
                                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] border-b border-white pb-1 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore Collection</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
