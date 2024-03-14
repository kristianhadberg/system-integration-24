import express from "express";
import sqlite3 from "sqlite3";

const app = express();

app.use(express.json());

/**
 * Initialize and set up sqlite database
 */
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run("CREATE TABLE subscriptions (id INTEGER PRIMARY KEY, url TEXT, event TEXT)");
});

/**
 * Routes
 */
app.post("/register", (req, res) => {
    if (!req.body.event || !req.body.url) {
        res.status(400).send("Request body missing required parameters. (See documentation)");
        return;
    }

    const subscription = {
        event: req.body.event,
        url: req.body.url,
    };

    // Insert subscription into the database
    db.run("INSERT INTO subscriptions (url, event) VALUES (?, ?)", [subscription.url, subscription.event], function (err) {
        if (err) {
            return res.status(500).send("Error inserting subscription into database");
        }
        res.status(201).send(`Subscribed to webhook: ${JSON.stringify(subscription)}`);
    });
});

app.post("/unregister/:id", (req, res) => {
    const subscriptionId = req.params.id;

    // Check if subscription with given id exists.
    db.all("SELECT * FROM subscriptions WHERE id = ?", [subscriptionId], (err, rows) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        if (!rows.length) {
            return res.status(400).send("Subscription with given id doesnt exist.");
        }

        // Delete subscription from the database
        db.run("DELETE FROM subscriptions WHERE id = ?", [subscriptionId], function (err) {
            if (err) {
                return res.status(500).send("Error deleting subscription from database");
            }
            res.send(`Subscription with ID ${subscriptionId} deleted successfully`);
        });
    });
});

app.post("/create_activity", (req, res) => {
    respondToWebHooks("activity_created", "Activity was created");

    res.send("Activity was created.");
});

app.post("/delete_activity", (req, res) => {
    respondToWebHooks("activity_deleted", "Activity was deleted");

    res.send("Activity was deleted.");
});

// ping all subscribed endpoints
app.get("/ping", (req, res) => {
    const data = {
        ping: "Ping from Kristians webhook",
    };

    db.all("SELECT * FROM subscriptions", (err, rows) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        const subscriptions = rows;
        subscriptions.forEach((s) => {
            const response = fetch(s.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        });
    });

    res.send({ msg: "ping" });
});

app.get("/subscriptions", (req, res) => {
    // Get all subscriptions from the database
    db.all("SELECT * FROM subscriptions", (err, rows) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        res.json(rows);
    });
});

function respondToWebHooks(event, msg) {
    const data = {
        message: msg,
    };

    // Get all subscriptions from the database and send a request to each url.
    db.all("SELECT * FROM subscriptions WHERE event = ?", [event], (err, rows) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        const subscriptions = rows;
        subscriptions.forEach((s) => {
            const response = fetch(s.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        });
    });
}

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port`, PORT));
