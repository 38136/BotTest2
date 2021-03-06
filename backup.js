const express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const request = require('request');

app.use(express.static(__dirname));
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', (process.env.PORT || 5000));

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
});

// for Facebook verification
app.get('/webhook', function (req, res) {
    const hubChallenge = req.query['hub.challenge'];

    const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === 'abcd1234');

    if (hubMode && verifyTokenMatches) {
        res.status(200).send(hubChallenge);
    } else {
        res.status(403).end();
        console.log("error in verification");
    }
});

app.post('/check', function (req, res) {
    console.log("1st in check");
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            sendTextMessage("1521632447874691", "Text received, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
});

const token = "EAAcu06jEOW8BAF40ny3xdLCKP0kOqMw0Kb6rIgbaxSLIPwdCoh5O0U8lrBFifd5glSl1AGEuhfB9sqOu4ZAalV65kThMWSZAMNhshyDAjJrR8i5LaoMEEKsexzw3DYGZCFmlKr6ZARdxnbovi9oRoZCJxOaPxQj0rQtJA9Xsc97VOKlY8URur"
function sendTextMessage(sender, text) {
    let messageData = { text:hi }
    request({
        url: 'https://graph.facebook.com/v2.10/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: "hi",
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    });
}


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})