// 📁 server/scripts/seedProducts.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const products = [
  { title: "Amul Butter 500g", price: 80, thumbnail: "https://i.imgur.com/2nCt3Sb.jpg", link: "https://www.walmart.com/ip/amul-butter-500g/123", aisle: "Dairy" },
  { title: "Britannia Cheese Slices", price: 120, thumbnail: "https://i.imgur.com/bz5zKzU.jpg", link: "https://www.walmart.com/ip/britannia-cheese/124", aisle: "Dairy" },
  { title: "Aashirvaad Atta 5kg", price: 230, thumbnail: "https://i.imgur.com/dRkUuLD.jpg", link: "https://www.walmart.com/ip/atta-5kg/125", aisle: "Grocery" },
  { title: "Tata Salt 1kg", price: 28, thumbnail: "https://i.imgur.com/x0JWz9Y.jpg", link: "https://www.walmart.com/ip/tata-salt/126", aisle: "Grocery" },
  { title: "Parle-G Biscuits 1kg", price: 50, thumbnail: "https://i.imgur.com/Ytk1FUb.jpg", link: "https://www.walmart.com/ip/parle-g/127", aisle: "Snacks" },
  { title: "Maggie Instant Noodles 420g", price: 60, thumbnail: "https://i.imgur.com/OsdoMGe.jpg", link: "https://www.walmart.com/ip/maggi/128", aisle: "Snacks" },
  { title: "Colgate Toothpaste 200g", price: 90, thumbnail: "https://i.imgur.com/wbq3eZq.jpg", link: "https://www.walmart.com/ip/colgate/129", aisle: "Personal Care" },
  { title: "Dove Soap Pack of 3", price: 150, thumbnail: "https://i.imgur.com/EUOeR4y.jpg", link: "https://www.walmart.com/ip/dove-soap/130", aisle: "Personal Care" },
  { title: "Surf Excel Detergent 2kg", price: 220, thumbnail: "https://i.imgur.com/v4pl7c2.jpg", link: "https://www.walmart.com/ip/surf-excel/131", aisle: "Cleaning Supplies" },
  { title: "Harpic Toilet Cleaner 500ml", price: 95, thumbnail: "https://i.imgur.com/USfP6Zw.jpg", link: "https://www.walmart.com/ip/harpic/132", aisle: "Cleaning Supplies" },

  // 🍿 Snacks & Beverages
  { title: "Pepsi 1.25L", price: 45, thumbnail: "https://i.imgur.com/AQ1OeWe.jpg", link: "https://www.walmart.com/ip/pepsi/133", aisle: "Beverages" },
  { title: "Lays Classic Salted 100g", price: 20, thumbnail: "https://i.imgur.com/zo7A8Ln.jpg", link: "https://www.walmart.com/ip/lays/134", aisle: "Snacks" },
  { title: "Red Bull 250ml", price: 110, thumbnail: "https://i.imgur.com/sXNch9N.jpg", link: "https://www.walmart.com/ip/red-bull/135", aisle: "Beverages" },

  // 🧼 Personal Care
  { title: "Head & Shoulders Shampoo 340ml", price: 260, thumbnail: "https://i.imgur.com/UnDuSnG.jpg", link: "https://www.walmart.com/ip/hns/136", aisle: "Personal Care" },
  { title: "Lifebuoy Handwash 190ml", price: 55, thumbnail: "https://i.imgur.com/UOM5VaC.jpg", link: "https://www.walmart.com/ip/lifebuoy/137", aisle: "Personal Care" },

  // 🍚 Grocery
  { title: "India Gate Basmati Rice 1kg", price: 140, thumbnail: "https://i.imgur.com/1ow6URr.jpg", link: "https://www.walmart.com/ip/indiagate/138", aisle: "Grocery" },
  { title: "MDH Kitchen King Masala 100g", price: 65, thumbnail: "https://i.imgur.com/KOPJdFD.jpg", link: "https://www.walmart.com/ip/mdh/139", aisle: "Grocery" },

  // 👶 Baby Care
  { title: "Pampers Diapers Small 20pcs", price: 310, thumbnail: "https://i.imgur.com/zxKcnri.jpg", link: "https://www.walmart.com/ip/pampers/140", aisle: "Baby Products" },
  { title: "Johnson Baby Powder 100g", price: 55, thumbnail: "https://i.imgur.com/YvMpzR6.jpg", link: "https://www.walmart.com/ip/johnson/141", aisle: "Baby Products" },

  // 🏠 Home Needs
  { title: "Plastic Bucket 15L", price: 110, thumbnail: "https://i.imgur.com/rS1Yj3L.jpg", link: "https://www.walmart.com/ip/bucket/142", aisle: "Home Essentials" },
  { title: "Floor Wiper Mop", price: 199, thumbnail: "https://i.imgur.com/D4pShdH.jpg", link: "https://www.walmart.com/ip/wiper/143", aisle: "Home Essentials" },

  // 🧃 Beverages & More snacks
  { title: "Real Mixed Fruit Juice 1L", price: 95, thumbnail: "https://i.imgur.com/wz13pP5.jpg", link: "https://www.walmart.com/ip/real/144", aisle: "Beverages" },
  { title: "Kurkure Masala Munch 100g", price: 20, thumbnail: "https://i.imgur.com/dMIRvHu.jpg", link: "https://www.walmart.com/ip/kurkure/145", aisle: "Snacks" }

  // 🔁 (Repeat similar pattern up to 100 entries)
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Database seeded with sample products.");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
}

// seed();
