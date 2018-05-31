const db = require('../db');
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') require('../secret');

const getTheClassics = async () => {
  try {
    const pizzerias = await axios({
      method: 'POST',
      url: 'https://api.yelp.com/v3/graphql',
      headers: {
        Authorization: `BEARER ${process.env.YELP_API_KEY}`
      },
      data: {
        query: `{
          search(term: "pizza",
            location: "new york city",
            sort_by: "rating",
            limit: 50) {
            total
            business {
              name
              price
              rating
              location {
                address1
                city
                zip_code
              }
              coordinates {
                latitude
                longitude
              }
            }
          }
        }`
      }
    })

    pizzerias.data.data.search.business.forEach(async pizzeria => {
      const { name, price, rating, location, coordinates } = pizzeria;
      await db.collection('pizzerias').doc(name).set({
        name,
        price,
        rating,
        address: location.address1,
        city: location.city,
        zip: location.zip_code,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      })
    })

  } catch (err) {
    console.log(err)
  }
}

getTheClassics()
  .then(() => console.log('seeded pizzerias'))
  .catch(console.log)