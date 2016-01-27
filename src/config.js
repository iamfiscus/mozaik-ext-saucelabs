var convict = require('convict');

var config = convict({
  saucelabs: {
    auth: {
      user: {
        doc:     'The saucelabs API basic http auth user.',
        default: null,
        format:  String,
        env:    'SAUCELABS_API_BASIC_AUTH_USER'
      },
      token: {
        doc:     'The saucelabs API basic http auth password.',
        default: null,
        format:  String,
        env:    'SAUCELABS_API_BASIC_AUTH_PASSWORD'
      }
    }
  }
});

module.exports = config;
