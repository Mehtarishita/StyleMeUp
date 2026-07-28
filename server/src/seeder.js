import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Review from './models/Review.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('Database already seeded. Skipping...');
      return;
    }

    console.log('Seeding initial data...');
    await Product.deleteMany();
    await Category.deleteMany();
    await Review.deleteMany();

    console.log('Inserting Categories...');
    const categories = await Category.insertMany([
      { name: 'Tops', slug: 'tops' },
      { name: 'Bottoms', slug: 'bottoms' },
      { name: 'Dresses', slug: 'dresses' },
      { name: 'Outerwear', slug: 'outerwear' },
      { name: 'Accessories', slug: 'accessories' },
    ]);

    console.log('Generating Products...');
    const productsToInsert = [];
    
    const brands = ['Urbanic', 'Zara', 'H&M', 'Myntra', 'Ajio', 'Nike', 'Adidas', 'Mango'];
    const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Beige', 'Pink', 'Navy'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const occasions = ['Casual', 'Formal', 'Party', 'Streetwear', 'Ethnic', 'Workout'];
    const seasons = ['Summer', 'Winter', 'Spring', 'Fall', 'All Season'];

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomSubarray = (arr, size) => {
      let shuffled = arr.slice(0), i = arr.length, temp, index;
      while (i--) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(0, size);
    };

    // Generate 50 products
    for (let i = 1; i <= 50; i++) {
      const cat = getRandom(categories);
      let gender = Math.random() > 0.5 ? 'Women' : 'Men';
      if (Math.random() > 0.8) gender = 'Unisex';
      
      const isDiscounted = Math.random() > 0.7;
      const basePrice = Math.floor(Math.random() * 4000) + 500;
      const price = isDiscounted ? Math.floor(basePrice * 0.8) : basePrice;
      const originalPrice = isDiscounted ? basePrice : undefined;

      const randomTags = getRandomSubarray(['trending', 'new arrival', 'bestseller', 'sustainable', 'vintage', 'premium'], 2);

      const categoryImages = {
        'Tops': [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
          'https://images.unsplash.com/photo-1434389678241-11d8b671a52b?w=400&q=80',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80'
        ],
        'Bottoms': [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80',
          'https://images.unsplash.com/photo-1584865288642-42078afe6942?w=400&q=80',
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80'
        ],
        'Dresses': [
          'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
          'https://images.unsplash.com/photo-1515347619152-15949d970e28?w=400&q=80'
        ],
        'Outerwear': [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
          'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=400&q=80'
        ],
        'Accessories': [
          'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&q=80',
          'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80',
          'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80'
        ]
      };

      const selectedImages = categoryImages[cat.name] || categoryImages['Tops'];
      
      productsToInsert.push({
        name: `${getRandom(['Classic', 'Oversized', 'Slim Fit', 'Vintage', 'Premium', 'Basic'])} ${cat.name} - ${i}`,
        description: `This is a high-quality ${cat.name.toLowerCase()} perfect for ${getRandom(occasions).toLowerCase()} wear. Made with premium materials ensuring comfort and durability. Style it with your favorite pieces to complete the look.`,
        category: cat._id,
        brand: getRandom(brands),
        gender,
        colors: getRandomSubarray(colors, Math.floor(Math.random() * 3) + 1),
        sizes: getRandomSubarray(sizes, Math.floor(Math.random() * 4) + 2),
        price,
        originalPrice,
        occasion: [getRandom(occasions)],
        season: [getRandom(seasons)],
        images: [getRandom(selectedImages)],
        stock: Math.floor(Math.random() * 100),
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
        numReviews: Math.floor(Math.random() * 50),
        tags: randomTags
      });
    }

    await Product.insertMany(productsToInsert);
    console.log('Data Imported Successfully!');
  } catch (error) {
    console.error(`Error with seeder: ${error}`);
  }
};

// If run directly via "npm run seed"
if (process.argv[1].endsWith('seeder.js')) {
  const runDirectly = async () => {
    await connectDB();
    await seedDatabase();
    process.exit();
  };
  runDirectly();
}
