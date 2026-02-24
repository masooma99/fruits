# Fruits

![Banner](./images/banner.png)


## Overview

Welcome to the "Fruits" App, a comprehensive module for intermediate learners ready to build a full-stack CRUD application. This module covers essential full-stack development skills, focusing on creating, reading, updating, and deleting data in a web application using Node.js, Express, and EJS. It's the perfect next step for those with foundational web development knowledge, who are ready to work with a database for the first time.


## Getting Started

- **Fork** and **clone** this repository
- `cd` into the newly created directory
- Open up in VS Code with `code .`
- Create a Server file with `touch server.js`
- Initialize a Node environment with `npm init -y`


## Build and Run `server.js`


### Install the Express Module

Before we begin building our server, let's use `npm` to install the Express module in this project:

```sh
npm install express
```

Now that we've done this, the Express framework is available for us to use when building our application. Without this step, if we were to try to run our server code, we would receive an error since our app would be be trying to import a node module that we haven't installed yet.

Now that `express` is installed, let's write the basic code needed to create our server.


### Adding Our `dev` Script

In `package.json` under `scripts`, add a `dev` script to run our server just beneath `test`...

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "node --watch server.js"
}
```


### Basic Structure of Express App

Here is a helpful outline of what a typical Express app does - let’s put this code right in our `server.js` file:

```js
const express = require("express")

const app = express()

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT} . . . `)
})
```

> 📚 The `server.js` file is typically the main entry point and configuration file for setting up an Express web server.


### Run the Server

Let's test our work by running our server. Run the following in your terminal:

```sh
npm run dev
```

Our server should be up and running and you should see `Express server is listening on port 3000 . . . ` logged to your terminal.


## Build a Landing Page

Every web application typically features a landing page, serving as the initial point of entry for users. When someone navigates to *"mycoolwebapp.com"*, this page is the first they encounter, offering links or navigation to explore other sections of the application. In this project, we'll be using EJS (Embedded JavaScript) templates to create the HTML views for this landing page and other parts of the web application.


### Install `ejs` from NPM

We'll need the `ejs` package from NPM so that we're able to deliver views, let's add it to our project. Stop your server and install the following package:

```sh
npm install ejs
```

We don't need to require it in our `server.js` file because express knows how to find this package out of the box.


### Build the Route

To serve our landing page, we'll need to start with a route in our `server.js` file. We'll set it up to send a simple response for testing, then we'll come back and have it render an EJS file later. This code, as well as all future routes, should be above the `app.listen()` method.

```js
app.get("/", async (req, res) => {
  res.send("hello, friend!")
})
```

Test the route by starting your server and browsing to `localhost:3000`. You should receive a message in the browser console saying, "hello, friend!"


### Create a `views` directory

We've confirmed the route is valid at this point, so let's do more than just `res.send` a message back to the browser.

We're going to need a `views` directory to hold all of our templates. Let's create it now:

```sh
mkdir views
```

Our landing page will be an `index.ejs` file that is inside of this directory. Let's create that too:

```sh
touch views/index.ejs
```

Open `index.ejs` and add the following HTML boilerplate and content inside of the `<body>` tag. Don't forget to also change the `<title>`!

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fruits App</title>
  </head>
  <body>
    <h1>Welcome to the Fruits app!</h1>
    <p>An app for collecting your favorite fruits.</p>
  </body>
</html>
```

To show our homepage when a user visits the root `/` of our application, we need to modify the response in the server's route handler. Instead of sending a simple message with `res.send()`, we'll use the `res.render()` method. This method allows us to render our EJS template as HTML.

```js
app.get("/", async (req, res) => {
  res.render("index.ejs")
})
```

Browse to `localhost:3000` and see the result!


## Connect to MongoDB

Before diving into building the functional aspects of our web application, we'll need to establish a connection to a database. This connection will enable our application to store and retrieve data as we develop more features. To achieve this, we will use MongoDB Atlas, a cloud database service, along with Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js. Additionally, we'll use the `dotenv` package to manage our environment variables, which includes securely storing our database connection string.


### Install `mongoose` and `dotenv` from NPM

To use mongoose in our application, we'll first need to install the `mongoose` and `dotenv` packages from NPM. Stop your server and install the following:

```sh
npm install mongoose dotenv
```

### Add the MongoDB Atlas Connection String to a `.env` File

Next, create a `.env` file in your project's root directory:

```sh
touch .env
```

This file will be used to store any sensitive, secret information that the application needs to run, but that we don't want to commit to GitHub. Database connection strings definitely qualify: we don't want just anybody to access our database using this string! To ensure that our `.env` file doesn't make its way up to GitHub, create a `.gitignore` file:

```sh
touch .gitignore
```

In that file, add the following:

``` txt
node_modules
package-lock.json
.env
```

The first line above will make sure that the `.env` file isn't tracked by Git. The second line does the same thing, but for the `node_modules` directory that contains all the dependencies that `npm` has already installed or will install in the future. Ignoring `node_modules` is not about security, though. Rather, it reduces the amount of code in our repo by eliminating third party packages that can easily be installed via `npm`.

Now that we're certain Git won't track it, let's edit our `.env` file.

`.env` files are a simple list of key-value pairs.

For example:

```txt
SECRET_NUMBER=13
PASSWORD=12345
```

The above code would allow an application to access the `SECRET_NUMBER`, and `PASSWORD` properties on a `process.env` object.


### Add Connection String

You can now paste your MongoDB Atlas connection string into your app's `.env` file, assigning it to a `MONGODB_URI` environment variable.

For example:

```txt
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.<host>.mongodb.net/<database>
```

> Do not use the above connection string in your application, it will not work. Paste the connection string obtained from your personal MongoDB Atlas account.

> Note: It is important that there are no spaces between `MONGODB_URI`, `=`, and your atlas connection string. It should be written as one continuous string with no spaces.

This will make the connection string available in our application on the `process.env.MONGODB_URI` property.


### Name Your Database Collection

Your connection string will default to a generic unnamed database collection as indicated by the `/?` towards the end of the connection string (if there). However, you **_must_** update this to your preferred collection name. In this application, that will be `fruits`. You can specify the preferred collection name by adding it between the `/` and the `?` in the connection string (if there).

Here's how that will look for this app: `/fruits`. The full connection string for this app will read like this:

```txt
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.<host>.mongodb.net/fruits
```

> Again, do not use the above connection string in your application, it will not work. Simply note where `/fruits` exists in the value for `MONGODB_URI` and replicate it in your own version.

Anytime you need to make a new app, you can use this same connection string and only replace the `/fruits` portion of the string. Ensure the name you assign is unique to that project - for example, once we've used the name `fruits` for this app, you shouldn't use it again. Also, your collection name should not contain any special characters.


### Connecting to MongoDB with Mongoose

With our environment variables added, we need to require the `dotenv` package in our `server.js` file to access them:

At the **_top_** of your `server.js` file, add:

```js
require("dotenv").config({ quiet: true })
const express = require("express")

const app = express()

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT} . . . `)
})
```

It's important that this line of code is at the top of this file - it ensures that the environment variables are available everywhere across your application.

Next, let's create our `db` folder and `index.js` file.

```sh
mkdir db
```

```sh
touch db/index.js
```

Next, we'll need to require `mongoose` so that we can use it to connect to our database. In `db/index.js`:

