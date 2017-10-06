var express = require('express');
var router = express.Router();


var data = 
{
    Boston: {
                  Hotel1 : 'Le Premier',
                  Hotel2 : 'Palas Royal'
              },
    NewYork: {
                Hotel1: 'Hotel un' ,
                Hotel2: 'Hotel deux'
              }
};

//console.log(data);
//console.log(JSON.stringify(data.Boston.Hotel1))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Connexion -->' });
});

//destination page
router.get('/destination', function(req, res, next) {
  res.render('destination', data);
});


router.post('/post_form', function(req, res, next) {

  if(req.body.login == "coucou" && req.body.password == "azerty")
  {
    console.log('authentified')
    res.redirect('/');
  }
  else
  {
    console.log('not authentified')
    res.redirect('/login');
  }
  console.log(JSON.stringify(req.body.login));
  
  
});

// redirection destination 
router.post('/search/:value', function(req, res, next) {

  console.log(req.params.value);
  console.log(req.body.value);
  res.redirect('/destination');
});



module.exports = router;
