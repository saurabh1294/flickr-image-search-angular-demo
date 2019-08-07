const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const request = require('request-promise');

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


const fireRequest = function(req, res, query) {
	const payload = (req.query) ? req.query.query : query;
	const filckrAPIURL = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${payload}
    &format=json&jsoncallback=JSONP_CALLBACK`;

	request.get({
			url: filckrAPIURL,
			gzip: true
		},
		function(error, response, body) {
			if (error) {
				res.send({
					error: error
				});
			}
			body = body.replace('JSONP_CALLBACK(', '');
			body = body.replaceAt(body.length - 1, ' ');
			res.json(JSON.parse(body)); // converts and sends JSON
		});
}

// string replace at index function
String.prototype.replaceAt = function(index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
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
	fireRequest(req, res, "Australia");
});

const server = app.listen(3456, function() {
	console.log("[mock] mock server listening on port %s...", server.address().port);
});