```js
const mongoose = require('mongoose')
```

Now we can use the `mongoose.connect()` method to connect to our database.

Add the following line after your require statement:

```js
const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)

    mongoose.connection.on("connected", () => {
      console.log(`🍌 Successfully connected to Fruits database . . . `)
    })
  } catch (error) {
    console.log("⚠️ Error connecting to MongoDB . . . ")
    console.log(error)
  }
}

connect()
```

At the bottom, export:

```js
module.exports = mongoose
```

Now, back over at the top of `server.js`, require our `db`:

```js
const db = require('./db')
```

If you have been having connection issues with your MongoDB database on your machine, try adding the following lines towards the top of `server.js`:

```js
const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])
```

This needs to be *above* where you require your database...


### Start the app

Launch the application with `npm run dev`. You should see two messages in your terminal - one confirming that the app is ready, and a second confirming that you are connected to your database.

> ♻️ Repeatable pattern: Any app you build that connects to a MongoDB database in Node using Mongoose will need a `.env` file with a connection string inside of it, and a `mongoose.connect()` method. You will pass this method the environment variable you created in your `.env` file - in this case `MONGODB_URI`.


## Build the Fruit Model

As we progress with our application, the next essential step is to create a schema and model for our fruits. This process will define how our fruit data is structured and stored in the database. By establishing a clear schema, we ensure consistency and reliability in the data we handle. Additionally, the model created from this schema will serve as the main interface for our application to interact with the MongoDB database, allowing us to perform CRUD operations on fruit data. Let's dive into creating our first Mongoose schema and model for the fruits in our application.


### Create the Model File `Fruit.js`

Let's create a directory that will hold the file for our fruit model `Fruit.js`:

```sh
mkdir models
touch models/Fruit.js
```

Creating a dedicated directory for a single file may seem unnecessary, but it's actually a strategic approach in software development. This practice is beneficial for future scalability. For instance, if you later decide to add more models to your application, having a designated `models` directory allows for clear organization, with each model having its own separate file. This makes your codebase more structured and manageable.

Here's how we'll structure our `Fruit.js` file:

- **Create the schema:** We'll begin by defining the schema for a `Fruit`. This schema is like a blueprint, describing the properties and characteristics of what a `fruit` object should include.

- **Link the schema to a Model:** Next, we'll create a model from our schema. This model is essentially a representation of a MongoDB collection. By linking our schema to this model, we connect the defined structure of our `fruit` data to the corresponding collection in the database.

- **Export the Model:** Finally, we need to make sure our model is available for use elsewhere in our application. We'll do this by exporting the model from the fruit.js file.

You should name models and model files singularly. For example, `Fruit.js` instead of `Fruits.js`. This is because a model is a singular representation of the data you are storing. These should also be *PascalCased*, buy convention.


### Create the Fruits Schema

Before we define our model, we must first import the mongoose library into our `Fruit.js` file:

```js
const mongoose = require("mongoose")
```

Now let's define the schema for our `Fruit` model. A schema in Mongoose is a way to structure the data in our database. It's essentially a JavaScript object where each key represents a property of our data. The value assigned to each key specifies the type of data we expect for that property and can also include certain constraints or rules.

For our `Fruit` model, we want to keep it simple. We'll have two properties: `name`, which will be a string, and `isReadyToEat`, which will be a boolean indicating whether the fruit is ready to be eaten.

Here's what this would look like in our `Fruit.js` file:

```js
const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    name: {
      type: String
    },
    isReadyToEat: {
      type: Boolean
    }
  },
  { timestamps: true }
)
```


### Register the Model

After defining our schema, the next step is to inform Mongoose about the collection in MongoDB that will use this schema for its documents. We achieve this by creating a model. A model in Mongoose serves as a constructor for creating new documents, and it also enforces the structure defined in the schema.

To create a model, we use the `mongoose.model` method. This method takes two arguments: the `name` of the model and the `schema` to apply to that model.

Here's how we define the model for our `Fruit` schema:

```js
const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    name: {
      type: String
    },
    isReadyToEat: {
      type: Boolean
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Fruit", fruitSchema)
```

> Note: There is a convention to use a capital letter for database model names, so name your model `Fruit`, as opposed to `fruit`.

With this addition, we're ready to use our `Fruit` model in the request handling functions defined in our Express routes. This setup will allow us to perform database operations like creating, reading, updating, and deleting fruit documents in MongoDB.


## Build the New Fruit Page


### The NEW Route

Creating a new fruit in our application involves two distinct steps, each handled by separate routes. The first step is presenting the user with a form to enter fruit data. This is the responsibility of the "new" route, which we'll build in this section. Its sole purpose is to display a form for data entry.

Once the user fills out the form and submits it, the data is sent to another route, which we'll construct in the next section. This second route is dedicated to processing the submitted data and inserting it into the database.


### Define the route

In keeping with RESTful routing conventions, the url for this route will be: `/fruits/new`.

Let's start by defining the route and testing it.

First off, let's create a `routes` folder and `fruitRouter.js` to define them in.

```sh
mkdir routes
touch routes/fruitRouter.js
```

In `fruitRouter.js`, we start off by requiring Express, and initializing our `router` object:

```js
const express = require('express')
const router = express.Router()
```

Next, we need to define our route for `/new`:

```js
router.get('/new', )
```

We'll leave this like this for now.

At the bottom, we'll export:

```js
module.exports = router
```


### Create the Controller

Now, we need to create a `controller` folder and `fruitController.js` to define our functions in.

```sh
mkdir controllers
touch controllers/fruitController.js
```

In `fruitController.js`, we start off by requiring our model from earlier, which we will need to run Mongoose methods on our database.

```js
const Fruit = require('../models/Fruit.js')
```

Now, we define our function:

```js
const showNewFruitPage = async (req, res) => {
  try {
    res.send("This is the New Fruit page!")
  } catch (error) {
    res.status(404).json({ message: "⚠️ An error has occurred showing the New Fruit Page!", error: error.message })
  }
}
```

Leave it like this for now.  At the bottom, be sure to export it.

```js
module.exports = {
  showNewFruitPage
}
```

Let's go connect it back in `fruitRouter.js`. First, require the controller. Then, add our function as the callback to the `.get` method:

```js
const express = require('express')
const router = express.Router()

const fruitController = require('../controllers/fruitController')

router.get('/new', fruitController.showNewFruitPage)
```

##################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
### Create the New Template

Let's now create the template for our "new" route. This template will provide a user-friendly interface for adding new fruits to our application. To keep our templates organized, especially as our application grows, we'll place this new template in a dedicated sub-folder within the `views` directory.

```sh
mkdir views/fruits
touch views/fruits/new.ejs
```

Organizing our templates into model-specific sub-folders is a good practice, especially for larger applications with multiple models. Each model can have its own `new.ejs` template, among others.

Now, let's add some basic content to our `new.ejs` template for fruits:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Create a Fruit</title>
  </head>
  <body>
    <h1>Create a New Fruit!</h1>
  </body>
