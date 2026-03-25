import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

    const handlePayment = async () => {
        try {
            // 1. Get Razorpay Key from backend
            const { keyId } = await fetch("http://localhost:5000/api/config/razorpay").then((t) =>
                t.json()
            );

            // 2. Create Razorpay order
            const orderRes = await fetch("http://localhost:5000/api/orders/create-razorpay-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total }),
            });
            const order = await orderRes.json();

            // 3. Open Razorpay Checkout
            const options = {
                key: keyId,
                amount: order.amount,
                currency: order.currency,
                name: "Bharani Silks",
                description: "Test Transaction",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // 4. Verify payment on success
                        const verifyRes = await fetch("http://localhost:5000/api/orders/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                orderCreationId: order.id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                            }),
                        });
                        const data = await verifyRes.json();
                        
                        // 5. Save order to MongoDB
                        if (data.msg === "success") {
                            // Normally we get the user ID from Auth context, let's assume a placeholder for now since auth might not be fully wired:
                            const userId = "64c9f1b5b4e4c2b9b8b9b8b9"; // Replace with actual user ID
                            await fetch("http://localhost:5000/api/orders", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    user: userId, // Placeholder, you should pass actual user ID
                                    orderItems: cart.map(item => ({
                                        name: item.name,
                                        qty: item.qty,
                                        image: item.images[0],
                                        price: item.price,
                                        product: item._id
                                    })),
                                    totalPrice: total
                                }),
                            });

                            clearCart();
                            alert("Payment successful! Order placed.");
                            navigate("/");
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error('Verification error', error);
                        alert("An error occurred during verification.");
                    }
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#b12a32",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            alert("Error initializing Razorpay");
        }
    };

    if (cart.length === 0) return (
        <div className="h-[75vh] flex flex-col items-center justify-center space-y-6 px-4">
            <div className="flex flex-col items-center">
                <span className="material-icons text-7xl text-gray-100 mb-4 scale-150">shopping_bag</span>
                <h1 className="text-3xl font-serif text-[#2d2a26] text-center">Your Bag is Empty</h1>
                <p className="text-gray-400 text-sm mt-3 text-center max-w-xs leading-relaxed">
                    Looks like you haven't added any traditional treasures to your bag yet.
                </p>
            </div>
            <Link to="/all-products" className="bg-[#b12a32] text-white px-12 py-4 rounded font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-black transition-all active:scale-95">
                Start Shopping
            </Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4 py-16">

                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Cart Items */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-end border-b border-gray-100 pb-8 mb-12">
                            <h1 className="text-4xl font-serif text-[#2d2a26]">Shopping Bag</h1>
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.3em]">{cart.length} distinct item(s)</p>
                        </div>

                        <div className="space-y-12">
                            {cart.map((item) => (
                                <div key={item._id} className="flex gap-6 md:gap-10 items-start group">
                                    <div className="w-24 md:w-40 aspect-[3/4] bg-gray-50 overflow-hidden flex-shrink-0">
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>

                                    <div className="flex-grow flex flex-col md:flex-row justify-between pt-2">
                                        <div className="space-y-2">
                                            <span className="text-[10px] text-red-700 uppercase font-bold tracking-widest">{item.category}</span>
                                            <h3 className="text-xl font-serif text-[#2d2a26] hover:text-red-700 transition-colors">
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </h3>
                                            <p className="text-xs text-gray-400 font-medium">Authentic Hand-woven Piece</p>

                                            {/* Quantity Control */}
                                            <div className="flex items-center space-x-6 pt-6">
                                                <div className="flex items-center border border-gray-200 rounded px-1">
                                                    <button onClick={() => removeFromCart(item)} className="p-2 text-gray-400 hover:text-red-700"><span className="material-icons text-sm">remove</span></button>
                                                    <span className="w-8 text-center text-xs font-bold text-gray-700">{item.qty}</span>
                                                    <button onClick={() => addToCart(item)} className="p-2 text-gray-400 hover:text-red-700"><span className="material-icons text-sm">add</span></button>
                                                </div>
                                                <button onClick={() => removeFromCart({ ...item, qty: 1 })} className="text-[10px] uppercase font-bold tracking-widest text-gray-300 hover:text-red-700 transition-colors underline-offset-4 hover:underline">Remove</button>
                                            </div>
                                        </div>

                                        <div className="pt-4 md:pt-2 md:text-right">
                                            <p className="text-xl font-medium text-gray-900 leading-none">₹{(item.price * item.qty).toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-tighter">₹{item.price.toLocaleString()} per unit</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                            <Link to="/all-products" className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-700 transition-all">
                                <span className="material-icons text-sm">west</span>
                                <span>Continue Shopping</span>
                            </Link>
                            <button onClick={clearCart} className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-700 transition-all">
                                Clear Entire Bag
                            </button>
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-gray-50 p-8 md:p-12 rounded sticky top-32">
                            <h3 className="text-xl font-serif text-[#2d2a26] mb-8 border-b pb-4">Order Summary</h3>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                    <span>Estimated Tax</span>
                                    <span className="text-gray-900">Included</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-gray-100 pt-8 mb-12">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2d2a26]">Total amount</span>
                                <span className="text-3xl font-medium text-[#b12a32]">₹{total.toLocaleString()}</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="w-full bg-[#b12a32] text-white py-5 rounded font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-black transition-all transform active:scale-95"
                            >
                                Proceed to Checkout
                            </button>

                            <div className="mt-8 flex flex-col items-center space-y-4">
                                <div className="flex space-x-4 opacity-40 grayscale">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
                                </div>
                                <p className="text-[9px] uppercase tracking-widest font-bold text-gray-300">Guaranteed Safe Checkout</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
