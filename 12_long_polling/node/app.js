import express from "express";

const app = express();

let clients = [];

app.get("/events/subscribe", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    clients.push(res);

    clients = clients.filter((client) => client !== res);
});

app.get("/events/publish", (req, res) => {
    const newData = { data: "This is a new message." };

    clients.forEach((client) => {
        client.send(newData);
    });

    clients = [];

    res.status(240).end();
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));