</html>
```

To ensure best practice, we'll focus on testing each component as soon as it's developed. This approach not only helps in identifying and fixing issues early but also in understanding each part of the application thoroughly. So, before we dive into creating the user form, let's first update and test the route.


### Updating the New Route

Instead of `res.send`, let's render the `new.ejs` template we just created in the `views/fruit` directory with `res.render`. In `fruitController.js`:

```js
const showNewFruitPage = async (req, res) => {
  try {
    res.render("./fruits/new.ejs")
  } catch {
    res.status(404).json({ message: "⚠️ An error has occurred showing the New Fruit Page!", error: error.message })
  }
}
```

Visit `localhost:3000/fruits/new` in the browser. This time we should see the `<h1>` rendered to the page.


### Create the Form

Finally, let's add a form to our `new.ejs` template. This form will allow users to input data for creating a new fruit. In our Fruit model, we have two properties: `name` and `isReadyToEat`. The `name` field should be a text input where users can type the name of the fruit. For the `isReadyToEat` property, which is a boolean, we'll use a checkbox input. This way, users can check the box if the fruit is ready to eat.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Create a Fruit</title>
  </head>
  <body>
    <h1>Create a New Fruit!</h1>
    <form action="/fruits" method="POST">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" />

      <label for="isReadyToEat">Ready to Eat?</label>
      <input type="checkbox" name="isReadyToEat" id="isReadyToEat" />

      <button type="submit">Add Fruit</button>
    </form>
  </body>
</html>
```

In the form we've just created, there are two important attributes: `action` and `method`. The `action` attribute specifies the URL where the form data should be sent when the form is submitted. In our case, it's set to `/fruits`. The `method` attribute defines the HTTP `method` the browser should use to send the form data. We've set this to `POST`, which is appropriate for creating new data on the server.

Now that our form is set up, it provides the user interface needed to create a new fruit. However, it's not functional yet. When you try to submit the form, you'll probably see an error message like `Cannot POST /fruits`. This is because we haven't yet created the route to handle the form submission. That's our next step! We'll set up the corresponding server-side route to process and save the form data.


## Create a Fruit


### The `create` Route

In this section, we will develop a route to handle form submissions for creating new fruits in our database. The route will be `POST /fruits`, following RESTful conventions where `POST` signifies the creation of new data.

When a user submits the form on the `/fruits/new` page, the browser sends a request to our server with the form data. To access this data in Express, we need to use middleware. Specifically, we'll use `express.urlencoded`. This middleware parses incoming request bodies, extracting form data and converting it into a JavaScript object. It then attaches this object to the `req.body` property of the request, making the form data easily accessible within our route handlers.

To enable this functionality, add the following line near the middle of `server.js`:

```js
app.use(express.urlencoded({ extended: false }))
```

> Remember, `app.use` allows us to plug additional functionality into Express. It basically extends the capabilities of our app.


### Define the Route

Let's start by defining and testing our route. Add the following code to `fruitRouter.js`, beneath the `new` route:

```js
router.post("/", fruitController.createAFruit)
```

Now, in `fruitController.js`:

```js
const createAFruit = async (req, res) => {
  try {
    console.log(req.body)
    res.redirect("/fruits/new")
  } catch {
    res.status(500).json({ message: "⚠️ An error has occurred creating a fruit!", error: error.message })
  }
}
```

Don't forget to add the new controller function to the export at the bottom:

```js
module.exports = {
  showNewFruitPage,
  createAFruit
}
```

In the browser, enter some data and submit the form on the `/fruits/new` page. You'll instantly be redirected back to `/fruits/new`, but if you check your terminal, you should see a JS object representation of the form data you just submitted.


### Build the `create` Functionality

Now that we've confirmed our form submits data to the `POST` route, let's add the logic to create a `fruit` in our database:

```js
const createAFruit = async (req, res) => {
  try {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true
    } else {
      req.body.isReadyToEat = false
    }
    await Fruit.create(req.body)
    res.redirect("/fruits/new")
  } catch (error) {
    res.status(500).json({ message: "⚠️ An error has occurred creating a fruit!", error: error.message })
  }
}
```

