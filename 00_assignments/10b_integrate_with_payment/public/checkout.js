// This is your test publishable API key.
const stripe = Stripe("pk_test_51PDNMvP81iSojcap9CUQX57hhSQrF3R3Cr4L7G5rsZrJF8SQgNOXxPfD7eAGTtUclogKlY3z67jvknK3lkMc2HZY00QjWeVpQe");

// The items the customer wants to buy
let items = [];

let elements;

checkStatus();

document.querySelector("#payment-form").addEventListener("submit", handleSubmit);
document.querySelectorAll("#items > button").forEach((el) => el.addEventListener("click", handleItem));

async function handleItem(e) {
    let price;
    if (e.target.innerText === "t-shirt") price = 5000; // prices multiplied by 100 to calculate in dkk price (from stripe)
    if (e.target.innerText === "hoodie") price = 10000;
    if (e.target.innerText === "pants") price = 20000;

    const newItem = {
        id: e.target.innerText,
        price: price,
    };

    items.push(newItem);
    displayNewItems();
}

async function displayNewItems() {
    const selectedItemsContainer = document.querySelector("#selected-items");

    selectedItemsContainer.innerHTML = "";

    for (const newItem of items) {
        const itemElement = document.createElement("div");
        itemElement.textContent = newItem.id;

        selectedItemsContainer.appendChild(itemElement);
    }
}

// Fetches a payment intent and captures the client secret
async function createIntent() {
    document.querySelector("#payment-form").classList.remove("hidden");
    const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ items }),
        body: JSON.stringify({ items }),
    });
    const { clientSecret } = await response.json();

    const appearance = {
        theme: "stripe",
    };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElementOptions = {
        layout: "tabs",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:4242/checkout.html",
        },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occurred.");
    }

    setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
        return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
        case "succeeded":
            showMessage("Payment succeeded!");
            break;
        case "processing":
            showMessage("Your payment is processing.");
            break;
        case "requires_payment_method":
            showMessage("Your payment was not successful, please try again.");
            break;
        default:
            showMessage("Something went wrong.");
            break;
    }
}

// ------- UI helpers -------

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}
