var convict = require('convict');

var config = convict({
    saucelabs: {
        basicAuthUser: {
            doc:     'The saucelabs API basic http auth user.',
            default: null,
            format:  String,
            env:    'SAUCELABS_API_BASIC_AUTH_USER'
        },
        basicAuthPassword: {
            doc:     'The saucelabs API basic http auth password.',
            default: null,
            format:  String,
            env:    'SAUCELABS_API_BASIC_AUTH_PASSWORD'
        }
        // Add Proxy
    }
});

module.exports = config;