In the code snippet above, we have to do a little bit of data manipulation before our new fruit is ready to be sent to the database. The `if` statement checks the value of `req.body.isReadyToEat`. This field comes from a checkbox in our form. In web forms, a checked checkbox sends the value `"on"`, while an unchecked checkbox sends no value (thus, it's undefined). We convert this "on" or undefined value to a Boolean (`true` or `false`) to match our schema's expected data type for `isReadyToEat`.

Next, we use `Fruit.create(req.body)` to add a new `fruit` to our database. `req.body` contains the form data sent by the user, which now includes our corrected `isReadyToEat` value. `Fruit.create()` is an asynchronous operation; we use `await` to ensure the database operation completes before the function continues.

Finally, we redirect the user back to the form page using `res.redirect("/fruits/new")`. This is a common practice after processing form data to prevent users from accidentally submitting the form multiple times by refreshing the page.

Let's verify our data was saved by navigating to our MongoDB Atlas dashboard. Once in the dashboard, click on the "Collections" section for your database.

![MongoDB Atlas collections](./images/collections.png)

You should see a collection called "fruits". Click on that collection and see if you can find the document of your newly created fruit.

![MongoDB Atlas query results](./images/banana.png)

If you can see your newly created fruit, you have successfully performed your first CRUD operation, **Create**. Congrats!


## Build the Fruits `index` Page


### The `index` Route

Now that we have created a way for users to add fruits to our database, the next step is to display these fruits. In this section, we will develop the Index Route. This route will retrieve and display all the fruits currently stored in our database.

In keeping with RESTful routing conventions, the `url` for this route will be: `/fruits`.


### Define the Route

Let's start by defining and testing the route. Add the following code to `fruitRouter.js`, above the `/fruits/new` route:

```js
router.get("/", fruitController.showFruitsIndexPage)
```

In `fruitController.js`:

```js
const showFruitsIndexPage = (req, res) => {
  try {
    res.send("Welcome to the index page!")
  } catch {
    res.status(500).json({ message: "⚠️ An error has occurred showing the Fruits Index Page!", error: error.message })
  }
}
```

Don't forget to export:

```js
module.exports = {
  showNewFruitPage,
  createAFruit,
  showFruitsIndexPage
}
```

Test it by visiting `http://localhost:3000/fruits`. You should see your message in the browser: "Welcome to the index page!"


### Retrieve All `fruit` Data

Now that we know our route is set up, our next step is to retrieve data from the database. In this case, we are looking for all of the fruits. To accomplish this, we'll use Mongoose's `.find()` method. When called without any arguments, `.find()` retrieves all documents within a collection, returning them as an array.

Let's use `.find()` inside our route:

```js
const showFruitsIndexPage = async (req, res) => {
  try {
    const fruits = await Fruit.find({})
    res.send("Welcome to the index page!")
  } catch {
    res.status(500).json({ message: "⚠️ An error has occurred showing the Fruits Index Page!", error: error.message })
  }
}
```

In the above snippet, we've modified our route to be an asynchronous function. This allows us to use the `await` keyword to wait for `.find()` to complete its operation and assign the result to the `allFruits` variable.

To be sure we have the data we are looking for, let's log `allFruits` to the console:

```js
const showFruitsIndexPage = async (req, res) => {
  try {
    const fruits = await Fruit.find({})
    console.log(fruits)
    res.send("Welcome to the index page!")
  } catch {
    res.status(500).json({ message: "⚠️ An error has occurred showing the Fruits Index Page!", error: error.message })
  }
}
```

Now when we navigate to `http://localhost:3000/fruits` we should see an array of our fruit data logged to our terminal.

![Fruits Data Array](./images/data-array.png)


### Update the Route

Now that we've successfully retrieved the fruit data from our database, our next objective is to display this data to the user. Up until now, our route's callback function has been using `.send()` to deliver a simple message to the user. However, we need to move beyond this to provide a more dynamic and data-driven experience.

In our context, dynamic HTML refers to HTML content generated based on data. It's not static but changes according to the data we pass to it. We will use EJS templates to create such dynamic HTML pages. These templates will be populated with data from our database each time we render them.

Instead of `.send()`, we will use `.render()` to respond with a dynamically generated HTML view. The `.render()` method takes two arguments:

- The first argument is a `string` specifying the path to the EJS template we wish to render. In our case, it's 'fruits/index.ejs'.

- The second argument is an `object` containing the data we want to pass to the template. This data is provided as key/value pairs, where the key is the name we'll use to reference the data in our EJS template.

We'll pass the `allFruits` data to our template under the key `fruits`. This way, our EJS template can use `fruits` to access and display the data:

```js
const showFruitsIndexPage = async (req, res) => {
  try {
    const fruits = await Fruit.find({})
    res.render("fruits/index.ejs", { fruits: fruits })
  } catch {
    res.status(500).json({ message: "⚠️ An error has occurred showing the Fruits Index Page!", error: error.message })
  }
}
```

Now if we navigate to `http://localhost:3000/fruits` we'll see... an error!

![Error No View](./images/error-view.png)

However, this error is actually quite helpful. It points us toward our next step. The message indicates a specific issue: we're attempting to render a view called `index.ejs` located in the `views/fruits` directory, but this file does not currently exist. Let's fix that!


### Create the `index` template

Now that the route is set up, let's create the template. Create an `index.ejs` file inside the `views/fruits` directory:

```sh
touch views/fruits/index.ejs
```

Inside this template file, add the following HTML boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fruits Index</title>
  </head>
  <body>
    <h1>All Fruits</h1>
  </body>
</html>
```

Now if we refresh the browser at `http://localhost:3000/fruits` that should resolve our error and render the `<h1>`.

In our previous step, we used `res.render()` to pass the fruits data from our database to the EJS file. By passing `{ fruits: fruits }`, we made the `fruits` array accessible in our EJS file as a variable named `fruits`.

We can list our fruits in a simple, bulleted list format using an unordered list `<ul>`. This is done by looping over the fruits array and dynamically generating an `<li>` for each fruit's name:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fruits Index</title>
  </head>
  <body>
    <h1>All Fruits</h1>
    <ul>
      <% fruits.forEach((fruit) => { %>
        <li><%= fruit.name %></li>
      <% }) %>
    </ul>
  </body>
</html>
```

Another refresh at `http://localhost:3000/fruits` and we should see our list!

![Fruits List](./images/fruit-list.png)

Congrats! You have just completed your second piece of CRUD functionality, Read!


### Update `create` Route Redirect

Now that we have an `index` page displaying all our fruits, it's a good idea to update our `create` route. Instead of redirecting users back to the form after adding a new fruit, we can redirect them to the `index` page. This is a better user experience because they can immediately see the result of adding a new fruit to the database.

```js
const createAFruit = async (req, res) => {
  try {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true
    } else {
      req.body.isReadyToEat = false
    }
    await Fruit.create(req.body)
    res.redirect("/fruits") // redirect to index fruits
  } catch (error) {
    res.status(500).json({ message: "⚠️ An error has occurred creating a fruit!", error: error.message })
  }
}
```


### Adding Links

Now that our index page is up and running, it's time to make some of our pages more accessible.

First, we'll add a link on the homepage of our application that users can click to visit the index page. This link will be labeled "Browse Fruits" and will direct users to the index page where they can view all the fruits listed.

Add the following HTML snippet to the application homepage:

```html
<a href="/fruits">Browse Fruits</a>
```

Next, let's add a link on the `index` page of our application. This link will be labeled "Add Fruit" and will direct users to the `new` page where they can input details for a new fruit.

Add the following HTML snippet to the fruit `index` page:

```html
<a href="/fruits/new">Add New Fruit</a>
```

Once on the `new` page, we should probably give users an easy way back to index.

Add the following to the fruit `new` page:

```html
<a href="/fruits/">Back to Fruits</a>
```


## Building the Fruits Show Page


### The `show` Route

The show route is designed to display detailed information about a specific item, such as a specific `fruit` in our application. In keeping with RESTful routing conventions, the `url` for this route will be: `/fruits/:id`.

Remember, `:id` is just a placeholder and we define what we want the `param` to be.

The `:id` in the URL is a variable segment, known as a URL parameter. It allows our route to dynamically handle requests for different fruits by their unique `ID`s. So, whenever a user wants to view details about a particular fruit, they will navigate to a URL like `/fruits/12345`, where `12345` is the fruit's `ID`.


### Link to the Route

To create a way for users to view more details about an individual fruit, we'll transform the fruit names listed on the app's `index` page into clickable links. This will allow users to navigate to the `show` page for each fruit. Currently, our `index.ejs` template displays a list of fruits, but they aren't interactive.

Here is our current `index` page code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fruits Index</title>
  </head>
  <body>
    <h1>All Fruits</h1>
    <ul>
      <% fruits.forEach((fruit) => { %>
        <li><%= fruit.name %></li>
      <% }) %>
    </ul>
  </body>
</html>
```

To make each fruit name a clickable link, we'll wrap the `<%= fruit.name %>` with an `<a>` tag. The `href` attribute of each link will point to the show route of the corresponding fruit. We'll use the fruit's `ID` to build this URL.

Lets update the code and wrap each fruit item in a link:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fruits Index</title>
  </head>
  <body>
    <h1>All Fruits</h1>
    <ul>
      <% fruits.forEach((fruit) => { %>
        <li><a href="#"><%= fruit.name %></a></li>
      <% }) %>
    </ul>
  </body>
</html>
```


### Adding a Dynamic `href`

As we iterate through the fruit objects, we already access their names using `fruit.name`. We can do the same for its `id`. Looking back at when we logged our data to the console, we saw:

![Data with id](./images/data-array.png)

Utilizing `_id` will give us the `id` that we need. Now we can make the adjustment to the `<a>` tag and add a dynamic `href`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fruits Index</title>
  </head>
  <body>
    <h1>All Fruits</h1>
    <ul>
      <% fruits.forEach((fruit) => { %>
        <li>
          <a href="/fruits/<%= fruit._id %>"> <%= fruit.name %> </a>
        </li>
      <% }) %>
    </ul>
  </body>
</html>
```

In this updated code, each fruit name is now a link. When clicked, it will take the user to the `show` page for that specific fruit, using its unique `ID` in the URL.

The items should now render as links in the browser:

![Fruits Index With Item Links](./images/fruits-index-item-links.png)

Let's test a link. Uh-oh! Error!

![Fruits Item Link Error](./images/fruits-item-link-error.png)

Looks like this route does not exist. Which makes sense, we haven't built it yet. Let's get started.


### Define the Route

Let's define and test our `show` route.

Add the following route to `fruitRouter.js`, ***below*** the `fruits/new` route:

```js
router.get("/:id", fruitController.showSingleFruitPage)
```

Now, in `fruitController.js`:

```js
const showSingleFruitPage = async (req, res) => {
  try {
    res.send(`This route renders the show page for fruit id: ${req.params.id}!`)
  } catch (error) {
    res.status(404).json({ message: "⚠️ An error has occurred showing the Single Fruit Page!", error: error.message })
  }
}
```

Don't forget to export:

```js
module.exports = {
  showNewFruitPage,
  createAFruit,
  showFruitsIndexPage,
  showSingleFruitPage
}
```

Test your new route in the browser.

You should see your message along with our `id` route parameter.

![Correct ID Link](./images/correct-id-link.png)


### A Note On Route Order

The order in which routes are placed in an express server is important, as Express evaluates them top-to-bottom. This means the placement of routes can affect how your application responds to specific URLs.

As an experiment, temporarily move your `/fruits/:id` route above your `fruits/new` route. Now navigate to your new fruit page. What happened?

The issue arises because Express matches routes in the order they are defined. The URL `/fruits/new` is mistakenly caught by the `/fruits/:id` route. In this route, `:id` acts as a placeholder and accepts any string, including "new". So, Express thinks "new" is a fruit ID and stops looking for further route matches.

To resolve this, we need to ensure that any route with an `/:id`  is placed after `/new` in our express applications.


### Build the `read` Functionality

We'll use Mongoose's `.findById()` method for fetching a specific fruit by its `_id`. This method is perfect for retrieving a single document based on its unique identifier.

Update the route with the following:

```js
const showSingleFruitPage = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id)
    res.send(`This route renders the show page for fruit id: ${req.params.id}!`)
  } catch (error) {
    res.status(404).json({ message: "⚠️ An error has occurred showing the Single Fruit Page!", error: error.message })
  }
}
```

In the above code, `req.params.id` captures the ID from the URL, and we use it to find the specific fruit. We've also made the function `async` so that we can `await` the asynchronous database operation.


### Rendering the Fruit Details

After fetching the fruit, we'll update from `res.send()` to `res.render()` to display the show page template. We'll also pass the retrieved `fruit` data to the template:

```js
const showSingleFruitPage = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id)
    res.render("fruits/show.ejs", { fruit: fruit })
  } catch (error) {
    res.status(404).json({ message: "⚠️ An error has occurred showing the Single Fruit Page!", error: error.message })
  }
}
```

If you test the route, you'll see a familiar error. We need a `show` page.


### Create the `show` Template

Now that the route is set up, let's create the template. Create a `show.ejs` template inside the `views/fruits`:

```sh
touch views/fruits/show.ejs
```

Add the following HTML boilerplate to `show.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fruit Show Page</title>
  </head>
  <body>
    <h1>Here Is Your Fruit</h1>
  </body>
