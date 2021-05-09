// We require the following so we can make use of them below.
const express = require('express');
const fetch = require('node-fetch');
const ISO6391 = require('iso-639-1');
const bodyParser = require('body-parser');

// Initialize our app
let app = express();


app.set("view engine", "ejs");  // Making ejs the view engine so we can render ejs pages instead of html pages.
app.use(express.static('public'));  // Allowing our app to use the files in public which include styles.css and styles.js files to be used.
app.use(bodyParser.urlencoded({extended: true}));


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
  let url = 'https://restcountries.eu/rest/v2/name/';
  let country = encodeURIComponent(req.body.byName);
  url = url + country;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-full-name", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/name/';
  let country = encodeURIComponent(req.body.byFullName);
  url = url + country + '?fullText=true';
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-country-code", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/alpha/';
  let code = encodeURIComponent(req.body.byCountryCode);
  url = url + code;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByCode(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-currency", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/currency/';
  let currency = encodeURIComponent(req.body.byCurrency);
  url = url + currency;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-language", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/lang/';
  let language = encodeURIComponent(ISO6391.getCode(req.body.byLanguage));
  url = url + language;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-capital-city", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/capital/';
  let capitalCity = encodeURIComponent(req.body.byCapitalCity);
  url = url + capitalCity;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-calling-code", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/callingcode/';
  let callingCode = req.body.byCallingCode;
  url = url + callingCode;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-region", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/region/';
  let region = req.body.byRegion;
  url = url + region;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.post("/by-regional-block", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/regionalbloc/';
  let regionalBloc = req.body.byRegionalBlock;
  url = url + regionalBloc;
  console.log(url);

  fetch(url)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderCountriesByName(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});



function renderAllCountries(completeData, response) {
  console.log(completeData.status);

  if (completeData.status === undefined) {
    console.log('got it');
    response.render("allCountries", {countriesData: completeData});
  } else {
    response.redirect("/");
  }
}

function renderCountriesByName(completeData, response) {
  console.log(completeData);
  if (completeData.status === undefined) {
    response.render("countriesByName", {countriesData: completeData});
  } else {
    response.redirect("/");
  }
}

function renderCountriesByCode(completeData, response) {
  console.log(completeData);
  if (completeData.status === undefined) {
    response.render("countriesByCode", {countriesData: completeData});
  } else {
    response.redirect("/");
  }
}








app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});
