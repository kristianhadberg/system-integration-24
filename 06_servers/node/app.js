import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send({ message: "Hello" });
});

app.get("/otherRoute", (req, res) => {
    res.send({ message: "Another route" });
});

app.post("/postRequest", (req, res) => {
    res.send({ message: "Post request" });
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