</html>
```

Refresh your browser to see a rendered page.

Let's enhance our application to show detailed information about each fruit. We'll achieve this by dynamically updating our HTML template using the `fruit` data we've passed.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= fruit.name %></title> <!-- Dynamic title based on fruit name -->
  </head>
  <body>
    <h1><%= fruit.name %></h1> <!-- Display fruit name -->
    <!-- Add more details about the fruit here -->
  </body>
</html>
```

Refresh or click on a specific fruit on our `index` page, and our `show` page should be more specific.

To enhance our fruit details page, we'll incorporate conditional rendering based on the fruit's `isReadyToEat` property. This will display different messages depending on whether the fruit is ready to eat or not.

We'll use EJS control flow to dynamically display a message about the fruit's readiness. Insert an `if/else` statement in the HTML body, right after the `<h1>` tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= fruit.name %></title> <!-- Dynamic title based on fruit name -->
  </head>
  <body>
    <h1><%= fruit.name %></h1>
    <!-- Conditional rendering based on fruit's readiness -->
    <% if (fruit.isReadyToEat) { %>
      <p>This fruit is ready to eat!</p>
    <% } else { %>
      <p>This fruit is not ready to eat!</p>
    <% } %>
  </body>
</html>
```

With this code, our application checks the `isReadyToEat` property of the fruit. If it's true, it displays "This fruit is ready to eat!" Otherwise, it shows "This fruit is not ready to eat!"

![Fruit with details](./images/ready-to-eat.png)


### Link `show` Page Back to Fruits `index`

Now that we've viewed a specific fruit, let's say we want to look at the details of another fruit. We'll need to navigate back to the `index` page.

Add the following to the fruit `show` page:

```html
<a href="/fruits/">Back to Fruits</a>
```

Test your link!

With a working show page, you have successfully performed your next CRUD operation, **Read**. Congrats!


## Delete a Fruit


### The `delete` Route

The purpose of this route is to remove a specific fruit from the database. If we follow RESTful routing conventions, we know our route will be `DELETE /fruits/:id`, with `id` referring to the id of the fruit we intend to delete.


### Middleware

To further enhance our application, we'll introduce two essential middleware components: `method-override` and `morgan`, to assist us with our delete route. We'll begin with `method-override` here and cover `morgan` later.

By default, web browsers only allow for the `method` attribute of a form to be set to either `POST` or `GET`. This is in direct conflict with our RESTful routing convention, which uses the HTTP methods `PUT` and `DELETE` for certain routes. The solution is to use the `method-override` middleware, which essentially tricks our express app into thinking that we've made `PUT` and `DELETE` requests from the browser. By doing this, we're able to stick to our routing conventions, while at the same time, behind the scenes, using HTTP methods that the browser supports. More details below.

The `morgan` middleware serves as a logging tool for our HTTP requests, providing valuable insights into application behavior. Again, we'll see it in action below.

In order to use both of these, we need to stop our server and install their node packages:

```sh
npm install method-override morgan
```

Next, let's require them at the top of our `server.js` file just below our other dependencies:

```js
const app = express()
const mongoose = require('mongoose')
const methodOverride = require("method-override") // new
const morgan = require("morgan") //new


// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method")) // new
app.use(morgan("dev")) //new
```

Restart your server and check the terminal to see `morgan` in action.


### Create the UI to `delete` a Fruit

Now we need to adjust our fruits `show` page to include a button for deleting a fruit.

Update `show.ejs` with the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= fruit.name %></title> <!-- Dynamic title based on fruit name -->
  </head>
  <body>
    <h1><%= fruit.name %></h1>
    <% if(fruit.isReadyToEat){ %>
    <p>This fruit is ready to eat!</p>
    <% } else { %>
    <p>This fruit is not ready to eat!</p>
    <% } %>
    <!-- new delete button -->
    <form action="/fruits/<%=fruit._id%>?_method=DELETE" method="POST">
      <button type="submit">Delete <%= fruit.name %></button>
    </form>
    <a href="/fruits">Back to Fruits</a>
  </body>
</html>
```

All we've added here is a `<form>` with a single button in it. This button, when clicked, sends a request to the server to delete a particular fruit.

**Form Action and Method:**

- The action attribute in the form is set to the URL `/fruits/<%=fruit._id%>`, where `<%=fruit._id%>` dynamically inserts the `ID` of the current fruit. This tells the form where to send the request.

- Normally, forms only support `GET` or `POST` methods, but we want to send a `DELETE` request. To achieve this, we use a query parameter `?_method=DELETE` in the action URL. This tricks our server into treating the `POST` request as a `DELETE` request, thanks to the `method-override` middleware we set up in `server.js`.

