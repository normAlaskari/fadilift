const express = require('express');
const app = express();
const stripe = require('stripe')('your-stripe-secret-key'); // Replace with your Stripe secret key

app.use(express.json());
app.use(express.static('public')); // This line tells Express to serve static files from the 'public' directory

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd', // You can change the currency if needed
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
