var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
   res.send('This is Login page.');
});

module.exports = router;