var express = require('express');
var router = express.Router();

router.get('/info', function(req, res){
   res.send('This is Info page.');
});

module.exports = router;