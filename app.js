var MessengerPlatform = require('facebook-bot-messenger');
var app = require('express')();
var server = require('http').Server(app);
var bot = MessengerPlatform.create({
    pageID: '477957565916748',
    appID: '878905898934979',
    appSecret: '2455f898f237522ce85a6c8e080cb5d3',
    validationToken: 'abcd1234',
    pageToken: 'EAAcu06jEOW8BAD6BL43ELMqZAbbcQcEwAktB4d2ztm9rpHnBanX16QWWPRXi4PA3KEcI10gfXgqMZAl4CyKRbnOsH3eZAMNeFgLVk2EVWsiZC62l5ZCLFRqRNqBZCixFvOBXTiL6ZAGfnTaSUT1GsZCdmZCKsaaYmBHalayaCoZBQJhfutRa7CxLWM'
}, server);
app.use(bot.webhook('/webhook'));
bot.on(MessengerPlatform.Events.MESSAGE, function (userId, message) {
    // add code below.
});
server.listen(5000);