var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect('mongodb://localhost:27017/highlight', function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + res);
  }
});

module.exports = mongoose;
