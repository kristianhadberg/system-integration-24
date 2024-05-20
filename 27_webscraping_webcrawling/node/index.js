import fs from "fs";
import { load } from "cheerio";

// const response = await fetch("https://www.proshop.dk/Baerbar-computer");
// const html = await response.text();

// fs.writeFileSync("index.html", html);
// console.log(html);

const htmlPageString = fs.readFileSync("index.html").toString();

const $ = load(htmlPageString);

$("#products [product]").each((index, element) => {
    const description = $(element).find(".site-product-link").text();
    const price = $(element).find(".site-currency-lg").text();

    console.log(description);
    console.log(price);
    console.log("\n");
});
