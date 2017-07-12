const path = require('path');
const express = require('express');
const app = express();
console.log("----YES-----");
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS

app.enable('trust proxy');

app.use(function(req, res, next) {
  if (req.headers["x-forwarded-proto"] === "http" || !req.secure){
    return next();
  }
  res.redirect("http://" + req.headers.host + req.url);

});


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);