var express = require('express');
var router = express.Router();

router.get('/contact', function(req, res){
   res.send('This is Contact page.');
});

module.exports = router;