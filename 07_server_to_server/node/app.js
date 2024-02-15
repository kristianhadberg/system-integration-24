import express from "express";

const app = express();
const PORT = 8080;

app.get("/requestFastAPI", (req, res) => {
    res.send({ message: "requesting from FastAPI" });
});

app.listen(PORT, () => console.log(`Server running on port`, PORT));
