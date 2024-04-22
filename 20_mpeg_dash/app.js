import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.static("videos"));

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port:`, PORT));
