const fs = require("fs");
const csv = require("csv-parser");
const yaml = require("yaml");
const xml2js = require("xml2js");

function parseCsv() {
    const results = [];
    fs.createReadStream("../me.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log(results);
        });
}

function parseJson() {
    fs.readFile("../me.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const parsedData = JSON.parse(data);
        console.log(parsedData);
    });
}

function parseYaml() {
    fs.readFile("../me.yaml", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const parsedData = yaml.parse(data);
        console.log(parsedData);
    });
}

function parseXml() {
    const parser = new xml2js.Parser();
    fs.readFile("../me.xml", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        parser.parseString(data, (err, result) => {
            const parsedData = result;
            console.log(parsedData);
        });
    });
}

function parseTxt() {
    fs.readFile("../me.txt", "utf8", (err, data) => {
        console.log(data);
    });
}

parseCsv();
parseJson();
parseYaml();
parseXml();
parseTxt();
