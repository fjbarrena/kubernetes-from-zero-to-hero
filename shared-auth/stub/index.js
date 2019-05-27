const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/message', function (req, res) {
	res.json({ text: 'Hello world!' });
});

app.post('/authorize', function (req, res) {
	let status = 401;

	if (req.body.password === "secret") {
		status = 200;
	}

	res.sendStatus(status);
});

app.listen(3001, function () {
	console.log('Stub listening on port 3001!');
});

