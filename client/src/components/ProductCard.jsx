import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const isFavorited = isInWishlist(product._id);

    return (
        <div className="group bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] flex flex-col border border-gray-50 h-full relative">

            {/* Wishlist Heart Icon (Top Left) */}
            <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 ${isFavorited ? 'text-red-600 scale-110' : 'text-gray-400 hover:text-red-400 hover:scale-110'}`}
            >
                <span className="material-icons text-xl leading-none">
                    {isFavorited ? 'favorite' : 'favorite_border'}
                </span>
            </button>

            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.stock === 0 && (
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#2d2a26] rounded shadow-sm z-10">
                            Sold out
                        </div>
                    )}
                </Link>

                {/* Buttons Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4 space-y-2 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className={`w-full py-3 rounded-md font-bold text-[10px] tracking-[0.2em] uppercase transition-all transform active:scale-95 shadow-lg ${product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#5c0a21] text-white hover:bg-[#4a081a]'}`}
                    >
                        {product.stock === 0 ? 'Out of Stock' : 'Add To Cart'}
                    </button>
                    <Link
                        to={`/product/${product._id}`}
                        className="w-full bg-white text-[#5c0a21] py-3 rounded-md font-bold text-[10px] tracking-[0.2em] uppercase text-center border border-[#5c0a21] hover:bg-gray-50 transition-all shadow-md"
                    >
                        Quick View
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex flex-col flex-grow text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">{product.category}</span>
                <Link
                    to={`/product/${product._id}`}
                    className="text-sm md:text-base text-gray-800 font-playfair font-semibold hover:text-[#5c0a21] transition-colors line-clamp-1 mb-2"
                >
                    {product.name}
                </Link>
                <div className="mt-auto">
                    <span className="text-lg font-bold text-[#5c0a21]">₹{product.price.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
