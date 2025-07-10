// 📁 server/routes/assistant.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// const Product = require("../models/Product"); // MongoDB model

router.post("/query", async (req, res) => {
  const userQuery = req.body.query?.toLowerCase();

  try {
    // 🧠 Fetch all products from MongoDB
    // const allProducts = await Product.find();

    // // 🧾 Format product info for Groq context
    // const inventoryList = allProducts.map(p =>
    //   `- ${p.title} – ₹${p.price} – ${p.aisle}`
    // ).join("\n");

    // 🔁 Send user query + dynamic inventory to Groq
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `You are a helpful shopping assistant. Consider yourself as a Walmart store all-in-one guide. Respond helpfully to the user's shopping queries based on this list. You can add some marketing strategy to persuade the user to buy the products. Respond quickly in words and keep it short under 20 seconds`
          },
          {
            role: "user",
            content: userQuery
          }
        ],
        temperature: 0.6,
        max_tokens: 300
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    const reply = groqRes.data.choices?.[0]?.message?.content;

    res.json({ response: reply }); // 💬 Return Groq's natural reply as-is

  } catch (err) {
    console.error("❌ Groq Assistant error:", err.response?.data || err.message);
    res.status(500).json({ response: "Internal server error. Please try again." });
  }
});

module.exports = router;


//Here is the full list of available products with their titles, prices, and aisles:\n\n${inventoryList}\n\n