import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(0);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductById(id).then((res) => {
            setProduct(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    if (loading) return (
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700"></div>
            <p className="text-gray-400 font-medium text-xs tracking-widest uppercase">Loading Piece...</p>
        </div>
    );

    if (!product) return (
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
            <span className="material-icons text-5xl text-gray-200">error_outline</span>
            <p className="text-gray-500 font-serif text-xl">We couldn't find this specific piece.</p>
            <Link to="/all-products" className="text-red-700 font-bold underline underline-offset-4 uppercase tracking-widest text-xs">Back to Collections</Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Media Gallery */}
                    <div className="flex-1 flex flex-col md:flex-row-reverse gap-6">
                        <div className="flex-grow aspect-[3/4] bg-gray-50 overflow-hidden relative">
                            <img
                                src={product.images[selectedImg]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-opacity duration-500"
                            />
                            {product.stock === 0 && (
                                <div className="absolute top-8 left-8 bg-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-gray-900 shadow-xl border border-gray-100">
                                    Sold out
                                </div>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[100px] md:max-h-none">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImg(idx)}
                                        className={`w-20 md:w-24 aspect-[3/4] flex-shrink-0 bg-gray-100 border-2 transition-all ${selectedImg === idx ? 'border-red-700 p-0.5' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 max-w-xl">
                        <nav className="flex space-x-2 text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-8 items-center">
                            <Link to="/" className="hover:text-red-700">Home</Link>
                            <span className="material-icons text-[10px]">chevron_right</span>
                            <Link to="/collections" className="hover:text-red-700">Collections</Link>
                            <span className="material-icons text-[10px]">chevron_right</span>
                            <span className="text-gray-900">{product.category}</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26] leading-tight mb-4">{product.name}</h1>
                        <p className="text-2xl font-light text-red-700 mb-8">₹{product.price.toLocaleString()}</p>

                        <div className="border-t border-b border-gray-100 py-8 mb-10">
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
                                {product.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                                className={`w-full py-5 rounded-md font-bold uppercase tracking-[0.2em] text-[11px] transition-all transform active:scale-95 shadow-lg ${product.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-[#b12a32] text-white hover:bg-[#8e2128]'}`}
                            >
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
                            </button>

                            <button className="flex items-center justify-center space-x-2 border border-gray-200 py-5 rounded-md hover:bg-gray-50 transition-colors uppercase tracking-[0.2em] text-[11px] font-bold text-gray-700">
                                <span className="material-icons text-sm">favorite_border</span>
                                <span>Add to Wishlist</span>
                            </button>
                        </div>

                        {/* Details Accordion Example */}
                        <div className="mt-16 space-y-6">
                            <div className="group pb-6 border-b border-gray-100 cursor-pointer">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#2d2a26]">
                                    <span>Material & Care</span>
                                    <span className="material-icons text-sm">add</span>
                                </div>
                            </div>
                            <div className="group pb-6 border-b border-gray-100 cursor-pointer">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#2d2a26]">
                                    <span>Shipping & Returns</span>
                                    <span className="material-icons text-sm">add</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex space-x-6 text-gray-400">
                            <span className="material-icons hover:text-[#b12a32] cursor-pointer">share</span>
                            <span className="material-icons hover:text-[#b12a32] cursor-pointer">print</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
