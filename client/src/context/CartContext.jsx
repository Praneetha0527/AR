import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const exist = cart.find((x) => x._id === product._id);
        if (exist) {
            setCart(cart.map((x) => (x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x)));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const removeFromCart = (product) => {
        const exist = cart.find((x) => x._id === product._id);
        if (exist.qty === 1) {
            setCart(cart.filter((x) => x._id !== product._id));
        } else {
            setCart(cart.map((x) => (x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x)));
        }
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
