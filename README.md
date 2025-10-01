# MongoDB Fundamentals - Week 1

## Setup Instructions

Before you begin this assignment, please make sure you have the following installed:

1. **MongoDB Community Edition** - [Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/)
2. **MongoDB Shell (mongosh)** - This is included with MongoDB Community Edition
3. **Node.js** - [Download here](https://nodejs.org/)

### Node.js Package Setup

Once you have Node.js installed, run the following commands in your assignment directory:

```bash
# Initialize a package.json file
npm init -y

# Install the MongoDB Node.js driver
npm install mongodb
```

## Assignment Overview

This week focuses on MongoDB fundamentals including:
- Creating and connecting to MongoDB databases
- CRUD operations (Create, Read, Update, Delete)
- MongoDB queries and filters
- Aggregation pipelines
## Submission

Complete all the exercises in this assignment and push your code to GitHub using the provided GitHub Classroom link.

## Running the Scripts

### 1. Populate the Database

First, you need to populate your local MongoDB database with the sample book data. Make sure your MongoDB server is running, then execute the following command in your terminal:

```bash
node insert_books.js
```

This script will connect to `mongodb://localhost:27017`, create a database named `plp_bookstore`, and insert the sample books into a `books` collection.

### 2. Execute the Queries

After populating the database, you can run the `queries.js` script to perform various operations as required by the assignment.

```bash
node queries.js
```

This will execute all the basic, advanced, and aggregation queries, and create indexes on the collection. The output for each task will be printed to the console.

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data.
- `queries.js`: Script containing all MongoDB queries for the assignment tasks.

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 