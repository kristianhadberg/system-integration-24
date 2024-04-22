# # 08c Auth Integration

I used Auth0 for this assignment.
https://auth0.com/

# Step-by-step

1.

Create an account or use an existing form of authentication to log in.
Afterwards you should be on the dashboard/getting started page.

2.

Click "create application"
Select your application type. For this project a "regular web application" was used.

3.  Select the language/framework used in your project.
    I used Node.js with Express.
    Then select "I want to integrate with my app"

4.  Set the callback and logout urls to match with your project. I used port 8080.
    e.g.: http://localhost:8080/callback, http://localhost:8080

Save the settings and click continue.

5.  Initialize the Node.js project.

```
$ npm init -y
```

Enable ES modules in the project by adding: "type": "module" in the package.json file

Install the dependencies for the project:

```
$ npm install express express-openid-connect --save
```

6.  Create a file called app.js in the root directory.
    Paste the following content:

**The config object should match your auth0 settings, so change it to match with your settings.**

```
import express from "express";
import { auth } from "express-openid-connect";
import pkg from "express-openid-connect";

const app = express();
const PORT = 8080;

// Change to match with your settings found in auth0
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

app.listen(PORT, () =>  console.log(`Listening on port:`, PORT));
```

7.  Create a folder with the name "public" inside the root directory and create a file called index.html in it.
    Paste the following into the file:

```
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Auth Integration</title>
	</head>
	<body>
		<h1>09c Auth Integration</h1>
		<a href="/login">Login</a>
		<a href="/logout">Logout</a>
		<a href="/profile">Profile</a>
	</body>
</html>
```

This creates a simple html page, with 3 buttons to test the login functionality.

8.  Now you should be able to run the project and test it out.
    Run the following command:

```
$ node app.js
```

Go to localhost:8080 in your web browser and the project should be running.
From here you can test the projecet.
