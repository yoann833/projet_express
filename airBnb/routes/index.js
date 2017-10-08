var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Connexion -->' });
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

module.exports = router;