The form doesn't have any input fields because we only need the fruit's `ID` to delete it, which is already included in the form's action URL.


### Define the route

To build and test the delete functionality in stages, we'll first create a basic route that sends a confirmation message. Then, we'll refactor it to add the actual delete functionality.

Add the following below your other routes in `fruitRouter.js`:

```js
router.delete("/:id", fruitController.deleteAFruit)
```

In `fruitController.js`:

```js
const deleteAFruit = async (req, res) => {
  try {
    res.send("This is the delete route")
  } catch (error) {
    res.status(500).json({ message: "⚠️ An error has occurred deleting a fruit!", error: error.message })
  }
}
```

Don't forget to export:

```js
module.exports = {
  showNewFruitPage,
  createAFruit,
  showFruitsIndexPage,
  showSingleFruitPage,
  deleteAFruit
}
```

This route uses `app.delete` to listen for delete requests. When a delete request is made to `/fruits/:id`, it will respond with a message saying "This is the delete route". This step ensures that the delete route is being accessed correctly when the delete button is clicked.

Test a delete button in the browser.


## Create `delete` Functionality

For this route we'll use the Mongoose method `findByIdAndDelete()` to find the fruit by its `ID` and delete it. Just like the `show` route, fruit `ID` is obtained from the URL parameter `req.params.id`.

Once you've confirmed the route works as expected, refactor it to include the actual delete functionality:

```js
const deleteAFruit = async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id)
    res.redirect("/fruits")
  } catch (error) {
    res.status(500).json({ message: "⚠️ An error has occurred deleting a fruit!", error: error.message })
  }
}
```

After deleting the fruit, we will redirects the user back to the `index` page `/fruits`, where the deleted fruit will no longer be listed.

Test this updated functionality by visiting the show page of any fruit and clicking the delete button. You should be redirected to the `index` page, where the deleted fruit should no longer appear.


### View `morgan` logs

If you check your terminal, you may notice additional information regarding the various requests has been logged. This is what the `morgan` middleware does for us. It's a nice way to have some debug information automatically logged for us without us manually setting it up. If at any point, you feel your terminal is getting crowded with additional information you don't need, simply comment out `app.use(morgan('dev'));`


If you are able to delete a fruit, you have successfully performed your next CRUD operation, **Delete**. Congrats!


## Build the Edit Fruit Page

### The `edit` Route

The `Edit` route presents the user with a form for editing the details of a single fruit in our database. If we follow RESTful routing conventions, the corresponding URL for this route is `GET /fruits/:id/edit`, where `:id` represents the unique identifier of the fruit we intend to edit.

One thing worth noting is that this is the only RESTful route that contains three segments `/fruits/:id/edit`

Also, compare your new/create and edit/update RESTful routes conventions. The full process of updating a fruit is similar to the process of creating a fruit in that both processes require two routes: a form route for collecting user data, and a second route for processing the data. For updating a fruit, the form route is called Edit and the processing route is called Update.

Here's how the two processes compare:

| Process        | Form Route                         | Processing Route                |
| -------------- | ---------------------------------- | ------------------------------- |
| Create a fruit | New (`GET /fruits/new`)            | Create (`POST /fruits`)         |
| Update a fruit | Edit (`GET /fruits/:id/edit`)      | Update (`PUT /fruits/:id`)      |

In this section, we'll focus on the `edit` route.


### Link to the Edit Page

To provide a way for users to navigate to the edit page of a specific fruit, we'll add a link on the `show` page. This link will be placed right after the delete button and before the link that takes the user back to the main fruit list.

Update `show.ejs` with the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= fruit.name %></title> <!-- Dynamic title based on fruit name -->
  </head>
  <body>
    <h1><%= fruit.name %></h1>
    <% if(fruit.isReadyToEat){ %>
    <p>This fruit is ready to eat!</p>
    <% } else { %>
    <p>This fruit is not ready to eat!</p>
    <% } %>
    <!-- new delete button -->
    <form action="/fruits/<%=fruit._id%>?_method=DELETE" method="POST">
      <button type="submit">Delete <%= fruit.name %></button>
    </form>
    <!-- add edit page link here -->
    <a href="/fruits/<%= fruit._id %>/edit">Edit <%= fruit.name %></a>
    <a href="/fruits">Back to Fruits</a>
  </body>
</html>
```

In this code, we're dynamically generating the href attribute of the "Edit" link by inserting the unique `_id` of the fruit. This ensures that the link leads to the correct edit page for each specific fruit.


### Define the Route

Because this route URL has three parts, it does not conflict with others and can be placed anywhere among our other routes.

Add the following below the other routes in `fruitRouter.js`:

```js
router.get("/:id/edit", fruitController.showEditFruitPage)
```

In fruitController.js:

```js
const showEditFruitPage = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id)
    console.log(fruit)
    res.send(`This is the edit route for ${fruit.name}`)
  } catch (error) {
    res.status(500).json({ message: "⚠️ An error has occurred showing the Edit Fruit Page!", error: error.message })
  }
}
```

Don't forget to export:

```js
module.exports = {
  showNewFruitPage,
  createAFruit,
  showFruitsIndexPage,
  showSingleFruitPage,
  deleteAFruit,
  showEditFruitPage
}
```

Like our show route, we'll use `Fruit.findById(req.params.id)` to find the specific fruit in our database. The `req.params.id` captures the `ID` from the URL.

Since finding a fruit is an asynchronous operation, we use `async` before our route callback function and `await` before the `findById` method. This ensures that the server waits for the fruit to be found before moving to the next line of code.

Test the route by clicking the "Edit" link on the show page of a particular fruit. Check your terminal to make sure you see the data for the fruit that you intend to edit.

Lastly, let's modify our route so that it renders `views/fruits/edit.ejs`, passing in the `fruit` variable we created above:

```js
const showEditFruitPage = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id)
    res.render("fruits/edit.ejs", { fruit: fruit })
  } catch (error) {
    res.status(500).json({ message: "⚠️ An error has occurred showing the Edit Fruit Page!", error: error.message })
  }
}
```

Test the route to see an error- time to create the edit page!


### Create the `edit` template

Now that the route is set up, let's create the template. Create a `edit.ejs` template inside the `views/fruits`:

```sh
touch views/fruits/edit.ejs
```

For our Edit page, we'll need a form for editing fruit data. We can borrow the same form from our `new.ejs` page and make some adjustments:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edit a Fruit</title>
  </head>
  <body>
    <!-- update the header -->
    <h1>Edit <%= fruit.name %></h1>
    <form action="/fruits" method="POST">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" />

      <label for="isReadyToEat">Ready to Eat?</label>
      <input type="checkbox" name="isReadyToEat" id="isReadyToEat" />
      <!-- update the button text -->
      <button type="submit">Update Fruit</button>
    </form>
    <a href="/fruits">Back to Fruits</a>
  </body>
</html>
```

Now let's edit the `<form>` tag:

```html
<form action="/fruits/<%=fruit._id%>?_method=PUT" method="POST"></form>
```

The Edit form needs to make a `PUT` request to `/fruits/:iD` in the same way that the New form needs to make a `POST` request to `/fruits`.

