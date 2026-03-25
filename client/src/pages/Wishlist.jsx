import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
    const { wishlist } = useContext(WishlistContext);

    if (wishlist.length === 0) return (
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-6 px-4">
            <div className="flex flex-col items-center">
                <span className="material-icons text-7xl text-gray-100 mb-4">favorite_border</span>
                <h1 className="text-3xl font-serif text-[#2d2a26] text-center">Your Wishlist is Empty</h1>
                <p className="text-gray-400 text-sm mt-3 text-center max-w-xs leading-relaxed">
                    Save your favorite pieces here to revisit them anytime. Start exploring our collections.
                </p>
            </div>
            <Link to="/all-products" className="bg-[#b12a32] text-white px-10 py-4 rounded font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-black transition-all active:scale-95">
                Explore Collections
            </Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-4">My Favorites</h1>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em]">{wishlist.length} Items Saved</p>
                    <div className="h-0.5 w-16 bg-red-700 mt-6" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlist.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
