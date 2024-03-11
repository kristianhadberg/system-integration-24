import express from "express";

const app = express();

app.use(express.static("public"));

const randomNumbers = [];

app.get("/randomNumbers", (req, res) => {
    res.send({ data: randomNumbers });
});

app.post("/simulateNewRandomNumbers", (req, res) => {
    const newNumber = getRandomInt(5, 500);
    randomNumbers.push(newNumber);
    res.send({ data: newNumber });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const PORT = 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));
