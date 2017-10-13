var colors = require('colors');
var session = require('express-session');
var jsonfile = require('jsonfile');
var fs = require("fs");
var mail = require('nodemailer');
var contents = fs.readFileSync("profil.json");
var file = './profil.json';
var sess;


var express = require('express');
var router = express.Router();


router.use(session({secret: 'ssshhhhh'}));


var obj = [];
obj = JSON.parse(contents);

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

router.get('/chat', function(req, res, next) {

 
  res.render('chat', {});
});


// Login page
router.get('/login', function(req, res, next) {
  res.render('login', 
    { 
      title: 'Connexion -->',
      name : obj["user"][0]["nom"],
      password:obj["user"][0]["mdp"]
   });
});

router.get('/index', function(req, res, next) {
  res.render('index', {});
});

router.get('/profil', function(req, res, next) {
  res.render('profil', {data : 'Utilisateur : '+sess.email});
});

router.get('/mail', function(req, res, next) {
  res.render('mail', {data : 'Email : '});
});

router.post('/send_email', function(req, res, next) {

     mail.createTestAccount((err, account) => {
      
        var from_ = req.body.from;
        var to_ = req.body.to;
        var subject_ = req.body.subject;
        var corps_ = req.body.corps;

          // create reusable transporter object using the default SMTP transport
          let transporter = mail.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                  user: 'qz6g3s2iwex36ziv@ethereal.email', // generated ethereal user
                  pass: 'GPV6chz3PkxgJf293m'  // generated ethereal password
              },
              tls: { rejectUnauthorized: false }
          });
      
          // setup email data with unicode symbols
          let mailOptions = {
              from: from_, //'"Fred Foo 👻" <wa.yoann@gmail.com>', // sender address
              to: to_, //'wa.yoann@yahoo.fr', // list of receivers
              subject: subject_,//'subject_', // Subject line
              text: corps_,//'corps_', // plain text body
              html: '<b>Hello world?</b>' // html body
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              console.log('Preview URL: %s', mail.getTestMessageUrl(info));
          });
      });

      res.redirect('/index');
});

router.post('/updtate_profil', function(req, res, next) {
  
      var index = seachIndexOfElement(obj, sess.email);
      obj["user"][index]["nom"] = req.body.name;
      obj["user"][index]["mdp"] = req.body.password;

      jsonfile.writeFile(file, obj, function (err){
        console.error(err);
      })
      res.redirect('/login');
});
  
      
//  });
  
router.post('/post_form', function(req, res, next) {

  sess = req.session;
  var index = seachIndexOfElement(obj, req.body.login);

  if(req.body.login == obj["user"][index]["nom"] && req.body.password == obj["user"][index]["mdp"])
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


module.exports = router;