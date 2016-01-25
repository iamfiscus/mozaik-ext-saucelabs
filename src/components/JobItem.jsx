var React  = require('react');
var moment = require('moment');

var JobItem = React.createClass({

    render() {
        var classes = '',
            browser = 'fa fa-'+this.props.job.browser.toLowerCase().replace('google',''),
            os = 'fa fa-'+this.props.job.os.toLowerCase();


        return (
            <div className={classes}>
                {this.props.job.name} |&nbsp;
                {this.props.job.start_time} - {this.props.job.end_time} |&nbsp;
                <i className={os} />&nbsp;
                <i className={browser} />&nbsp;
                {this.props.job.browser_version}<br />
            </div>
        )
    }
});

module.exports = JobItem;
