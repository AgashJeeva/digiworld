const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: "iPhone 15 Pro Titanium",
    brand: "Apple",
    category: "phone",
    description: "The ultimate iPhone with titanium design and A17 Pro chip.",
    basePrice: 999,
    image: "/images/products/iphone.png",
    options: [
      {
        ram: "8GB",
        storage: "256GB",
        variants: [{ color: "Natural Titanium", stock: 50 }]
      }
    ],
    featured: true
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "phone",
    description: "Galaxy AI is here. Epic titanium design.",
    basePrice: 1299,
    image: "/images/products/samsung.png",
    options: [
      {
        ram: "12GB",
        storage: "512GB",
        variants: [{ color: "Titanium Grey", stock: 45 }]
      }
    ],
    featured: true
  },
  {
    name: "MacBook Pro 14 M3",
    brand: "Apple",
    category: "laptop",
    description: "Mind-blowing. Head-turning. With M3 Pro chip.",
    basePrice: 1599,
    image: "/images/products/macbook.png",
    options: [
      {
        ram: "18GB",
        storage: "512GB",
        variants: [{ color: "Space Black", stock: 30 }]
      }
    ],
    featured: true
  },
  {
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    category: "laptop",
    description: "Twice as powerful as before in the same size.",
    basePrice: 1399,
    image: "/images/products/dell.png",
    options: [
      {
        ram: "16GB",
        storage: "1TB",
        variants: [{ color: "Platinum", stock: 20 }]
      }
    ]
  },
  {
    name: "iPad Air 5",
    brand: "Apple",
    category: "tablet",
    description: "Light. Bright. Full of might.",
    basePrice: 599,
    image: "/images/products/ipad.png",
    options: [
      {
        ram: "8GB",
        storage: "64GB",
        variants: [{ color: "Blue", stock: 40 }]
      }
    ]
  }
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/digiworld";
    await mongoose.connect(uri);
    console.log("Connected to DB");

    await Product.deleteMany({});
    console.log("Cleared Products");

    await Product.insertMany(products);
    console.log("Seeded Products");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
