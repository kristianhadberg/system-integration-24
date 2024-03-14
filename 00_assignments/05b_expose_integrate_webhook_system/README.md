# 05b Expose and Integrate with a Webhook System

**Note: The server URL given in this documentation is a placeholder, as the server is not currently deployed.**

## Subscribe to the Webhook system

To subscribe to the webhook system, you must perform a POST request to the URL of the server followed by the "/register" endpoint. The POST request must contain a body that contains the **event** and **url** properties. (The **event** being which type of event you want to subscribe to, and the **url** being the url from your server, which will be called, once an event is triggered.

The accepted event types are currently: **"activity_created"** and **"activity_deleted"**

**Example of subscribing to the webhook:**

    POST "http://url.com/register"

    {
    		"event": "activity_created",
    		"url": "http://myurl.com/recieve_webhooks"
    }

If done correctly, the server will respond with status code 201, and a message implying the subscription was successful.

## Retrieving all active subscriptions

You can perform a GET request to "/subscriptions" endpoint, which will return a list of all active subscription. This can be used to retrieve the ID of your subscription, which can then be used to unsubscribe from the webhook.

**Example:**

    GET "http://url.com/subscriptions"

## Unsubscribe from the Webhook system

To unsubscribe from the webhook system, you must perform a POST request to the URL of the server followed by the "/unregister/{id}" endpoint. The POST request must contain the path parameter id, which refers to the id of the subscription to be deleted.

**Example of unsubscribing:**

    POST "http://url.com/unregister/2"

If done correctly, the server will respond with status code 200, and a message implying the subscription was unregistered successfully.

## Interacting with the Webhook system

Now that you have your subscriptions set up, it's time to interact with the system.

For this to work, it will require that you have made a POST endpoint in your own webserver and that the URL in the subscription matches the endpoint.

**Simple example of recieving endpoint in NodeJS with Express**

    	app.post("/recieve_webhooks", (req, res) => {
    		console.log(req.body);
    	});

You can perform a POST request to the "/ping" endpoint, which will instruct the system to perform a POST request to all subscriptions.

**Ping example:**

    POST "http://url.com/ping"

You can perform a POST request to the endpoint "/create_activity" which will simulate that an activity has been created in the system. Which in turn will perform a call to all subscriptions with the event type **activity_created**

**Example:**

    POST "http://url.com/create_activity"

You can also perform a POST request to the endpoint "/delete_activity" which will simulate that an activity has been deleted from the system. Which in turn will perform a call to all subscriptions with the event type **activity_deleted**

**Example:**

    POST "http://url.com/delete_activity"
