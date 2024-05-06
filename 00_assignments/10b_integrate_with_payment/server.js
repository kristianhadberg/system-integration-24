// import express from "express";
// import stripe from "stripe";

// import { loadStripe } from "@stripe/stripe-js";

const express = require("express");

// const stripe = await loadStripe('pk_test_51PDNMvP81iSojcap9CUQX57hhSQrF3R3Cr4L7G5rsZrJF8SQgNOXxPfD7eAGTtUclogKlY3z67jvknK3lkMc2HZY00QjWeVpQe');

const app = express();
// This is your test secret API key.
// const stripe = await loadStripe("sk_test_51PDNMvP81iSojcapeRtKfMY0iKIbB1ipA7RsI1fPzYTKb281yliG5OADk2s0rzRDARhEQbCjPq1qIt2d44chs8N700iY4mQ1is");
const stripe = require("stripe")("sk_test_51PDNMvP81iSojcapeRtKfMY0iKIbB1ipA7RsI1fPzYTKb281yliG5OADk2s0rzRDARhEQbCjPq1qIt2d44chs8N700iY4mQ1is");

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
    let price = 0;

    items.forEach((element) => {
        price += element.price;
    });

    return price;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "dkk",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

const PORT = 4242;
app.listen(PORT, () => console.log(`Listening on port:`, PORT));
