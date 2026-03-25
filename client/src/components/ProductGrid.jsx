import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, title }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            {title && <h2 className="text-3xl font-serif text-center mb-12">{title}</h2>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
