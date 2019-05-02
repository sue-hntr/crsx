var express = require('express');
var router = express.Router();
var path = require("path");
// var db = require("../models");
var User = require('../models/user');
var Appointment = require('../models/Appointment');
var Appointments = require('../models/Appointment');
var mid = require('../middleware');

//  * index.html, ** register.html, 
//  * * login.html, * bringforms.html, 
//  * contact.html, * profile.html,
//  * logout ** appointments


  // GET /index homepage
  router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // GET /register 
  router.get('/register', mid.loggedOut, function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  // POST /register
  router.post('/register', function(req, res, next) {
    console.log(req.body);
    if ( req.body.email && 
       req.body.password &&
       req.body.confirmpassword && 
       req.body.firstname && 
       req.body.lastname) {
        // console.log('yes');
        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmpassword) {
          var err = new Error('Passwords do not match.');
          err.status = 400;
          return next(err);
        }
      
        // create object with form input
        var userData = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          isStaff: false
        };

        // use schema's `create` method to insert document into Mongo
        User.create(userData, function (error, user) {
          if (error) {
            return next(error);
          } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
          }
        });
      }else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
    });  

  // GET /login
  router.get('/login', mid.loggedOut, function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // POST /login
  router.post('/login', function(req, res, next) {
    if (req.body.email && req.body.password){
      User.authenticate(req.body.email, req.body.password, function (error, user){
        if (error || !user){
          var err  = new Error ('Wrong email or password');
          err.status = 401;
          return next(err);
        } else {
          //USE THIS IN ROUTES THAT NEED SESSION DATA ONLY WORKS AFTER AUTHENTICATION
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    } else {
      var err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }
  });

  //GET logout
  router.get('/logout', function(req, res, next){
    if (req.session){
      //delete session object
      req.session.destroy(function(err){
        if(err){
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

  // GET /bringforms
  router.get('/bringforms', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/bringforms.html"));
  });


  // GET /contact
  router.get('/contact', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });

    // GET /contact
    router.get('/about', function(req, res, next) {
      res.sendFile(path.join(__dirname, "../public/about.html"));
    });

    // GET /contact
    router.get('/staff', mid.requiresLogin, function(req, res, next) {
      res.sendFile(path.join(__dirname, "../public/staff.html"));
    });

  // GET /profile 
  router.get('/profile', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          res.sendFile(path.join(__dirname, "../public/profile.html"));
    //USE THIS TO GRAB INFO FROM DB      
          User.findById({_id: req.session.userId}, 'firstname lastname email' , function (err, person){
            if (err) {
                return next(error);
            } else {
                console.log("profile" + user.firstname);
            }
          }) //close user find
        }//close first if statement
      }) //close exec
  }) //close get


  // GET /routerointment
router.get('/appointment', mid.requiresLogin, function(req, res, next) {
    console.log("rsu " + req.session.userId);
    res.sendFile(path.join(__dirname, "../public/appointment.html"));
    // console.log("rsu" + req.session.userId);
  });


  // GET /routerointment
  router.get('/appointmentresponse', mid.requiresLogin, function(req, res, next) {
    console.log("rsu " + req.session.userId);
    // let a = "{'userID': '";
    // let b = req.session.userId;
    // let c = "'}"
    // let d = (a+ b+ c);
    // Appointments.find( d, 'phone email', function (err, user){
    Appointments.findOne({'userID': req.session.userId}, function(err, result, appointment){
    // , 'phone email', function (err, appointment){
        if (err) {
          return next(error);
        } if (result) {
          console.log("afo: " + result);
          console.log("apt 2: " + result.phone);
        } else {
          console.log("no Good");
          // aphone = appointment.phone;
          // aemail = appointment.email;
          // console.log("appt response" + aphone + " " + aemail);
        }
      });
    });
    // res.sendFile(path.join(__dirname, "../public/appointmentresponse.html"));
    // console.log("rsu" + req.session.userId);


//POST APPOINTMENT - User finsihes request for Appt
router.post('/appointment', mid.requiresLogin, function(req, res, next) {
//USE THIS TO GRAB INFO FROM DB 
  console.log("rsu post " + req.session.userId);
  User.findById({_id: req.session.userId}, 'firstname lastname email' , function (err, user){
          if (err) {
              return next(error);
          } else {
              cfirstname = user.firstname;
              clastname = user.lastname;
              cemail = user.email;
              console.log("appt " + cfirstname + " " + clastname + " " + cemail);
          }
      // }) ATTACH APPOINTMENT ONTO USER IN PROMISE TO KEEP user.info
          Appointment.create({
            userID: req.session.userId,
            firstname: cfirstname,
            lastname: clastname,
            email: cemail,
            phone: req.body.phone,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            timeforappt: req.body.timeforappt,
            prepurchaseworkshop: req.body.prepurchaseworkshop,
            creditcounseling: req.body.creditcounseling,
            postpurchase: req.body.postpurchase,
            prebankruptcy: req.body.prebankruptcy,
            taxdelinquency: req.body.taxdelinquency,
            defaultdelinquency: req.body.defaultdelinquency,
            discussinperson: req.body.discussinperson,
            contactbyphone: req.body.contactbyphone,
            contactbyemail: req.body.contactbyemail
            }) 
      .then (
        function (appointments) {
          console.log(appointments);
        } //close function
       ) //close then
  }) //close create
}) //close userfind
 //close post appointment


  module.exports = router;