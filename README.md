# Mozaïk saucelabs extension

[![Travis CI](https://img.shields.io/travis/iamfiscus/mozaik-ext-saucelabs.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-saucelabs)
[![codecov coverage](https://img.shields.io/codecov/c/github/iamfiscus/mozaik-ext-saucelabs.svg?style=flat-square)](https://codecov.io/github/iamfiscus/mozaik-ext-saucelabs)
[![version](https://img.shields.io/npm/v/mozaik-ext-saucelabs.svg?style=flat-square)](http://npm.im/mozaik-ext-saucelabs)
[![downloads](https://img.shields.io/npm/dm/mozaik-ext-saucelabs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mozaik-ext-saucelabs&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/mozaik-ext-saucelabs.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## SauceLabs Client Configuration

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
    type: 'saucelabs.status',
    columns: 1, rows: 1,
    x: 0, y: 0
}
```

## SauceLabs jobs

![SauceLabs Jobs](https://raw.githubusercontent.com/iamfiscus/mozaik-ext-saucelabs/master/_doc-assets/saucelabs-jobs.png)

parma   | required | rules         | description
--------|----------|---------------|-----------------------------------
`limit` | optional | max_value=100 | *limit the number of jobs being return*

### usage

```javascript
{
    type: 'saucelabs.jobs',
    columns: 1, rows: 1,
    limit: 50,
    x: 0, y: 0
}
```
