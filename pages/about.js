var express = require('express');
var router = express.Router();

router.get('/about', function(req, res){
   res.send('This is About page.');
});

module.exports = router;