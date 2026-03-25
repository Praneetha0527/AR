// d:\Consultancy Project\Bharani_Silks\client\src\App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Collections from "./pages/Collections.jsx";
import Men from "./pages/Men.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

function App() {
    return (
        <WishlistProvider>
            <CartProvider>
                <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/collections" element={<Collections />} />
                            <Route path="/collections/:categorySlug" element={<ProductListPage />} />
                            <Route path="/all-products" element={<ProductListPage type="all" />} />
                            <Route path="/men" element={<Men />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/add-product" element={<AddProduct />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </CartProvider>
        </WishlistProvider>
    );
}

export default App;
