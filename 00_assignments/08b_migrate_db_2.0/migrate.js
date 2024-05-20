import mysql from "mysql2/promise";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const mySqlClient = await mysql.createConnection({
    host: process.env.MYSQL_URL || "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

const { Client } = pg;
const pgClient = new Client({
    host: process.env.PG_HOST || "localhost",
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT || 5432,
});

async function migrateData() {
    let authors = [];
    let books = [];

    // Query mySql db
    try {
        mySqlClient.connect();
        const [authorsResult] = await mySqlClient.query("SELECT * FROM `authors`");
        const [booksResult] = await mySqlClient.query("SELECT * FROM `books`");

        authors = authorsResult;
        books = booksResult;
    } catch (err) {
        console.log(err);
    }

    const sql = `
        DROP TABLE IF EXISTS authors CASCADE;
        CREATE TABLE authors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );

        INSERT INTO authors (id, name) VALUES
        ${authors.map((a) => `(${a.id}, ${pgClient.escapeLiteral(a.name)})`).join(", ")};

        DROP TABLE IF EXISTS books;
        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author_id INT REFERENCES authors(id)
        );

        INSERT INTO books (id, title, author_id) VALUES
        ${books.map((b) => `(${b.id}, ${pgClient.escapeLiteral(b.title)}, ${b.author_id})`).join(", ")};

    `;

    // Query postgres
    try {
        await pgClient.connect();
        await pgClient.query(sql);
    } catch (err) {
        console.log(err);
    }

    console.log("Migration complete");
}

await migrateData();
process.exit();
