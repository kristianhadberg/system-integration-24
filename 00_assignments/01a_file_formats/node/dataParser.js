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
        const lines = data.split("\n");

        const object = {};

        lines.forEach((l) => {
            // replace unrequired/filler characters and split into an array of key value pairs
            const replaceCharacters = l.replaceAll(":", "").replaceAll(",", "");
            const splitArray = replaceCharacters.split(" ");

            let key = splitArray[0];

            // remove first element of array since that is the key
            splitArray.shift();
            let value = splitArray;

            if (key == "name" || key == "age") value = value.toString();

            object[key] = value;
        });

        console.log(object);
    });
}

parseCsv();
parseJson();
parseYaml();
parseXml();
parseTxt();
