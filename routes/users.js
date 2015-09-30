var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  res.send(req.query,200);
});
router.get('/:id', function(req, res, next) {
  console.log(req.params);
  res.send('respond with a resource:'+req.params.id);

});

module.exports = router;
