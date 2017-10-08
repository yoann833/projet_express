var express = require('express');
var router = express.Router();


// template ejs ajouté (npm install ejs)

//Resultats recherche page destination
router.get('/', function(req, res, next) {
  res.render('hotel.ejs', {nom: req.query.nom, createdDestinations: createdDestinations[req.query.nom]});
});

//resultat choix hotel
router.get('/hotel', function(req, res, next) {
  res.render('reservation.ejs', {id: req.query.id, name: req.query.nom, hotel: createdDestinations[req.query.nom][req.query.id]});
});

//resultat reservation hotel
router.get('/hotel/reservation', function(req, res, next) {
  console.log('hello')
  res.render('confirm.ejs', {id: req.query.id, name: req.query.nom, places: req.query.places, hotel: createdDestinations[req.query.nom][req.query.id]});
});




var createdDestinations =
{

  "Boston": 
  [
    {
      "nom": "Premier hotel de Boston",
      "prix": "$18",
      "places": "2",
      "id": "0"
    },
    {
      "nom": "Deuxième hotel de Boston",
      "prix": "$24",
      "places": "3",
      "id": "1"
    },
    {
      "nom": "Troisième hotel de Boston",
      "prix": "$50",
      "places": "4",
      "id": "2"
    }
  ],
  "NewYork":
  [
    {
      "nom": "Premier hotel de NY",
      "prix": "$33",
      "places": "2",
      "id": "0"
    },
    {
      "nom": "Deuxième hotel de NY",
      "prix": "$54",
      "places": "3",
      "id": "1"
    },
    {
      "nom": "Troisième hotel de NY",
      "prix": "$105",
      "places": "4",
      "id": "2"
    }
  ]
};

module.exports = router;