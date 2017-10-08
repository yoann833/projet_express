var express = require('express');
var router = express.Router();
var colors = require('colors');

var session = require('express-session');
// template ejs ajouté (npm install ejs)

//Resultats recherche page destination
var sess;
router.use(session({secret: 'ssshhhhh'}));


/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  if(sess.email) 
  {
    res.redirect('/index');
  }
  else 
  {
    res.redirect('/login');
  }
});

// Login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Connexion -->' });
});

router.get('/index', function(req, res, next) {
  res.render('index', {});
});

router.post('/post_form', function(req, res, next) {

  sess = req.session;
  
  var index = seachIndexOfElement(profilUser, req.body.login);

  if(req.body.login == profilUser["user"][index]["nom"] && req.body.password == profilUser["user"][index]["mdp"])
  {
    sess.email = req.body.login;
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

function seachIndexOfElement(obj, element)
{
  for(var i=0; i < obj['user'].length; i++)
  {
    if(obj["user"][i]["nom"] == element)
    {
      return i;
    }
  }
}

var profilUser =
{

  'user': 
  [
    {
        'nom': "admin",
        'mail': "admin@mail.com",
        'mdp': "azerty"
    },
    {
        'nom': "yoann",
        'mail': "yoann@mail.com",
        'mdp': "azerty"
    },
    {
        'nom': "bruno",
        'mail': "bruno@mail.com",
        'mdp': "azerty" 
    }
  ]
};

module.exports = router;