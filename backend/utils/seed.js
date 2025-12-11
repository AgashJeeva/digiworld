require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await Product.deleteMany({});

    const admin = await User.create({
      name: 'DIGI Admin',
      email: process.env.ADMIN_EMAIL || 'admin@digiworld.com',
      password: process.env.ADMIN_PASS || 'admin123',
      role: 'admin'
    });

    const phone = await Product.create({
      name: 'DigiPhone X',
      brand: 'DigiBrand',
      category: 'phone',
      description: 'Flagship phone with multiple RAM/storage/color options.',
      basePrice: 99900,
      options: [
        {
          ram: '8GB',
          storage: '128GB',
          variants: [
            { color: 'Black', stock: 10 },
            { color: 'Blue', stock: 3 },
            { color: 'White', stock: 8 }
          ]
        },
        {
          ram: '12GB',
          storage: '256GB',
          variants: [
            { color: 'Black', stock: 2 },
            { color: 'Blue', stock: 1 }
          ]
        }
      ],
      accessories: [
        { name: 'Fast Charger 30W', category: 'charger', colors: ['White'], stock: 12, price: 4990 },
        { name: 'DigiCable USB-C', category: 'cable', colors: ['Black','White'], stock: 20, price: 990 }
      ],
      globalStock: 60,
      featured: true
    });

    const laptop = await Product.create({
      name: 'DigiBook Pro 14',
      brand: 'DigiBrand',
      category: 'laptop',
      description: '14-inch performance laptop',
      basePrice: 249900,
      options: [
        {
          ram: '16GB',
          storage: '512GB',
          variants: [{ color: 'Silver', stock: 5 }]
        },
        {
          ram: '32GB',
          storage: '1TB',
          variants: [{ color: 'Space Gray', stock: 2 }]
        }
      ],
      accessories: [
        { name: 'USB-C Adapter', category: 'accessory', colors: ['Gray'], stock: 8, price: 3490 }
      ],
      globalStock: 20
    });

    console.log('Seeded admin:', admin.email);
    console.log('Seeded products: DigiPhone X and DigiBook Pro 14');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
};

seed();
