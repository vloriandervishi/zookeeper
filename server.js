const { animals } = require("./data/animals.json");
const express = require("express");
const app = express();

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // save personalityTraits as a dedicated array
    //If personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    } // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

//The first is that the get() method requires two arguments.
//The first is a string that describes the route the client will have to fetch from.
//The second is a callback function that will execute every time that route is accessed with a GET request.
app.get("/api/animals", (req, res) => {
  let results = animals;

  // The second takeaway is that we are using the send() method
  // from the res parameter (short for response) to send the string Hello! to our client.

  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