Remember, that browsers don't support `PUT` requests, so we will use the same `method-override` middleware as we did with the delete route. We'll append `?_method=PUT` to the end of our action URL:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edit a Fruit</title>
  </head>
  <body>
    <h1>Edit <%= fruit.name %></h1>
    <!-- updated form -->
    <form action="/fruits/<%=fruit._id%>?_method=PUT" method="POST">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" />
      <label for="isReadyToEat">Ready to Eat?</label>
      <input type="checkbox" name="isReadyToEat" id="isReadyToEat" />
      <button type="submit">Update Fruit</button>
    </form>
    <a href="/fruits">Back to Fruits</a>
  </body>
</html>
```


### Prefill Form Data

To improve user experience in our fruit editing form, we'll prefill the form with the current data of the fruit being edited. This makes it easier for users to see and modify the existing information.

Here's how we can achieve this for both text input and checkboxes:

For the 'name' input field, we'll use the `value` attribute to prepopulate it with the fruit's name:

```html
<input type="text" name="name" value="<%= fruit.name %>" />
```

When the edit page loads, this input field will automatically display the name of the fruit being edited.

Checkboxes work differently. The checkbox for `isReadyToEat` will be checked based on whether the fruit is ready to eat or not. A checkbox input can have a `checked` attribute, which, if present, makes the checkbox checked by default.

Unchecked by default:
```html
<input type="checkbox" name="isReadyToEat" />
```

Checked by default:
```html
<input type="checkbox" name="isReadyToEat" checked />
```

To conditionally render the checked attribute based on the `fruit.isReadyToEat` value, we'll use EJS control flow logic in the checkbox input:

```html
<input type="checkbox" name="isReadyToEat" <% if (fruit.isReadyToEat) { %>checked<% } %> >
```

This setup ensures that the checkbox reflects the current state of the fruit. If `fruit.isReadyToEat` is true, the checked attribute is added, and the checkbox will be checked when the page loads. Otherwise, it remains unchecked.

Test your `edit` UI on fruits that are both "ready to eat" and "not ready to eat". Create some extra fruits if necessary so you have both kinds.

Testing the form submission will result in an error, `Cannot PUT /fruits/<id>`.

We'll fix that in the next section.


## Update a Fruit


### The `update` Route

In the next section, we will focus on building the `update` route. This route is the final component in completing the CRUD (Create, Read, **Update**, Delete) functionalities of our application. The `update` route is responsible for processing the data submitted from the `edit` form and applying those changes to the corresponding item in the database.

In keeping with RESTful routing conventions, the url for this route will be `/fruits/:id`


### Create the Route

To allow users to `update` a fruit's details, we need to set up an `update` route. This route will handle `PUT` requests sent from the edit form on the `Edit` page. The URL pattern for this route is `/fruits/:id`, where `:id` represents the unique identifier of the fruit being updated.

Like the `create` route, the `update` route requires special data handling for the `isReadyToEat` property. This property, being a checkbox in our form, sends different values based on whether it's checked or not, and we need to handle this in our route to ensure it aligns with our database schema.

The `update` route is unique as it specifically deals with `PUT` requests. Since it does not conflict with other routes, its placement within `fruitRouter.js` can be flexible.

In this route, we will employ the Mongoose `findByIdAndUpdate()` method. This method allows us to update a specific document in the MongoDB database based on its unique `ID`. Since this is an asynchronous operation, we'll utilize `async/await` to ensure the operation completes before proceeding.

Let's add the following in `fruitRouter.js`:

```js
router.put("/:id", fruitController.updateAFruit)
```

In `fruitController.js`:

```js
const updateAFruit = async (req, res) => {
  try {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true
    } else {
      req.body.isReadyToEat = false
    }
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.id, req.body)
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.id}`)
  } catch (error) {
    res.status(500).json({ message: "⚠️ An error has occurred updating a fruit!", error: error.message })
  }
}
```

Don't forget to export:

```js
module.exports = {
  showNewFruitPage,
  createAFruit,
  showFruitsIndexPage,
  showSingleFruitPage,
  deleteAFruit,
  showEditFruitPage,
  updateAFruit
}
```

After updating the fruit in the database, it's a good practice to redirect the user back to a relevant page. In this case, we redirect the user to the `show` page of the updated fruit. This provides immediate visual confirmation of the changes.

We can now test the route by submitting our form. Make sure you are redirected correctly and can see your changes.


### You did it!

If you can see your newly updated fruit, you have successfully performed your final CRUD operation, **Update**. Congrats!

With this final route we have full CRUD and all seven RESTful routes on the fruit model! Well done! 🎉


· · · · · · · · · · · · · · · · · · · ·

<details><summary> 🎨 Style the Application </summary>

<br>

Now that we've got a fully functional app, it's time to add some styling! These steps are divided into labelled sections, so feel free to follow along for as much or as little as you'd like. If you do choose to complete all the sections, you'll have a fully styled app by the end of this level up.

## Setting up the styleshets

1. Create the following folders in your project directory: `public` and `public/stylesheets`:

```bash
mkdir public public/stylesheets
```

1. In your `server.js` file, add the following middleware to serve static files from the directory:

```javascript
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan('dev'));

// new code below this line
app.use(express.static(path.join(__dirname, "public")));

// new code above this line
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
```

3. Require the `path` module at the top of your `server.js` file:

```js
const methodOverride = require("method-override");
const morgan = require("morgan");
// new code below this line
const path = require("path");
```

4. Create a CSS a `style.css` file within the `stylesheets` folder:

```bash
touch public/stylesheets/style.css
```

## Basic Styling

1. Link the `style.css` file to all of your ejs pages by adding the following code within the `<head>` section of your pages:

```html
<!-- all template pages -->

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  // new code below this line
  <link rel="stylesheet" href="/stylesheets/style.css" />
</head>
```

2. Import our font from Google Fonts into `style.css` at the very top of the stylesheet:

```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz@9..40&display=swap");
```

3. Add an image to the `index.ejs` page:

```html
<!-- index.ejs homepage -->

<body>
  <h1>Welcome to the Fruits app!</h1>

  // new code below this line
  <img
    class="fruit-pic1"
    src="https://cdn-icons-png.flaticon.com/128/5312/5312448.png"
    alt="happy fruit salad bowl"
  />
  //new code above this line

  <p>An app for collecting your favorite fruits.</p>
</body>
```

4. Add a footer to the bottom of `index.ejs`, under the closing `</body>` tag (we'll use this to attribute the icon we're using for this app):

```html
<!-- index.ejs homepage -->

</body>
// new code below this line
<footer>Icons by <a href="https://www.flaticon.com/authors/freepik">Freekpik</a></footer>
```

5. Add the following basic styles to style.css:

```css
body {
  background: #fff8ed;
  font-family: "DM Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
}

h1 {
  color: #769642;
  font-size: 3.6em;
}

footer {
  font-size: 0.7em;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px;
}

.fruit-pic1 {
  height: 30%;
}
```

## Styling links

1. Modify the `<a>` tag on `index.ejs` to include a class called `fruits-index-link`:

```html
<!-- index.ejs fruits -->

<a class="fruits-index-link" href="/fruits">Browse Fruits</a>
```

2. Wrap the text of that same `<a>` tag in a `<div>` with the class name of `index-link-text`. Do this for all links in the app that say "Back to Fruits" (on the `fruits/edit.ejs` and `fruits/show.ejs` pages):

```html
<!-- edit.ejs / show.ejs -->

<a class="fruits-index-link" href="/fruits">
  <div class="index-link-text">Back to Fruits</div>
</a>
```

