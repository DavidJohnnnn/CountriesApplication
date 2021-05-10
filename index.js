//jshint esversion:6

// We require the following so we can make use of them below.
const express = require('express');
const fetch = require('node-fetch');
const ISO6391 = require('iso-639-1');
const bodyParser = require('body-parser');

// Initialize our app
let app = express();
let redirect = false; // Used to check if we've been redirected to get rather.


app.set("view engine", "ejs");  // Making ejs the view engine so we can render ejs pages instead of html pages.
app.use(express.static('public'));  // Allowing our app to use the files in public which include styles.css and styles.js files to be used.
app.use(bodyParser.urlencoded({extended: true})); // Allowing us to easily parse the data entered into the search bars.



app.get("/", function (req, res) {
  console.log(redirect);
  if (redirect) {
    console.log("redirect");
    redirect = false;
    res.render("index", {error: '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Try Again!</strong> You tried to enter something invalid. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'});
  } else {
    redirect = false;
    res.render("index", {error: ""});
  }
});

app.get("/all", function (req, res) {
  fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderAllCountries(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

app.get("/by-name", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-full-name", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-country-code", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-currency", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-language", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-capital-city", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-calling-code", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-region", function (req, res) {
  redirect = true;
  res.redirect("/");
});

app.get("/by-regional-bloc", function (req, res) {
  redirect = true;
  res.redirect("/");
});


app.post("/all", function (req, res) {
  fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderAllCountries(data, res));
});

app.post("/by-name", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/name/';
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
    .then(data => renderCountries(data, res, "Search by name", searchTerm));
  }
});

app.post("/by-full-name", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/name/';
  let searchTerm = req.body.byFullName;
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    let country = encodeURIComponent(searchTerm);
    url = url + country + '?fullText=true';
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries(data, res, "Search by full name", searchTerm));
  }
});

app.post("/by-country-code", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/alpha/';
  let searchTerm = req.body.byCountryCode;
  let code = encodeURIComponent(searchTerm);
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    url = url + code;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountriesByCode(data, res, code));
  }
});

app.post("/by-currency", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/currency/';
  let searchTerm = req.body.byCurrency;
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    let currency = encodeURIComponent(req.body.byCurrency);
    url = url + currency;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries(data, res, "Search by currency", searchTerm));
  }
});

app.post("/by-language", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/lang/';
  let searchTerm = req.body.byLanguage;
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    let languageName = ISO6391.getCode(searchTerm);
    if (languageName === "") {  // Perhaps the user is trying to enter the ISO6391 language code.
      let languageCode = encodeURIComponent(searchTerm)
      url = url + languageCode;
      console.log(url);

      fetch(url)
      .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
      .then(data => renderCountries(data, res, "Search by language", searchTerm));
    } else {
      let language = encodeURIComponent(ISO6391.getCode(searchTerm));
      url = url + language;
      console.log(url);

      fetch(url)
      .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
      .then(data => renderCountries(data, res, "Search by language", searchTerm));
    }
  }
});

app.post("/by-capital-city", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/capital/';
  let searchTerm = req.body.byCapitalCity;
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    let capitalCity = encodeURIComponent(searchTerm);
    url = url + capitalCity;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries(data, res, "Search by capital city", searchTerm));
  }
});

app.post("/by-calling-code", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/callingcode/';
  let searchTerm = req.body.byCallingCode
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    let callingCode = encodeURIComponent(searchTerm);
    url = url + callingCode;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries(data, res, "Search by calling code", searchTerm));
  }
});

app.post("/by-region", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/region/';
  let searchTerm = req.body.byRegion;
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    let region = encodeURIComponent(searchTerm);
    url = url + region;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries(data, res, "Search by region", searchTerm));
  }
});

app.post("/by-regional-bloc", function (req, res) {
  let url = 'https://restcountries.eu/rest/v2/regionalbloc/';
  let searchTerm = req.body.byRegionalBloc
  if (searchTerm === "") {
    redirect = true;
    res.redirect("/");
  } else {
    let regionalBloc = encodeURIComponent(searchTerm);
    url = url + regionalBloc;
    console.log(url);

    fetch(url)
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => renderCountries(data, res, "Search by regional bloc", searchTerm));
  }
});



function renderAllCountries(completeData, response) {
  console.log(completeData.status);

  if (completeData.status === undefined) {
    console.log('got it');
    response.render("allCountries", {countriesData: completeData});
  } else {
    redirect = true;
    response.redirect("/");
  }
}

function renderCountries(completeData, response, searchType, searchTerm) {
  console.log(completeData);
  if (completeData.status === undefined) {
    response.render("countriesSearch", {search: searchType, searched: searchTerm, countriesData: completeData});
  } else {
    redirect = true;
    response.redirect("/");
  }
}

function renderCountriesByCode(completeData, response, countryCode) {
  console.log(completeData);
  if (completeData.status === undefined) {
    response.render("countriesByCode", {code: countryCode, countriesData: completeData});
  } else {
    redirect = true;
    response.redirect("/");
  }
}








app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});
