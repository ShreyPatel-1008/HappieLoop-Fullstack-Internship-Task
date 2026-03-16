require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest Apple iPhone with A17 Pro chip, titanium design, and pro-grade 48MP camera system. Experience the pinnacle of smartphone innovation.',
    price: 129999,
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    stock: 25,
    category: 'Electronics'
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality, 30-hour battery life, and ultra-comfortable fit.',
    price: 29990,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    stock: 40,
    category: 'Electronics'
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description: 'Advanced smartwatch with BioActive sensor, GPS tracking, sleep coaching, and a stunning Super AMOLED display. Stay connected in style.',
    price: 34999,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    stock: 30,
    category: 'Electronics'
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft 100% organic cotton t-shirt with a relaxed modern fit. Breathable fabric perfect for everyday comfort and effortless style.',
    price: 1499,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    stock: 100,
    category: 'Clothing'
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket crafted from premium selvedge denim with antique brass buttons. A wardrobe essential that gets better with age.',
    price: 3999,
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    stock: 50,
    category: 'Clothing'
  },
  {
    name: 'Nike Air Max Running Shoes',
    description: 'Lightweight and responsive running shoes with visible Air Max cushioning unit. Engineered mesh upper for breathability and support.',
    price: 8995,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    stock: 60,
    category: 'Clothing'
  },
  {
    name: 'MacBook Pro 16" M3 Max',
    description: 'The most powerful MacBook ever. Featuring the M3 Max chip, a stunning Liquid Retina XDR display, and up to 22 hours of battery life for professionals.',
    price: 349900,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&h=400&fit=crop',
    stock: 15,
    category: 'Electronics'
  },
  {
    name: 'Kindle Paperwhite',
    description: 'Now with a 6.8" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
    price: 14999,
    image_url: 'https://images.unsplash.com/photo-1594980596271-e33927f1c02e?w=400&h=400&fit=crop',
    stock: 45,
    category: 'Electronics'
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'Tactile and clicky mechanical switches with customizable RGB backlighting. Durable aluminum top plate for long-lasting gaming performance.',
    price: 5999,
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop',
    stock: 35,
    category: 'Electronics'
  },
  {
    name: 'Leather Messenger Bag',
    description: 'Handcrafted from genuine top-grain leather. Features a padded laptop compartment and multiple pockets for organized daily commuting.',
    price: 4500,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    stock: 20,
    category: 'Clothing'
  },
  {
    name: 'Polarized Aviator Sunglasses',
    description: 'Classic aviator style with polarized lenses that reduce glare and provide 100% UV protection. Lightweight stainless steel frames.',
    price: 2499,
    image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    stock: 55,
    category: 'Clothing'
  },
  {
    name: 'Wool Blend Pea Coat',
    description: 'Elegant and warm wool-blend pea coat with a double-breasted front and quilted lining. A sophisticated choice for cold weather.',
    price: 7999,
    image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
    stock: 25,
    category: 'Clothing'
  },
  {
    name: 'Sapiens: A Brief History of Humankind',
    description: 'Yuval Noah Harari explores the history of our species, from the first humans to walk the earth to the radical breakthroughs of the modern age.',
    price: 450,
    image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop',
    stock: 120,
    category: 'Books'
  },
  {
    name: 'Thinking, Fast and Slow',
    description: 'Daniel Kahneman, a Nobel Prize winner, explains the two systems that drive the way we think—System 1 (fast/intuitive) and System 2 (slow/logical).',
    price: 550,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    stock: 90,
    category: 'Books'
  },
  {
    name: 'Deep Work',
    description: 'Cal Newport presents the key to professional success in an increasingly distracted world: the ability to focus without distraction on cognitively demanding tasks.',
    price: 399,
    image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop',
    stock: 110,
    category: 'Books'
  },
  {
    name: 'Ceramic Pour-Over Coffee Maker',
    description: 'Elegant ceramic dripper for brewing smooth, rich coffee. Retains heat perfectly for the ultimate professional-grade manual brewing experience.',
    price: 1899,
    image_url: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=400&h=400&fit=crop',
    stock: 30,
    category: 'Home & Kitchen'
  },
  {
    name: 'Cast Iron Skillet',
    description: 'Pre-seasoned 12-inch cast iron skillet. Perfect for searing, sautéing, baking, and roasting. Built to last for generations of home cooking.',
    price: 3200,
    image_url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&h=400&fit=crop',
    stock: 25,
    category: 'Home & Kitchen'
  },
  {
    name: 'Electric Gooseneck Kettle',
    description: 'Precision-pour gooseneck spout for optimal coffee extraction. Features variable temperature control and a sleek matte black finish.',
    price: 4999,
    image_url: 'https://images.unsplash.com/photo-1577939756451-0937aeb2946c?w=400&h=400&fit=crop',
    stock: 20,
    category: 'Home & Kitchen'
  }
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
    await mongoose.connect(uri);
    console.log('📦 MongoDB connected for seeding...\n');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products.');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${inserted.length} products!\n`);

    inserted.forEach(p => {
      console.log(`   • ${p.name} (${p.category}) — ₹${p.price.toLocaleString('en-IN')}`);
    });

    await mongoose.connection.close();
    console.log('\n🔒 Database connection closed. Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
