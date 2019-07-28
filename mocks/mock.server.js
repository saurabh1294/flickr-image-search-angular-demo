const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

var originsWhitelist = [
    'http://localhost:4200'
	// add more whitelisted URLs here comma separated
];
var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
// whitelist domains for CORS/CORB
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log('[mock] requested URL:', req.url);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/getImages', function(req, res) {
    res.send({data: "Test endpoint which will send flickr images"});
});

const routes = require("./mock.routes.js")(app);

const server = app.listen(3456, function() {
    console.log("[mock] mock server listening on port %s...", server.address().port);
});