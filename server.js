const {
  syncAndSeed,
  models: { Person, Place, Thing },
} = require('./db/db');

const homePage = require('./views/home');

const express = require('express');
const app = express();

app.use(require('method-override')('_method'));
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res, next) => {
  try {
    const people = await Person.findAll();
  // people.length
    const places = await Place.findAll();
    const things = await Thing.findAll();
    res.send(homePage(people, places, things));
  } catch (error) {
    console.error(error);
  }
});


app.put('/purchase', async (req, res, next) => {
  try {
    console.log("request", req.body);
    const findPerson = await Person.findByPk(req.body.person);
    console.log("findPerson", findPerson)
    const findThing = await Thing.findByPk(req.body.thing);
    console.log("findThing", findThing);
    const findPlace = await Place.findByPk(req.body.place);
    findThing.update({personId: findPerson.id, placeId: findPlace.id});

    res.redirect('/joined');
  } catch (error) {
    console.log(error)
  }
});

app.get('/joined', async (req, res, next) => {
  try {
    const [people, places, things] = await Promise.all([
      Person.findAll({
        include: [Thing]
      }),
      Place.findAll({
        include: [Thing]
      }),
      Thing.findAll({
        include: [Person]
      })
    ])

    res.send({
      people,
      places,
      things
    })
  } catch (error) {
    console.error(error)
  }
})

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on ${port}`));
  } catch (error) {
    console.error(error);
  }
};

init();
