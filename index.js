// We require the following so we can make use of them below.
const express = require('express');
const fetch = require('node-fetch');

// Initialize our app
let app = express();


app.set("view engine", "ejs");  // Making ejs the view engine so we can render ejs pages instead of html pages.
app.use(express.static('public'));  // Allowing our app to use the files in public which include styles.css and styles.js files to be used.

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/all", function (req, res) {
  fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => renderAllCountries(data, res));  // The function renderWebpage is run with the retrieved JSON data.
});

function renderAllCountries(completeData, response) {
  console.log(completeData);
  res.render("index");

  //response.render("index", {hatchways: hatchwaysData, candidateAvg: averages}); // Our index.ejs file within our views folder is passed the hatchwaysData passed into this function and uses the response passed in as well to render our web application.
}






app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});
