import fs from "fs";
import csvParser from "csv-parser";
import yaml from "yaml";
import { XMLParser } from "fast-xml-parser";

export async function parseCsv() {
    try {
        const results = [];
        const parser = csvParser();
        const stream = fs.createReadStream("../me.csv").pipe(parser);

        stream.pipe(parser);

        for await (const data of parser) {
            results.push(data);
        }

        return results;
    } catch (err) {
        console.error(err);
    }
}

export function parseJson() {
    try {
        const data = fs.readFileSync("../me.json", "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}

export function parseYaml() {
    try {
        const data = fs.readFileSync("../me.yaml", "utf-8");
        return yaml.parse(data);
    } catch (err) {
        console.error(err);
    }
}

export function parseXml() {
    try {
        const parser = new XMLParser();
        const fileContent = fs.readFileSync("../me.xml", "utf-8");
        return parser.parse(fileContent);
    } catch (err) {
        console.err(err);
    }
}

export function parseTxt() {
    try {
        const data = fs.readFileSync("../me.txt", "utf8");
        return data;
    } catch (err) {
        console.error(err);
    }
}