3. Add the following style rules to `style.css`:

```css
.fruits-index-link {
  text-decoration: none;
}

.index-link-text {
  background-color: #f47b5b;
  color: white;
  font-size: 1.4em;
  width: 10em;
  padding: 5px 15px;
  margin: 15px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 5px #ffbd59;
}

.index-link-text:hover {
  background-color: #ffbd59;
  box-shadow: 0 5px #f47b5b;
}

.index-link-text:active {
  background-color: #f47b5b;
  box-shadow: 0 2.5px #ffbd59;
}
```

## Styling forms

1. On `new.ejs` and `edit.ejs`, add a `<div>` around the `<label>` and `<input>` for `ready to eat`, and apply the class `checkbox-div`:

```html
<!-- new.ejs / edit.ejs -->

<div class="checkbox-div">
  <label for="ready-to-eat">Ready to Eat?</label>
  <input type="checkbox" name="isReadyToEat" id="ready-to-eat" />
</div>
```

2. Add the following CSS to `style.css`:

```css
form {
  font-family: "DM Sans", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffbd59;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 5px 6px #f47b5b;
  margin: 20px 10px;
}

.checkbox-div {
  flex-direction: row;
}

label,
input {
  margin: 10px 2px 0 2px;
}

button {
  align-self: center;
  margin: 10px 4px 4px 4px;
  background-color: #3f6a51;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  border: none;
  width: 15em;
}

button:hover {
  background-color: #769642;
}

button:active {
  background-color: #2d4d3a;
}
```

## Styling `show.ejs`

1. On `show.ejs` add a `<div>` around the content, buttons, and links, and apply the class `fruit-details`:

```html
<!-- show.ejs -->

<body>
  <div class="fruit-details">
    <!-- show page content -->
  </div>
  <a class="fruits-index-link" href="/fruits">
    <div class="index-link-text">Back to Fruits</div>
  </a>
</body>
```

2. Add a second `<div>` around the `delete` form and `edit` link, and give it a class of `fruit-actions`:

```html
<div class="fruit-actions">
  <form
    class="delete-form"
    action="/fruits/<%=fruit._id%>?_method=DELETE"
    method="POST"
  >
    <button class="delete-button" type="submit">
      Delete <%= fruit.name %>
    </button>
  </form>
  <a class="edit-link" href="/fruits/<%= fruit._id %>/edit">
    <div class="edit-text">Edit <%= fruit.name %></div>
  </a>
</div>
```

3. Add the following CSS to `style.css`:

```css
.fruit-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  padding: 20px 0;
}

.delete-form {
  padding: 0;
  box-shadow: 0 0;
  background-color: transparent;
  height: 50px;
  margin: 0 20px 0 0;
  min-height: 100%;
}
.delete-button {
  background-color: #f47b5b;
  text-transform: uppercase;
  padding: 40px 15px;
  width: 70%;
  /* height: 100%; */
  font-size: 1.3em;
  margin: 0;
  min-height: 100%;
}

.edit-link {
  text-decoration: none;
}

.edit-text {
  background-color: #3f6a51;
  text-transform: uppercase;
  padding: 40px 15px;
  font-size: 1.3em;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 70%;
  height: 50px;
}

.delete-button:hover {
  background-color: #ffbd59;
}

.delete-button:active {
  background-color: rgb(217, 108, 78);
}

.edit-text:hover {
  background-color: #769642;
}

.edit-text:active {
  background-color: #2d4d3a;
  background-color: rgb(217, 108, 78);
}
```

## Styling `fruits/index.ejs`

1. Modify the HTML structure on `fruits/index.ejs` to create a header `<div>` and wrap the fruit names in cards:

```html
<!-- index.ejs -->

<body>
  <div class="index-header-div">
    <h1>All Fruits</h1>
    <a class="add-fruit" href="/fruits/new">Add fruit</a>
  </div>
  <ul>
    <% fruits.forEach((fruit)=> { %>
    <li>
      <a class="fruit-cards" href="/fruits/<%=fruit._id%>">
        <%= fruit.name %>
      </a>
    </li>
    <% }) %>
  </ul>
</body>
```

2. Add class name to the `Add fruit` link called `add-fruit`:

```html
<a class="add-fruit" href="/fruits/new">Add fruit</a>
```

3. Add the following styles to `style.css`:

```css
/* index styling */

ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  list-style: none;
}

.fruit-cards {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: black;
  width: 40px;
  height: 70px;
  background-color: white;
  margin: 10px 15px;
  padding: 30px 50px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  border: 2.5px solid #ffbd59;
}

.fruit-cards:hover {
  border: 4px solid #f47b5b;
}

.fruit-cards:active {
  background-color: #a4cf5f67;
  border: 2.5px solid #ffbd59;
  color: gray;
}

.index-header-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 98%;
}

.add-fruit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  text-decoration: none;
  width: 6em;
  text-transform: uppercase;
  background-color: #769642;
  border-radius: 30px;
  color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 1.2em;
}

img {
  height: 100%;
  margin: 20px 0 0 0;
}
```

Congrats! You have a fully styled app!

</details>

· · · · · · · · · · · · · · · · · · · ·


## Recap

We've finished building our first large app! Let's zoom out and observe the moving pieces here.


### Reviewing the Technology and MVC Architecture of Our Web Application

In this section, we'll combine an overview of the technologies used in our web application and how they fit into the Model-View-Controller (MVC) architecture.


### Technologies Employed

- **JavaScript:** The backbone programming language used in this tech stack.

- **Node.js:** Executes JavaScript code outside of a browser, in a terminal environment.

- **Express:** A web framework managing the request-response cycle within the application.

- **EJS (Embedded JavaScript):** The template engine for rendering dynamic HTML pages based on data.

- **MongoDB:** A document-based database for storing data persistently.

- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying interactions with the database and enforcing data structure through schemas.


### MVC Architecture in Context

- **Client:** The browser or application initiating HTTP requests.

- **Server:** Listens for and processes incoming HTTP requests.

- **server.js:** The core of the application, orchestrating routes, middleware, database connections, and Express server setup.

- **Controllers (in server.js):** Handle specific request routes, interact with Mongoose models, and coordinate data flow between the model and view.

- **Model (Mongoose):** Interfaces with MongoDB, ensuring data adheres to predefined schemas.

- **Database (MongoDB):** Stores and manages data persistently, accessed via cloud-based MongoDB Atlas in this application.

- **View (EJS):** Utilizes templating to generate dynamic HTML pages. By integrating JavaScript into templates, EJS produces HTML that changes based on the data provided.


### Common Properties on the `req` Object

**`req.body`**: Object holding the form data a user has submitted. The keys on this object will match the name attributes of the inputs in the form and should conform with a model's schema if it is to be saved to a database. The values will match what the user provided in the form.

**`req.params`**: Object holding the URL parameters of a URL. The keys on this object will match the string provided after the `:` in the route. The value of each key will match the data from that segment in the URL.


### Common Methods on the `res` Object

**`res.render()`**: Always provided a string as the first argument. That string should be a file path and will never start with a `/`.

**`res.redirect()`**: - Always provided a string as the first argument. That string should be a valid route and will always start with a `/`.


## Resources

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/docs/)
- [EJS](https://ejs.co/)
