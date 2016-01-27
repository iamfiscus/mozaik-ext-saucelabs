var React  = require('react');
var moment = require('moment');

var JobItem = React.createClass({

  render() {
    var classes,
      start,
      end,
      title   = this.props.job.id,
      browser = this.props.job.browser.toLowerCase(),
      os      = this.props.job.os.toLowerCase(),
      status  = <i title={this.props.job.status} className="fa fa-question-circle" />;

    // Title
    if (this.props.job.name) {
      title = this.props.job.name;
    }

    // Times
    if (this.props.job.start_time) {
      start = (<div className="saucelabs__jobs__item__start-time">Start Time: <time>{moment.unix(this.props.job.start_time).format('YYYY-MM-DD hh:mm:ss A')}</time></div>);
    }
    if (this.props.job.end_time) {
      end = (<div className="saucelabs__jobs__item__end-time">End Time: <time>{moment.unix(this.props.job.end_time).format('YYYY-MM-DD hh:mm:ss A')}</time></div>);
    }

    // Browser
    if(browser.indexOf('opera') >= 0) {
      browser = 'opera';
    } else if(browser.indexOf('safari') >= 0) {
      browser = 'safari';
    } else if(browser.indexOf('google') >= 0) {
      browser = 'chrome';
    } else if(browser.indexOf('explorer') >= 0) {
      browser = 'internet-explorer';
    } else if(browser.indexOf('edge') >= 0) {
      browser = 'edge';
    } else {
      browser = 'globe';
    }
    browser = `fa fa-${browser}`;

    // OS
    if(os.indexOf('windows') >= 0) {
      os = 'windows';
    } else if(os.indexOf('apple') >= 0 || os.indexOf('macintosh') >= 0) {
      os = 'apple';
    } else if(os.indexOf('linux') >= 0) {
      os = 'linux';
    } else {
      os = 'desktop';
    }
    os = `fa fa-${os}`;

    // Status
    if (this.props.job.pass) {
        status = <i title={this.props.job.pass} className="fa fa-check-circle" />;
    } else if (this.props.job.error) {
        status = <i title={this.props.job.error} className="fa fa-exclamation-circle" />;
    }

    return (
      <div className="list__item saucelabs__jobs__item">
        <div className="saucelabs__jobs__item__title" title={this.props.job.id}>
          {status}
          <span title={this.props.job.id}>{title}</span>
        </div>
        {start}
        {end}
        <p className="saucelabs__jobs__item__instance">
          <i className={os} title={this.props.job.os} />&nbsp;&nbsp;
          <i className={browser} title={this.props.job.browser} />&nbsp;&nbsp;
          {this.props.job.browser_version}
        </p>
        <div>
          <div className="saucelabs__jobs__item--left">
            <a href={this.props.job.video_url} title={this.props.job.video_url} target="_target">Video</a>
          </div>
          <div className="saucelabs__jobs__item--right">
            <a href={this.props.job.log_url} title={this.props.job.log_url} target="_target">Log</a>
          </div>
        </div>
        <br className="saucelabs__jobs__item--clear" />
      </div>
    )
  }
});

module.exports = JobItem;
