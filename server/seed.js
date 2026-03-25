import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

const products = [
    // SILK SAREES
    {
        name: "Classic Kanchipuram Gold Zari Silk",
        category: "Silk Sarees",
        gender: "women",
        price: 12500,
        description: "An exquisite Kanchipuram silk saree hand-woven with pure gold zari.",
        images: ["/assets/images/silk_saree_hero.png"],
        stock: 12
    },
    {
        name: "Royal Blue Traditional Kanjivaram",
        category: "Silk Sarees",
        gender: "women",
        price: 13900,
        description: "Stunning royal blue silk with heavy gold borders.",
        images: ["/assets/images/silk_saree_1.png"],
        stock: 4
    },
    {
        name: "Emerald Green Temple Border Silk",
        category: "Silk Sarees",
        gender: "women",
        price: 14200,
        description: "Traditional emerald green silk saree with a rich golden pallu.",
        images: ["/assets/images/silk_saree_3.png"],
        stock: 8
    },

    // COTTON SAREES
    {
        name: "Indigo Hand-Block Printed Cotton",
        category: "Cotton Sarees",
        gender: "women",
        price: 2400,
        description: "Soft, breathable sustainable cotton with traditional indigo prints.",
        images: ["/assets/images/cotton_saree_1.png"],
        stock: 15
    },
    {
        name: "Pastel Pink Linen Cotton",
        category: "Cotton Sarees",
        gender: "women",
        price: 3200,
        description: "Elegant linen-cotton blend in soft pastel pink.",
        images: ["/assets/images/cotton_saree_2.png"],
        stock: 12
    },

    // MEN'S WEAR - MAIN MODULE ENHANCEMENT
    {
        name: "Imperial Navy Silk Sherwani",
        category: "Sherwanis",
        gender: "men",
        price: 18500,
        description: "Exquisite navy blue sherwani with intricate silver hand-embroidery. Perfect for grand weddings.",
        images: ["/assets/images/mens_sherwani_1.png"],
        stock: 5
    },
    {
        name: "Charcoal Grey Tailored 3-Piece Suit",
        category: "Suits",
        gender: "men",
        price: 22000,
        description: "A masterfully tailored formal suit. Italian cut, premium wool-blend fabric.",
        images: ["/assets/images/mens_suit_1.png"],
        stock: 3
    },
    {
        name: "Mustard Gold Silk Nehru Jacket",
        category: "Bundis",
        gender: "men",
        price: 6500,
        description: "Traditional silk jacket with floral motifs. Ideal for festive celebrations.",
        images: ["/assets/images/mens_ethnic_jacket.png"],
        stock: 10
    },
    {
        name: "Pure Silk Ivory Wedding Kurta",
        category: "Kurtas",
        gender: "men",
        price: 5200,
        description: "Premium ivory silk kurta featuring subtle self-design thread work.",
        images: ["/assets/images/mens_kurta_style.png"],
        stock: 8
    },
    {
        name: "Royal White Gold Zari Dhoti",
        category: "Dhotis",
        gender: "men",
        price: 2800,
        description: "Traditional South Indian dhoti with a pure gold zari border.",
        images: ["/assets/images/mens_wear_1.png"],
        stock: 20
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Product.deleteMany();
        await Product.insertMany(products);

        await User.deleteMany();
        await User.create({
            name: "Admin User",
            email: "admin@bharanisilks.com",
            password: "adminpassword123",
            isAdmin: true
        });

        console.log("Database Seeded with ENHANCED MEN'S MODULE and Admin User");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
