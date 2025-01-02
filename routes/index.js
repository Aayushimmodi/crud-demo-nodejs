var express = require('express');
const userModel = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function (req, res, next) {
  res.render('add');
});
router.post('/add', function (req, res, next) {
  var bodydata = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  var mydata = userModel(bodydata)
  mydata.save();
  res.send("Add")
});
router.get('/display', function (req, res, next) {
  userModel.find()
    .then((data) => {
      res.render('display', { mydata: data })
    })
    .catch(err => console.log(err))
});
router.get('/show/:id', function (req, res, next) {
  var id = req.params.id;
  userModel.findById(id)
    .then(data => {
      res.render('show', { mydata: data })
    })
    .catch(err => console.log(err))
});
router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  userModel.findByIdAndDelete(id)
    .then(data => {
      res.redirect('/display')
    })
    .catch(err => console.log(err))
});
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  userModel.findByIdAndUpdate(id)
    .then(data => {
      res.render('edit', { mydata: data })
    })
    .catch(err => console.log(err))
});
router.post('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var mydata = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  userModel.findByIdAndUpdate(id, mydata)
    .then(data => {
      res.redirect('/display');
    })
    .catch(err => console.log(err))
});


module.exports = router;
