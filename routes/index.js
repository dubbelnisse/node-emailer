var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function() {
  'use strict';

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: 'nilspontusnilsson@gmail.com',
    to: 'nilspontusnilsson@gmail.com',
    subject: 'hello',
    text: 'hello world!'
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
});

module.exports = router;
