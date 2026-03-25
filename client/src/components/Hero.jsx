import React, { useState, useEffect } from "react";

const Hero = () => {
    const banners = [
        {
            title: "Traditional Elegance",
            subtitle: "Woven with passion since 1985",
            img: "/assets/images/silk_saree_hero.png"
        },
        {
            title: "Divine Craftsmanship",
            subtitle: "Heritage in every thread",
            img: "/assets/images/hero_banner_2.png"
        },
        {
            title: "The Silk Story",
            subtitle: "Experience the finest Kanchipuram weaves",
            img: "/assets/images/all_collections.png"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-gray-100">
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img
                        src={banner.img}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                        <div className={`transform transition-all duration-1000 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-4 block">{banner.subtitle}</span>
                            <h1 className="text-4xl md:text-7xl font-serif mb-8 md:mb-12 max-w-4xl tracking-tight leading-tight">{banner.title}</h1>
                            <button className="bg-white text-black px-8 md:px-12 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                                Discover More
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-3">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-white' : 'w-4 bg-white/40'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
