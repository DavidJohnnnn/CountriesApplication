// We require the following so we can make use of them below.
const express = require('express');
const fetch = require('node-fetch');
const ISO6391 = require('iso-639-1');


// Initialize our app
let app = express();


app.set("view engine", "ejs");  // Making ejs the view engine so we can render ejs pages instead of html pages.
app.use(express.static('public'));  // Allowing our app to use the files in public which include styles.css and styles.js files to be used.

app.get("/", function (req, res) {
  console.log(ISO6391.getCode("ENglish"));
  res.render("index");
});

app.get("/all", function (req, res) {
  fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderAllCountries(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.get("/by-name", function (req, res) {
  res.redirect("/");
});

app.get("/by-full-name", function (req, res) {
  res.redirect("/");
});

app.get("/by-country-code", function (req, res) {
  res.redirect("/");
});

app.get("/by-currency", function (req, res) {
  res.redirect("/");
});

app.get("/by-language", function (req, res) {
  res.redirect("/");
});

app.get("/by-capital-city", function (req, res) {
  res.redirect("/");
});

app.get("/by-calling-code", function (req, res) {
  res.redirect("/");
});

app.get("/by-region", function (req, res) {
  res.redirect("/");
});

app.get("/by-regional-block", function (req, res) {
  res.redirect("/");
});


app.post("/all", function (req, res) {
  fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderAllCountries(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-name", function (req, res) {
  console.log("test");

  fetch('https://restcountries.eu/rest/v2/name/united')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

function renderAllCountries(completeData, response) {
  response.render("allCountries", {countriesData: completeData});
}

function renderCountriesByName(completeData, response) {
  response.render("countriesByName", {countriesData: completeData});
}







app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});
