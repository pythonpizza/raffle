const functions = require('firebase-functions');

exports.eventbriteWebhook = functions.https.onRequest((request, response) => {
    console.log('--------------------------------------------');
    console.log('new logs');
    console.log('body is:', request.body);
    response.send('Hello from Firebase!');
});
