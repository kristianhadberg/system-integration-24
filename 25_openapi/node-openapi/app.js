import express from "express";

const app = express();
const PORT = 8080;

import swaggerJSDoc from "swagger-jsdoc";
const swaggerDefinition = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Users API",
            version: "0.0.1",
        },
    },
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routers/*.js"],
};

import swaggerUi from "swagger-ui-express";
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);

app.get("/", (req, res) => {
    res.send("running");
});

app.listen(PORT, () => console.log(`Server is running on port:`, PORT));
