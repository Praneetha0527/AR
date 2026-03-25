import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {
        const exists = wishlist.find((item) => item._id === product._id);
        if (exists) {
            setWishlist(wishlist.filter((item) => item._id !== product._id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    const isInWishlist = (id) => wishlist.some((item) => item._id === id);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
