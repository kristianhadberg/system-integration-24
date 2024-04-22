import WebSocket from "ws";

const webSocketClient = new WebSocket("ws://localhost:8080");

webSocketClient.on("open", () => {
    webSocketClient.send("This is a message from the Node.js client");

    webSocketClient.on("message", (message) => {
        console.log(`Message recieved from server: ${message}`);
        webSocketClient.close();
    });
});
