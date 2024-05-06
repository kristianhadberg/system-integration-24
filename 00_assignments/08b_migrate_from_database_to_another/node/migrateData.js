import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mySqlConnection = await mysql.createConnection({
    host: process.env.MYSQL_URL || "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

const mongoUrl = process.env.MONGO_URL;
const mongoClient = new MongoClient(mongoUrl);
const dbName = process.env.MONGO_DB;

async function migrateData() {
    mySqlConnection.connect();
    let authors = [];
    let books = [];

    // Query mySql db
    try {
        const [authorsResult] = await mySqlConnection.query("SELECT * FROM `authors`");
        const [booksResult] = await mySqlConnection.query("SELECT * FROM `books`");

        authors = authorsResult;
        books = booksResult;
    } catch (err) {
        console.log(err);
    }

    // Connect to mongo db
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const authorsCollection = db.collection("authors");
    const booksCollection = db.collection("books");

    const insertAuthorsResult = await authorsCollection.insertMany(authors);
    const insertBooksResult = await booksCollection.insertMany(books);

    console.log(insertAuthorsResult);
    console.log(insertBooksResult);
    console.log("Migration complete");
}

migrateData();
