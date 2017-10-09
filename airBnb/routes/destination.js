var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var fs = require("fs");
var contents = fs.readFileSync("destination.json");
var file = './destination.json';



// template ejs ajouté (npm install ejs)


//Resultats recherche page destination
router.get('/', function(req, res, next) {
  res.render('hotel.ejs', {nom: req.query.nom, createdDestinations: createdDestinations[req.query.nom]});
});

/*
//resultat choix hotel
router.get('/hotel', function(req, res, next) {
  res.render('reservation.ejs', {id: req.query.id, name: req.query.nom, hotel: createdDestinations[req.query.nom][req.query.id]});
});

//resultat reservation hotel
router.get('/hotel/reservation', function(req, res, next) {
  console.log('hello')
  res.render('confirm.ejs', {id: req.query.id, name: req.query.nom, places: req.query.places, hotel: createdDestinations[req.query.nom][req.query.id]});
});
*/

//Resultats recherche page destination params
router.get('/:nom', function(req, res, next) {
  res.render('hotel.ejs', {nom: req.params.nom, createdDestinations: createdDestinations[req.params.nom]});
});

//resultat choix hotel params
router.get('/hotel/:id/:nom', function(req, res, next) {
  res.render('reservation.ejs', {id: req.params.id, nom: req.params.nom, hotel: createdDestinations[req.params.nom][req.params.id]});
});

//resultat reservation hotel
router.get('/hotel/reservation/:id/:name/:places', function(req, res, next) {
  console.log('hello')
  res.render('confirm.ejs', {id: req.params.id, name: req.params.nom, places: req.params.places, hotel: createdDestinations[req.params.nom][req.params.id]});
});

//resultat reservation hotel
router.get('/hotel/reservation/confirm/:id/:nom/:boolean', function(req, res, next) {
  //createdDestinations[req.params.nom]
  var modif = createdDestinations[req.params.nom][req.params.id];
  createdDestinations[req.params.nom][req.params.id].reserved = 1;
  //console.log(createdDestinations)
  //console.dir(jsonfile.readFileSync(file))
  jsonfile.writeFile(file, createdDestinations, function (err){
    console.error(err);
  })
  res.render('confirm.ejs', {id: req.params.id, nom: req.params.nom, boolean: req.params.boolean,
                             hotel: createdDestinations[req.params.nom][req.params.id]});
});

var createdDestinations = [];
createdDestinations = JSON.parse(contents);


module.exports = router;