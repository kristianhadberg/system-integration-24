import express from "express";

const app = express();

app.use(express.json());

const url = "https://3152a6818a3658128a62a04a6137fd20.serveo.net/api/webhook";

// subscribeToWebhook();
// getRegisteredWebhooks();
// createTimeTracker();

app.post("/recieve_webhook", (req, res) => {
    console.log(req.body);
});

async function getRegisteredWebhooks() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}

async function subscribeToWebhook() {
    const hook = {
        Url: "https://bbac-195-249-146-100.ngrok-free.app/recieve_webhook",
        ContentType: "application/json",
        Secret: "TestSecret",
        EventType: "Timetracking.OnWeekend",
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hook),
    });

    const data = await response.json();
    console.log(data);
}

async function createTimeTracker() {
    const response = await fetch("https://3152a6818a3658128a62a04a6137fd20.serveo.net/api/Timetracking", {
        method: "POST",
        body: {
            startDate: "2024-03-24T11:00:00",
            endDate: "2024-03-24T15:00:00",
            Title: "Example Title",
            Description: "Example Description",
            ClientId: 5,
            UserId: 1,
        },
    });
}

const PORT = 8081;
app.listen(PORT, () => console.log(`Listening on port`, PORT));
