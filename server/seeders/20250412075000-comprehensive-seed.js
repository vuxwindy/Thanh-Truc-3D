'use strict';
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Create roles if they don't exist yet
      try {
        await queryInterface.bulkInsert('roles', [
          {
            role_name: 'admin',
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            role_name: 'customer',
            created_at: new Date(),
            updated_at: new Date()
          }
        ], { ignoreDuplicates: true });
        console.log('Roles seeded successfully');
      } catch (error) {
        console.log('Roles may already exist, continuing...', error.message);
      }

      // Create categories
      try {
        const categoryNames = [
          'Electronics', 'Clothing', 'Home & Kitchen', 'Books', 
          'Sports & Outdoors', 'Beauty & Personal Care', 'Toys & Games', 
          'Health & Household', 'Automotive', 'Office Products'
        ];
        
        await queryInterface.bulkInsert('categories', 
          categoryNames.map((name) => ({
            name,
            created_at: new Date(),
            updated_at: new Date()
          })),
          { ignoreDuplicates: true }
        );
        console.log('Categories seeded successfully');
      } catch (error) {
        console.log('Error seeding categories, continuing...', error.message);
      }

      // Create users
      try {
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        // Create admin user
        await queryInterface.bulkInsert('users', [{
          fullName: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword,
          address: '123 Admin St',
          country: 'Vietnam',
          city: 'Hanoi',
          phone: '0987654321',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          created_at: new Date(),
          updated_at: new Date()
        }], { ignoreDuplicates: true });

        // Create customer users
        const customerUsers = Array.from({ length: 20 }, () => ({
          fullName: faker.person.fullName(),
          email: faker.internet.email(),
          password: hashedPassword,
          address: faker.location.streetAddress(),
          country: faker.location.country(),
          city: faker.location.city(),
          phone: faker.phone.number(),
          avatar: faker.image.avatar(),
          created_at: new Date(),
          updated_at: new Date()
        }));
        
        await queryInterface.bulkInsert('users', customerUsers, { ignoreDuplicates: true });
        console.log('Users seeded successfully');
      } catch (error) {
        console.log('Error seeding users, continuing...', error.message);
      }

      // Get user and role IDs to create associations
      try {
        // Check if user_roles table exists 
        const tableExists = await queryInterface.sequelize.query(
          "SELECT table_name FROM information_schema.tables WHERE table_schema = 'web2d' AND table_name = 'user_roles'",
          { type: Sequelize.QueryTypes.SELECT }
        );
        
        if (tableExists.length > 0) {
          const users = await queryInterface.sequelize.query(
            'SELECT id FROM users',
            { type: Sequelize.QueryTypes.SELECT }
          );
          
          const roles = await queryInterface.sequelize.query(
            'SELECT id, role_name FROM roles',
            { type: Sequelize.QueryTypes.SELECT }
          );
          
          if (users.length > 0 && roles.length > 0) {
            const adminRole = roles.find(role => role.role_name === 'admin');
            const customerRole = roles.find(role => role.role_name === 'customer');
            
            if (adminRole && customerRole) {
              // Assign roles to users
              const userRoles = [
                // First user is admin
                {
                  user_id: users[0].id,
                  role_id: adminRole.id,
                  created_at: new Date(),
                  updated_at: new Date()
                },
                // Rest are customers
                ...users.slice(1).map(user => ({
                  user_id: user.id,
                  role_id: customerRole.id,
                  created_at: new Date(),
                  updated_at: new Date()
                }))
              ];
              
              await queryInterface.bulkInsert('user_roles', userRoles, { ignoreDuplicates: true });
              console.log('User roles seeded successfully');
            }
          }
        } else {
          console.log('user_roles table does not exist, skipping user roles creation');
        }
      } catch (error) {
        console.log('Error assigning roles to users, continuing...', error.message);
      }

      // Get category IDs to create products
      try {
        const categories = await queryInterface.sequelize.query(
          'SELECT id FROM categories',
          { type: Sequelize.QueryTypes.SELECT }
        );
        
        if (categories.length > 0) {
          // Create products (10 products per category)
          const products = [];
          
          for (const category of categories) {
            for (let i = 0; i < 10; i++) {
              const priceOrigin = parseFloat(faker.commerce.price({ min: 10, max: 500 }));
              const discountPercent = Math.random() < 0.7 ? Math.floor(Math.random() * 30) : 0; // 70% chance of discount
              const priceSale = discountPercent === 0 
                ? priceOrigin 
                : parseFloat((priceOrigin * (1 - discountPercent / 100)).toFixed(2));
              
              products.push({
                name: faker.commerce.productName(),
                image: `https://source.unsplash.com/random/800x600?product=${i}`,
                type: Math.floor(Math.random() * 3) + 1,
                description: faker.commerce.productDescription(),
                link: faker.internet.url(),
                is_hot: Math.random() < 0.2, // 20% chance
                is_new: Math.random() < 0.3, // 30% chance
                priceSale,
                priceOrigin,
                category_id: category.id,
                created_at: new Date(),
                updated_at: new Date()
              });
            }
          }
          
          await queryInterface.bulkInsert('products', products, { ignoreDuplicates: true });
          console.log('Products seeded successfully');
        }
      } catch (error) {
        console.log('Error seeding products, continuing...', error.message);
      }

      // Create banners
      try {
        const banners = Array.from({ length: 5 }, (_, i) => ({
          image: `https://source.unsplash.com/random/1200x400?banner=${i+1}`,
          link: faker.internet.url(),
          order: i + 1,
          created_at: new Date(),
          updated_at: new Date()
        }));
        
        await queryInterface.bulkInsert('banners', banners, { ignoreDuplicates: true });
        console.log('Banners seeded successfully');
      } catch (error) {
        console.log('Error seeding banners, continuing...', error.message);
      }

      // Create posts
      try {
        const users = await queryInterface.sequelize.query(
          'SELECT id FROM users',
          { type: Sequelize.QueryTypes.SELECT }
        );
        
        if (users.length > 0) {
          const posts = Array.from({ length: 15 }, () => ({
            content: faker.lorem.paragraphs(5),
            user_id: users[Math.floor(Math.random() * users.length)].id,
            created_at: new Date(),
            updated_at: new Date()
          }));
          
          await queryInterface.bulkInsert('posts', posts, { ignoreDuplicates: true });
          console.log('Posts seeded successfully');
        }
      } catch (error) {
        console.log('Error seeding posts, continuing...', error.message);
      }

      // Create cart items for some users
      try {
        const users = await queryInterface.sequelize.query(
          'SELECT id FROM users LIMIT 10',
          { type: Sequelize.QueryTypes.SELECT }
        );
        
        const products = await queryInterface.sequelize.query(
          'SELECT id FROM products',
          { type: Sequelize.QueryTypes.SELECT }
        );
        
        if (users.length > 0 && products.length > 0) {
          const cartItems = [];
          
          for (const user of users.slice(1)) { // Skip admin user
            const numItems = Math.floor(Math.random() * 5) + 1; // 1-5 items per cart
            
            for (let i = 0; i < numItems; i++) {
              const randomProduct = products[Math.floor(Math.random() * products.length)];
              
              cartItems.push({
                user_id: user.id,
                product_id: randomProduct.id,
                quantity: Math.floor(Math.random() * 3) + 1, // 1-3 quantity
                created_at: new Date(),
                updated_at: new Date()
              });
            }
          }
          
          if (cartItems.length > 0) {
            await queryInterface.bulkInsert('cart_items', cartItems, { ignoreDuplicates: true });
            console.log('Cart items seeded successfully');
          }
        }
      } catch (error) {
        console.log('Error seeding cart items, continuing...', error.message);
      }

      // Check if orders table has the expected structure
      try {
        const describeOrdersResult = await queryInterface.sequelize.query(
          'DESCRIBE orders',
          { type: Sequelize.QueryTypes.RAW }
        );
        
        const orderColumns = describeOrdersResult[0].map(col => col.Field);
        console.log('Order table columns:', orderColumns);
        
        // If orders table exists with the expected columns, create orders
        if (orderColumns.includes('id')) {
          const users = await queryInterface.sequelize.query(
            'SELECT id FROM users LIMIT 15',
            { type: Sequelize.QueryTypes.SELECT }
          );
          
          const products = await queryInterface.sequelize.query(
            'SELECT id, priceSale FROM products',
            { type: Sequelize.QueryTypes.SELECT }
          );
          
          if (users.length > 0 && products.length > 0) {
            for (const user of users.slice(1)) { // Skip admin user
              const numOrders = Math.floor(Math.random() * 3) + 1; // 1-3 orders per user
              
              for (let i = 0; i < numOrders; i++) {
                const orderDate = faker.date.past({ years: 1 });
                const numProducts = Math.floor(Math.random() * 4) + 1; // 1-4 products per order
                let totalAmount = 0;
                
                // Calculate total price first by looping through products
                for (let j = 0; j < numProducts; j++) {
                  const randomProduct = products[Math.floor(Math.random() * products.length)];
                  const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
                  const price = parseFloat(randomProduct.priceSale);
                  totalAmount += price * quantity;
                }

                // Create the order with the correct column structure
                const orderData = {
                  cid: user.id, // Using cid instead of user_id based on Order model
                  payment_method: Math.floor(Math.random() * 2) + 1, // 1 or 2 (integer)
                  price: totalAmount,
                  status: ['pending', 'processing', 'completed'][Math.floor(Math.random() * 3)],
                  transaction_id: faker.string.uuid(),
                  created_at: new Date(orderDate),
                  updated_at: new Date(orderDate)
                };
                
                // Insert order and get its ID
                const [orderId] = await queryInterface.sequelize.query(
                  `INSERT INTO orders (cid, payment_method, price, status, transaction_id, created_at, updated_at) 
                   VALUES (:cid, :payment_method, :price, :status, :transaction_id, :created_at, :updated_at)`,
                  {
                    replacements: orderData,
                    type: Sequelize.QueryTypes.INSERT
                  }
                );
                
                // Get order_products table structure
                const describeOrderProductsResult = await queryInterface.sequelize.query(
                  'DESCRIBE order_products',
                  { type: Sequelize.QueryTypes.RAW }
                );
                
                const orderProductColumns = describeOrderProductsResult[0].map(col => col.Field);
                console.log('Order products columns:', orderProductColumns);
                
                // Create order products with correct column structure
                for (let j = 0; j < numProducts; j++) {
                  const randomProduct = products[Math.floor(Math.random() * products.length)];
                  const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
                  const price = parseFloat(randomProduct.priceSale);
                  
                  // Use the correct column names from the actual table
                  const orderProductData = {
                    order_id: orderId,
                    product_id: randomProduct.id
                  };
                  
                  // Add optional columns if they exist
                  if (orderProductColumns.includes('quantity')) {
                    orderProductData.quantity = quantity;
                  }
                  
                  if (orderProductColumns.includes('price')) {
                    orderProductData.price = price;
                  }
                  
                  if (orderProductColumns.includes('licence')) {
                    orderProductData.licence = faker.string.alphanumeric(10).toUpperCase();
                  }
                  
                  if (orderProductColumns.includes('created_at')) {
                    orderProductData.created_at = new Date(orderDate);
                  }
                  
                  if (orderProductColumns.includes('updated_at')) {
                    orderProductData.updated_at = new Date(orderDate);
                  }
                  
                  // Generate column names and placeholders for query
                  const opColumns = Object.keys(orderProductData).join(', ');
                  const opPlaceholders = Object.keys(orderProductData).map(key => `:${key}`).join(', ');
                  
                  await queryInterface.sequelize.query(
                    `INSERT INTO order_products (${opColumns}) VALUES (${opPlaceholders})`,
                    {
                      replacements: orderProductData,
                      type: Sequelize.QueryTypes.INSERT
                    }
                  );
                }
              }
            }
            console.log('Orders and order products seeded successfully');
          }
        }
      } catch (error) {
        console.log('Error seeding orders, continuing...', error.message);
      }

      console.log('Seeding completed successfully!');
    } catch (error) {
      console.error('Error in main seeding process:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Delete all seeded data in reverse order to avoid foreign key constraints
      await queryInterface.bulkDelete('messages', null, {});
      await queryInterface.bulkDelete('conversations', null, {});
      await queryInterface.bulkDelete('order_products', null, {});
      await queryInterface.bulkDelete('orders', null, {});
      await queryInterface.bulkDelete('cart_items', null, {});
      await queryInterface.bulkDelete('posts', null, {});
      await queryInterface.bulkDelete('banners', null, {});
      await queryInterface.bulkDelete('products', null, {});
      await queryInterface.bulkDelete('user_roles', null, {});
      await queryInterface.bulkDelete('users', null, {});
      await queryInterface.bulkDelete('categories', null, {});
      await queryInterface.bulkDelete('roles', null, {});
    } catch (error) {
      console.error('Error in undo seeding process:', error);
    }
  }
}; 