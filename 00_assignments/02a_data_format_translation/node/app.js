import express from "express";
import { parseCsv, parseJson, parseTxt, parseXml, parseYaml } from "./parser.js";

const app = express();
const PORT = 8080;

app.get("/csv", async (req, res) => {
    const result = await parseCsv(res);
    res.send({ data: result });
});

app.get("/json", (req, res) => {
    const result = parseJson();
    res.send({ data: result });
});

app.get("/yaml", (req, res) => {
    const result = parseYaml();
    res.send({ data: result });
});

app.get("/xml", async (req, res) => {
    const result = await parseXml();
    res.send({ data: result });
});

app.get("/txt", (req, res) => {
    const result = parseTxt();
    res.send({ data: result });
});

app.listen(PORT, () => console.log(`Listening on PORT`, PORT));
