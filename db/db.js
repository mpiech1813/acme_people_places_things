const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize('postgres://localhost/acme_people_places_things');

const Person = conn.define('person', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

const Place = conn.define('place', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

const Thing = conn.define('thing', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

Person.hasMany(Thing);
Thing.belongsTo(Person);
Thing.belongsTo(Place);
Place.hasMany(Thing);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry] = await Promise.all(
    ['moe', 'lucy', 'larry'].map((name) => Person.create({ name: name }))
  );
  const [nyc, chicago, la, dallas] = await Promise.all(
    ['nyc', 'chicago', 'la', 'dallas'].map((name) =>
      Place.create({ name: name })
    )
  );
  const [foo, bar, buzz, quq] = await Promise.all(
    ['foo', 'bar', 'buzz', 'quq'].map((name) => Thing.create({ name: name }))
  );
};

module.exports = {
  syncAndSeed,
  models: {
    Person,
    Place,
    Thing,
  },
};
