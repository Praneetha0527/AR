import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);
    const cartCount = cart.reduce((a, c) => a + c.qty, 0);
    const wishlistCount = wishlist.length;
    const location = useLocation();
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const isActive = (path) => location.pathname === path;

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/all-products?search=${searchKeyword.trim()}`);
            setSearchOpen(false);
            setSearchKeyword("");
        }
    };

    const activeStyles = "text-red-700 border-b-2 border-red-700 pb-1 font-bold";
    const inactiveStyles = "text-gray-800 hover:text-red-700 border-b-2 border-transparent hover:border-red-700 pb-1 transition-all";

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Collections", path: "/collections" },
        { name: "All Products", path: "/all-products" },
        { name: "Pure", path: "/collections/pure" },
        { name: "Silk Sarees", path: "/collections/silk-sarees" },
        { name: "Cotton Sarees", path: "/collections/cotton-sarees" },
        { name: "Men", path: "/men" }
    ];

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            {/* Logo Section */}
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between relative">

                {/* Search Interaction (Left) */}
                <div className="hidden md:flex items-center space-x-4 flex-1">
                    {!searchOpen ? (
                        <span
                            className="material-icons text-gray-700 cursor-pointer hover:text-red-700"
                            onClick={() => setSearchOpen(true)}
                        >
                            search
                        </span>
                    ) : (
                        <form onSubmit={handleSearch} className="flex items-center w-64 animate-in fade-in slide-in-from-left duration-300">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search our looms..."
                                className="border-b border-gray-200 text-xs py-1 w-full focus:outline-none focus:border-red-700"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <button type="submit" className="material-icons text-sm text-gray-400 hover:text-red-700 ml-2">east</button>
                            <button type="button" onClick={() => setSearchOpen(false)} className="material-icons text-sm text-gray-300 ml-2">close</button>
                        </form>
                    )}
                </div>

                {/* Main Logo (Center) */}
                <div className="flex justify-center flex-1">
                    <Link to="/">
                        <img
                            src="/assets/images/logo.png"
                            alt="Bharani Silks"
                            className="h-10 md:h-14 object-contain"
                        />
                    </Link>
                </div>

                {/* Icons (Right) */}
                <div className="flex items-center justify-end space-x-6 flex-1 pt-4 md:pt-0">
                    <Link to={localStorage.getItem("userInfo") ? "/profile" : "/login"} className={`flex items-center transition ${isActive("/profile") || isActive("/login") ? 'text-red-700' : 'text-gray-700 hover:text-red-700'}`}>
                        <span className="material-icons">person_outline</span>
                    </Link>
                    <Link to="/wishlist" className={`relative transition group ${isActive("/wishlist") ? 'text-red-700' : 'text-gray-700 hover:text-red-700'}`}>
                        <span className="material-icons">favorite_border</span>
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart" className={`relative transition group ${isActive("/cart") ? 'text-red-700' : 'text-gray-700 hover:text-red-700'}`}>
                        <span className="material-icons">shopping_bag</span>
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{cartCount}</span>
                    </Link>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="border-t border-gray-50 flex justify-center py-2 overflow-x-auto">
                <ul className="flex space-x-8 text-[13px] font-medium tracking-wide list-none whitespace-nowrap px-4">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={isActive(link.path) ? activeStyles : inactiveStyles}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
