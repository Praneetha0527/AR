import React from 'react';

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-8 left-8 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform active:scale-90 flex items-center justify-center group"
            title="Chat with our stylist"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-8 h-8 filter brightness-0 invert"
            />

            {/* Tooltip on hover */}
            <span className="absolute left-full ml-4 bg-white text-gray-800 text-[10px] uppercase font-bold tracking-widest px-4 py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none rounded border border-gray-100">
                Stylist Support
            </span>
        </a>
    );
};

export default WhatsAppButton;
