const express = require('express');
const cors = require('cors');
const app = express();
// const mongoose = require("mongoose");
require('dotenv').config();
// console.log("✅ MONGO_URI from .env:", process.env.MONGO_URI);


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err.message));


app.use(cors({ origin: "*" })); 
app.use(express.json());

const assistantRoute = require('./routes/assistant');
app.use('/api', assistantRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
