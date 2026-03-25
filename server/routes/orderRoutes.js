import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { user, orderItems, totalPrice } = req.body;
        const order = new Order({
            user,
            orderItems,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/create-razorpay-order", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post("/verify-payment", async (req, res) => {
    try {
        const {
            orderCreationId, // The razorpay order ID generated previously
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            mongoOrderId
        } = req.body;

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature) {
            return res.status(400).json({ msg: "Transaction not legit!" });
        }

        if (mongoOrderId) {
            const order = await Order.findById(mongoOrderId);
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.razorpay = {
                    orderId: razorpayOrderId,
                    paymentId: razorpayPaymentId,
                    signature: razorpaySignature,
                };
                await order.save();
            }
        }

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default router;
