var React  = require('react');
var moment = require('moment');

var JobItem = React.createClass({

    render() {
        var classes = '',
            browser = 'fa fa-'+this.props.job.browser.toLowerCase().replace('google',''),
            os      = 'fa fa-'+this.props.job.os.toLowerCase(),
            start   = moment.unix(this.props.job.start_time).format('YYYY-MM-DD hh:mm:ss A'),
            end     = moment.unix(this.props.job.end_time).format('YYYY-MM-DD hh:mm:ss A');


        return (
          <div className="saucelabs__jobs__item">
            <h2 className className="saucelabs__jobs__item--clear">{this.props.job.name}</h2>
            {start} - {end}
            <p>
              <i className={os} />&nbsp;
              <i className={browser} />&nbsp;
              {this.props.job.browser_version}
            </p>
            <span className="saucelabs__jobs__item--left">
              <a href={this.props.job.video_url} target="_target">Video</a>
            </span>
            <span className="saucelabs__jobs__item--right">
              <a href={this.props.job.log_url} target="_target">Log</a>
            </span>
          </div>
        )
    }
});

module.exports = JobItem;
