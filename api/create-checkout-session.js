const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
  return res.status(400).json({
    error: "Cart is empty."
  });
}

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: items.map(item => ({
        price_data: {
          currency: "usd",

          product_data: {
         name: item.name,
          description: `Size: ${item.size}`
          },

          unit_amount: item.price * 100
        },

        quantity: item.quantity
      })),

      mode: "payment",

      success_url:
        "https://ssmodal2025.com/success.html",

      cancel_url:
        "https://ssmodal2025.com/PAGE4.html"
    });

    res.status(200).json({
      id: session.id,
      url: session.url
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
};