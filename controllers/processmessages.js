const FACEBOOK_ACCESS_TOKEN = 'EAAcu06jEOW8BAF40ny3xdLCKP0kOqMw0Kb6rIgbaxSLIPwdCoh5O0U8lrBFifd5glSl1AGEuhfB9sqOu4ZAalV65kThMWSZAMNhshyDAjJrR8i5LaoMEEKsexzw3DYGZCFmlKr6ZARdxnbovi9oRoZCJxOaPxQj0rQtJA9Xsc97VOKlY8URur';

module.exports = (event) => {
    console.log(event);
    const senderId = event.sender.id;
    const message = event.message.text;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message:  "hi"
        }
    });
};