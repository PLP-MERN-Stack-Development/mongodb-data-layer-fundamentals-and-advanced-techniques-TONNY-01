// queries.js - MongoDB queries for the PLP Bookstore

const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';

// Main function to run queries
async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB server');

    const db = client.db(dbName);
    const collection = db.collection('books');

    // --- Task 2: Basic Queries ---
    console.log('\n--- Task 2: Basic Queries ---');

    // Find all books in a specific genre (e.g., 'Fiction')
    const fictionBooks = await collection.find({ genre: 'Fiction' }).toArray();
    console.log('\nBooks in Fiction genre:', fictionBooks.length);

    // Find books published after a certain year (e.g., 1950)
    const recentBooks = await collection.find({ published_year: { $gt: 1950 } }).toArray();
    console.log('\nBooks published after 1950:', recentBooks.length);

    // Find books by a specific author (e.g., 'George Orwell')
    const orwellBooks = await collection.find({ author: 'George Orwell' }).toArray();
    console.log(`\nBooks by George Orwell:`, orwellBooks.map(b => b.title));

    // Update the price of a specific book (e.g., '1984')
    await collection.updateOne({ title: '1984' }, { $set: { price: 11.99 } });
    console.log('\nUpdated price for "1984"');

    // Delete a book by its title (e.g., 'Moby Dick')
    await collection.deleteOne({ title: 'Moby Dick' });
    console.log('\nDeleted "Moby Dick"');

    // --- Task 3: Advanced Queries ---
    console.log('\n--- Task 3: Advanced Queries ---');

    // Find books that are in stock and published after 2010 (Note: sample data has none, let's use 1980)
    const inStockAndRecent = await collection.find({ in_stock: true, published_year: { $gt: 1980 } }).toArray();
    console.log('\nIn-stock books published after 1980:', inStockAndRecent.map(b => b.title));

    // Projection: return only title, author, and price
    const projectedBooks = await collection.find({}).project({ title: 1, author: 1, price: 1, _id: 0 }).toArray();
    console.log('\nProjected book data (first 3):', projectedBooks.slice(0, 3));

    // Sorting: display books by price (ascending)
    const sortedAsc = await collection.find().sort({ price: 1 }).limit(5).toArray();
    console.log('\nBooks sorted by price (ascending, first 5):', sortedAsc.map(b => `${b.title}: $${b.price}`));

    // Sorting: display books by price (descending)
    const sortedDesc = await collection.find().sort({ price: -1 }).limit(5).toArray();
    console.log('\nBooks sorted by price (descending, first 5):', sortedDesc.map(b => `${b.title}: $${b.price}`));

    // Pagination: 5 books per page (e.g., page 2)
    const page = 2;
    const pageSize = 5;
    const paginatedBooks = await collection.find().skip((page - 1) * pageSize).limit(pageSize).toArray();
    console.log(`\nPaginated books (Page ${page}):`, paginatedBooks.map(b => b.title));

    // --- Task 4: Aggregation Pipeline ---
    console.log('\n--- Task 4: Aggregation Pipeline ---');

    // Average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
    ]).toArray();
    console.log('\nAverage price by genre:', avgPriceByGenre);

    // Author with the most books
    const authorWithMostBooks = await collection.aggregate([
      { $group: { _id: '$author', bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('\nAuthor with the most books:', authorWithMostBooks);

    // Group books by publication decade
    const booksByDecade = await collection.aggregate([
      {
        $group: {
          _id: { $subtract: [ '$published_year', { $mod: ['$published_year', 10] } ] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log('\nBooks grouped by decade:', booksByDecade);

    // --- Task 5: Indexing ---
    console.log('\n--- Task 5: Indexing ---');

    // Create an index on the 'title' field
    await collection.createIndex({ title: 1 });
    console.log('\nCreated index on "title"');

    // Create a compound index on 'author' and 'published_year'
    await collection.createIndex({ author: 1, published_year: -1 });
    console.log('\nCreated compound index on "author" and "published_year"');


  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

// Run the queries
runQueries().catch(console.error);
