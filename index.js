//jshint esversion:6

// We require the following so we can make use of them below.
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const ISO6391 = require('iso-639-1');
//const countriesQuery = require('countries-code');
const countriesQuery = require("i18n-iso-countries");
const renderCountries = require(__dirname + "/renderCountries.js");

// Initialize our app
const app = express();


app.set("view engine", "ejs");  // Making ejs the view engine so we can render ejs pages instead of html pages.
app.use(express.static('public'));  // Allowing our app to use the files in public which include styles.css and styles.js files to be used.
app.use(bodyParser.urlencoded({extended: true})); // Allowing us to easily parse the data entered into the search bars.



app.get("/", function (req, res) {
  console.log(global.redirect);
  if (global.redirect) {
    console.log("redirect");
    global.redirect = false;
    res.render("index", {error: '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Try Again!</strong> You tried to enter something invalid. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'});
  } else {
    global.redirect = false;
    res.render("index", {error: ""});
  }
});

app.get("/all", function (req, res) {
  fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountries.renderAllCountries(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.get("/by-name", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-full-name", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-country-code", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-currency", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-language", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-capital-city", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-calling-code", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-region", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});

app.get("/by-regional-bloc", function (req, res) {
  global.redirect = true;
  res.redirect("/");
});


app.post("/all", function (req, res) {
  fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountries.renderAllCountries(data, res));
});

app.post("/by-name", function (req, res) {
  let url = 'https://restcountries.com/v3.1/name/';
  let searchTerm = req.body.byName;
  if (searchTerm === "") {
    redirect = true;
    console.log(redirect);
    res.redirect("/");
  } else {
    console.log(req.body.byName);
    let country = encodeURIComponent(searchTerm);
    url = url + country;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountries(data, res, "Search by name", searchTerm));
  }
});

app.post("/by-full-name", function (req, res) {
  let url = 'https://restcountries.com/v3.1/name/';
  let searchTerm = req.body.byFullName;
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    let country = encodeURIComponent(searchTerm);
    url = url + country + '?fullText=true';
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountries(data, res, "Search by full name", searchTerm));
  }
});

app.post("/by-country-code", function (req, res) {
  let url = 'https://restcountries.com/v3.1/alpha/';
  let searchTerm = req.body.byCountryCode;
  let code = encodeURIComponent(searchTerm);
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    url = url + code;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountriesByCode(data, res, code));
  }
});

app.post("/by-currency", function (req, res) {
  let url = 'https://restcountries.com/v3.1/currency/';
  let searchTerm = req.body.byCurrency;
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    let currency = encodeURIComponent(req.body.byCurrency);
    url = url + currency;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountries(data, res, "Search by currency", searchTerm));
  }
});

app.post("/by-language", function (req, res) {
  let url = 'https://restcountries.com/v3.1/lang/';
  let searchTerm = req.body.byLanguage;
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    let languageName = ISO6391.getCode(searchTerm);
    if (languageName === "") {  // Perhaps the user is trying to enter the ISO6391 language code.
      let languageCode = encodeURIComponent(searchTerm)
      url = url + languageCode;
      console.log(url);

      fetch(url)
      .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
      .then(data => renderCountries.renderCountries(data, res, "Search by language", searchTerm));
    } else {
      let language = encodeURIComponent(ISO6391.getCode(searchTerm));
      url = url + language;
      console.log(url);

      fetch(url)
      .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
      .then(data => renderCountries.renderCountries(data, res, "Search by language", searchTerm));
    }
  }
});

app.post("/by-capital-city", function (req, res) {
  let url = 'https://restcountries.com/v3.1/capital/';
  let searchTerm = req.body.byCapitalCity;
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    let capitalCity = encodeURIComponent(searchTerm);
    url = url + capitalCity;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountries(data, res, "Search by capital city", searchTerm));
  }
});

app.post("/by-calling-code", function (req, res) {
  let url = 'https://restcountries.com/v3.1/callingcode/';
  let searchTerm = req.body.byCallingCode
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    let callingCode = encodeURIComponent(searchTerm);
    url = url + callingCode;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountries(data, res, "Search by calling code", searchTerm));
  }
});

app.post("/by-region", function (req, res) {
  let url = 'https://restcountries.com/v3.1/region/';
  let searchTerm = req.body.byRegion;
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    let region = encodeURIComponent(searchTerm);
    url = url + region;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountries(data, res, "Search by region", searchTerm));
  }
});

app.post("/by-regional-bloc", function (req, res) {
  let url = 'https://restcountries.com/v3.1/regionalbloc/';
  let searchTerm = req.body.byRegionalBloc
  if (searchTerm === "") {
    global.redirect = true;
    res.redirect("/");
  } else {
    let regionalBloc = encodeURIComponent(searchTerm);
    url = url + regionalBloc;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries.renderCountries(data, res, "Search by regional bloc", searchTerm));
  }
});









app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
  global.redirect = false;
  console.log(global.redirect);
});
