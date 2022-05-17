// Import necessary modules (express, hbs, path)
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");
const path = require("path");

// application entry point
const app = express();
// Environment-designated port or 3000 as default
const PORT = process.env.PORT || 3000;

// Specific paths
const view_path = path.join(__dirname, "templates", "views");
const partials_path = path.join(__dirname, "templates", "partials");
// app configurations (views, view engine, static files)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");

hbs.registerPartials(partials_path);
app.set("views", view_path);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Main page",
    creator: "nitec427",
    page_title: "Main Page",
    show_links: true,
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    creator: "nitec427",
    page_title: "Help",
    show_links: true,
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Ismail",
    surname: "Cetin",
    page_title: "About Me",
    origin: "Turkey",
    show_links: true,
  });
});
app.get("/weather", (req, res) => {
  if (!Object.keys(req.query).length) {
    return res.redirect("/404");
  }
  // Now send data as JSON
  const { address } = req.query;
  if (!address) {
    console.error("No address provided");
  } else {
    geocode(address, (err, { latitude, longitude, location } = {}) => {
      if (err) return res.send(err);
      console.log(latitude, longitude);
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send(error);
        return res.send(forecastData);
      });
    });
  }
});
app.get("/form", (req, res) => {
  res.render("form", {
    title: "Form Page",
    name: "nitec427",
    show_links: true,
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "nitec427",
    errorMessage: "Page not found.",
    show_links: false,
  });
});
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
