const express = require('express');

const app = express();
const http = require('node:http');
const https = require('node:https');
const axios = require('axios');
const router = express.Router();

router.get('/all', function (req, res) {

  https.get('https://api.restful-api.dev/objects', (result) => {
    console.log('statusCode:', res.statusCode);

    let data = '';
    result.on('data', function (chunk) {
      data += chunk;
    });

    result.on('end', () => {
      res.send(JSON.parse(data));
    });
  }).on('error', (e) => {
    console.error(e);
  });

});

router.post('/add', function (req, res) {

  var payload = { "name": "bbb MacBook Pro 18", "data": { "year": 2023, "price": 2333, "CPU model": "Intel Core i10", "Hard disk size": "8 TB" } };
  
  axios({
    method: 'post',
    url: 'https://api.restful-api.dev/objects',
    data: payload,
    headers: {'Content-Type': 'application/json'}
  }).then(apiResponse=>{
     const products = apiResponse.data
     res.json(products)
  })

});

router.get('/test', function (req, res) {

  var payload = { 
    "name": "John", 
    "address": { "street": "123 Main set", "city": "Nowhere"} 
  };
  
  const updateUser = {...{...payload}};

  updateUser.name = "Doe";
  updateUser.address.city = "Somewhere";
  

  console.log(payload.name);
  console.log(payload.address.city);


});



module.exports = router;
