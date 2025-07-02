const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/query', async (req, res) => {
  const userQuery = req.body.query;

  try {
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `User asked: "${userQuery}". Identify product name, price filter, and aisle if applicable. Respond with a helpful short answer.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 200,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
      }
    );

    const assistantText = geminiRes.data.candidates[0].content.parts[0].text;
    res.json({ response: assistantText });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ response: 'Failed to process query.' });
  }
});

module.exports = router;
