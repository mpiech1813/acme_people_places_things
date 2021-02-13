const {
  syncAndSeed,
  models: { Person, Place, Thing },
} = require('./db/db');
const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {
  const people = await Person.findAll();
  // people.length
  const places = await Place.findAll();
  const things = await Thing.findAll();
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on ${port}`));
  } catch (error) {
    next(error);
  }
};

init();
