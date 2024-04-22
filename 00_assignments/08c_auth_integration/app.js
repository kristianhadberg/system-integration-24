import express from "express";
import { auth } from "express-openid-connect";
import pkg from "express-openid-connect";

const app = express();
const PORT = 8080;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: "a long, randomly-generated string stored in env",
    baseURL: "http://localhost:8080",
    clientID: "b0XrWWNV3FJFYotU0DyYyxuTdO2yq611",
    issuerBaseURL: "https://dev-m8z8zt15vi0joslg.us.auth0.com",
};

app.use(auth(config));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("running");
});

app.get("/profile", pkg.requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.listen(PORT, () => console.log(`Listening on port:`, PORT));
