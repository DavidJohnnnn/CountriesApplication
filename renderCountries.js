const ISO6391 = require('iso-639-1');
const countriesQuery = require("i18n-iso-countries");

global.redirect = false;

exports.renderAllCountries = function (completeData, response) {
  if (completeData.status === undefined) {
    response.render("countriesSearch", {langs: ISO6391, countryCodes: countriesQuery, search: "All Countries", searched: "", countriesData: completeData});
  } else {
    global.redirect = true;
    response.redirect("/");
  }
};

exports.renderCountries = function (completeData, response, searchType, searchTerm) {
  if (completeData.status === undefined) {
    response.render("countriesSearch", {langs: ISO6391, countryCodes: countriesQuery, search: searchType, searched: searchTerm, countriesData: completeData});
  } else {
    global.redirect = true;
    response.redirect("/");
  }
};

exports.renderCountriesByCode = function (completeData, response, countryCode) {
  if (completeData.status === undefined) {
    response.render("countriesSearch", {langs: ISO6391, countryCodes: countriesQuery, search: "Search country by code", searched: countryCode, countriesData: completeData});
  } else {
    global.redirect = true;
    response.redirect("/");
  }
};
