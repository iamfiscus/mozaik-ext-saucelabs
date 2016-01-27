# Mozaïk saucelabs extension

[![Travis CI](https://img.shields.io/travis/plouc/mozaik-ext-saucelabs.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-saucelabs)

## Jenkins Client Configuration

In order to use the Mozaïk SauceLabs widgets, you must configure its **client**.

To install mozaik-ext-saucelabs from npm, run:

```bash
npm install --save mozaik-ext-saucelabs
```
### parameters

key          | env key                           | required | description
-------------|-----------------------------------|----------|-----------------------------------
`auth.user`  | SAUCELABS_API_BASIC_AUTH_USER     | yes      | *saucelabs auth user*
`auth.token` | SAUCELABS_API_BASIC_AUTH_PASSWORD | yes      | *saucelabs auth password*

### usage

```javascript
{
  //…
  api: {
    saucelabs: {
      auth: {
        user : 'user',
        token: 'token'
      }
    }
  }
}
```

## SauceLabs status

> Shows the current SauceLabs status from [http://status.saucelabs.com/](http://status.saucelabs.com/)

![SauceLabs Status](https://raw.githubusercontent.com/iamfiscus/mozaik-ext-saucelabs/master/_doc-assets/saucelabs-status.png)

### usage

```javascript
{
    type: 'github.status',
    columns: 1, rows: 1,
    x: 0, y: 0
}
```
