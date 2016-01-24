import config    from './config';
import Promise   from 'bluebird';
// import chalk     from 'chalk';
import SauceLabs from 'saucelabs';

var sauceLabsConfig = {
  username: config.get('saucelabs.basicAuthUser'),
  password: config.get('saucelabs.basicAuthPassword')
};

var saucelabs = new SauceLabs(sauceLabsConfig);


/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    return {
        activity() {
            var def = Promise.defer();

            saucelabs.getAccountDetails(function (err, res) {
                if (err) { def.reject(err); }

                def.resolve(res.repo);
            });

            return def.promise;
        // },
        // jobs() {
        //     return buildRequest('/api/json?tree=jobs[name,lastBuild[number,building,timestamp,result]]&pretty=true')
        //         .then(res => res.body.jobs);
        }
    };
};


export { client as default };
