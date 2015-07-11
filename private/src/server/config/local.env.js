'use strict';

// Environment variables that grunt will set when the server starts locally. Use for your api keys, secrets, etc.
// You will need to set these on the server you deploy to.
//
// This file should not be tracked by git.

module.exports = {
    DOMAIN: 'https://' + process.env.IP + ':' + process.env.PORT, //'http://localhost:9000',
    SESSION_SECRET: "jssparkui-secret",

    FACEBOOK_ID: 'app-id',
    FACEBOOK_SECRET: 'secret',

    TWITTER_ID: 'app-id',
    TWITTER_SECRET: 'secret',

    GOOGLE_ID: 'app-id',
    GOOGLE_SECRET: 'secret',

    // Control debug level for modules using visionmedia/debug
    DEBUG: 'http*,socket.io:socket'
};
