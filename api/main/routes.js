var express = require('express');
var router = express.Router();

require('dotenv').config();

// data
const physicians = require('../data/physicians.json');
const patients = require('../data/patients.json');

// GET - list of physicians
router.get('/api/get/physicians', (req, res ) => {
  console.log(physicians);
  res.send(physicians);
})

// GET - list of appointments - given physician
router.get('/api/get/patients', (req, res ) => {
  res.send(patients);
})

// GET - list of appointments - given physician
router.post('/api/post/physician/patients', (req, res ) => {
  const physician = req.body.params.name;
  let result = [];
  patients.forEach(patient => {
    if (patient.physician === physician) {
      result.push(patient);
    }
  })
  res.send(result);
})


module.exports = router;
