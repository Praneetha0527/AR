import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-20 pb-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">

                {/* Brand Column */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Link to="/" className="flex flex-col items-center md:items-start mb-6">
                        <span className="text-3xl font-serif font-bold tracking-tighter leading-none">BHARANI</span>
                        <span className="text-xs tracking-[0.4em] font-light mt-1">SILKS</span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-loose max-w-xs">
                        Woven with passion since 1985. We take pride in bringing you the finest hand-picked traditional wear with an unmatched legacy of quality.
                    </p>
                </div>

                {/* Links Column */}
                <div>
                    <h4 className="text-[#f7d794] font-bold text-xs tracking-widest uppercase mb-8">Navigation</h4>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/collections" className="hover:text-white transition">All Collections</Link></li>
                        <li><Link to="/collections?category=Silk Sarees" className="hover:text-white transition">Silk Sarees</Link></li>
                        <li><Link to="/collections?category=Cotton Sarees" className="hover:text-white transition">Cotton Sarees</Link></li>
                        <li><Link to="/men" className="hover:text-white transition underline decoration-[#f7d794] underline-offset-4">Men's Edit</Link></li>
                    </ul>
                </div>

                {/* Support Column */}
                <div>
                    <h4 className="text-[#f7d794] font-bold text-xs tracking-widest uppercase mb-8">Customer Care</h4>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-white transition">Shipping Policy</a></li>
                        <li><a href="#" className="hover:text-white transition">Refunds & Returns</a></li>
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="text-[#f7d794] font-bold text-xs tracking-widest uppercase mb-8">Newsletter</h4>
                    <p className="text-sm text-gray-400 mb-6">Be the first to hear about new launches and exclusive offers.</p>
                    <div className="flex flex-col space-y-3">
                        <input type="email" placeholder="Email address" className="bg-[#2a2a2a] border-none text-sm px-5 py-3 focus:ring-1 focus:ring-[#f7d794] outline-none rounded" />
                        <button className="bg-[#f7d794] text-[#1a1a1a] py-3 text-xs font-bold tracking-widest uppercase rounded hover:bg-white transition-all">Subscribe</button>
                    </div>
                </div>

            </div>

            <div className="container mx-auto px-4 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-gray-500 font-bold uppercase">
                <p>&copy; 2024 Bharani Silks. Crafting memories.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span className="material-icons text-lg hover:text-white cursor-pointer transition">facebook</span>
                    <span className="material-icons text-lg hover:text-white cursor-pointer transition">instagram</span>
                    <span className="material-icons text-lg hover:text-white cursor-pointer transition">whatsapp</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
