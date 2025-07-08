// 📁 server/routes/assistant.js (using Groq instead of Gemini)

const express = require("express");
const axios = require("axios");
const router = express.Router();
const stringSimilarity = require("string-similarity");
require("dotenv").config();

const Product = require("../models/Product");
const cart = [];

router.post("/query", async (req, res) => {
  const userQuery = req.body.query?.toLowerCase();

  try {
    // 🧠 Step 1: Use Groq to extract JSON structure from query
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // recommended stable model
        messages: [
          {
            role: "user",
            content: `From this user query: "${userQuery}", extract only valid raw JSON like:
{
  "product": "string",
  "max_price": number (optional),
  "category": "string" (optional),
  "add_to_cart": boolean (optional)
}
Do not explain or add any text. Only return JSON, no preamble, no markdown.`
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    const aiText = groqRes.data.choices?.[0]?.message?.content || "";
    console.log("🧠 Groq response:", aiText);

    // Step 2: Parse the JSON safely
    let parsed;
    try {
      parsed = JSON.parse(aiText.trim());
    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      return res.status(500).json({ response: "Groq returned invalid JSON. Try again." });
    }

    const { product, max_price, category, add_to_cart } = parsed;
    const allProducts = await Product.find();
    let results = allProducts;

    // Step 3: Fuzzy match category
    if (typeof category === "string") {
      const aisleNames = [...new Set(allProducts.map(p => p.aisle))].filter(Boolean);
      if (aisleNames.length > 0) {
        const match = stringSimilarity.findBestMatch(category, aisleNames);
        const bestMatch = match.bestMatch.target;
        console.log(`🎯 Best aisle match for "${category}": ${bestMatch}`);
        results = results.filter(p => p.aisle === bestMatch);
      }
    }

    // Step 4: Fuzzy match product if no category
    if (!category && typeof product === "string") {
      const scores = stringSimilarity.findBestMatch(product, allProducts.map(p => p.title));
      results = scores.ratings
        .map((r, i) => ({ ...allProducts[i]._doc, score: r.rating }))
        .filter(p => p.score > 0.3);
    }

    // Step 5: Filter by max_price
    if (typeof max_price === "number") {
      results = results.filter(p => p.price <= max_price);
    }

    results.sort((a, b) => a.price - b.price);

    if (results.length === 0) {
      return res.json({ response: `❌ No results found for "${product || category}" under ₹${max_price || "your budget"}.` });
    }

    const top = results[0];

    // Step 6: Handle cart
    if (add_to_cart && product) {
      cart.push(top);
    }

    res.json({
      response: `${category ? `Category: ${category}` : `Top match: ${top.title}`} in ${top.aisle} for ₹${top.price}.`,
      title: top.title,
      price: `₹${top.price}`,
      image: top.thumbnail,
      link: top.link,
      other_matches: results.slice(1, 3).map(p => ({
        title: p.title,
        price: `₹${p.price}`,
        aisle: p.aisle
      })),
      cart_count: cart.length
    });

  } catch (err) {
    console.error("❌ Assistant error:", err.response?.data || err.message);
    res.status(500).json({ response: "Internal error in assistant logic." });
  }
});

module.exports = router;
