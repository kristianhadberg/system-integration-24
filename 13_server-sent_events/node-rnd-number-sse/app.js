import express from "express";

const app = express();

app.get("/random-number", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    setInterval(() => sendRandomNumber(res), 1000);
});

function sendRandomNumber(res) {
    const randomNumber = Math.floor(Math.random() * 11);
    res.write(`data: ${randomNumber} \n\n`);
}

const PORT = 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));
