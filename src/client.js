import config    from './config';
import Promise   from 'bluebird';
import chalk     from 'chalk';
import SauceLabs from 'saucelabs';
import _         from 'lodash';

var sauceLabsConfig = {
  username: config.get('saucelabs.auth.user'),
  password: config.get('saucelabs.auth.token')
};

var saucelabs = new SauceLabs(sauceLabsConfig);


/**
 * @param {Mozaik} mozaik
 */
const client = function (context) {

    return {
    activity(params) {
      var def = Promise.defer();
      saucelabs.getUserActivity(function (err, res) {
          if (err) { def.reject(err); }
          // mozaik.logger.info(chalk.yellow(`[saucelabs] calling user activity`));
          console.log(res);
          def.resolve(res);
      });

      return def.promise;
    },
    user(params) {
      var def = Promise.defer();

      saucelabs.getAccountDetails(function (err, res) {
        if (err) { def.reject(err); }
        // mozaik.logger.info(chalk.yel low(`[saucelabs] calling account details`));
        console.log(res);
        def.resolve(res);
      });

      return def.promise;
    },
    usage(params) {
      var def = Promise.defer();

      saucelabs.getAccountUsage(function (err, res) {
        if (err) { def.reject(err); }
        // mozaik.logger.info(chalk.yel low(`[saucelabs] calling account details`));
        console.log(res);
        def.resolve(res);
      });

      return def.promise;
    },
    status() {
      var def = Promise.defer();

      saucelabs.getServiceStatus(function (err, res) {
        if (err) { def.reject(err); }
        // mozaik.logger.info(chalk.yel low(`[saucelabs] calling account details`));
        console.log(res);
        def.resolve(res);
      });

      return def.promise;
    },
    jobs(params) {
      var def = Promise.defer();

      saucelabs.getJobs(function (err, res) {
        if (err) { def.reject(err); }
        // mozaik.logger.info(chalk.yel low(`[saucelabs] calling account details`));

        def.resolve(res);
      });

      return def.promise;
    }
  };

};

export { client as default };
