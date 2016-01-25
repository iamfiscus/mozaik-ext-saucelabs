import React, { Component, PropTypes } from 'react';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import _                               from 'lodash';
import moment                          from 'moment';
import Mozaik                          from 'mozaik/browser';


class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: null
        };
    }

    getApiRequest() {
        let { activity, frequency } = this.props;

        return {
            id:     `saucelabs.activity`,
            params: {
                activity: activity
            }
        };
    }

    onApiData(activity) {
        this.setState({
            activity: activity
        });
    }

    render() {
        console.log('Activity', this.state)
        // var jobNodes = _.map(this.state.jobs, (job, index) => {
        //     return (<JobItem job={job} key={index} />);
        // });

        return (
            <div>
                <div className="widget__header">
                    Sauce Labs: Activity
                    <span className="widget__header__count">
                        {this.state.activity.length}
                    </span>
                    <i className="fa fa-check-square-o" />
                </div>
                <div className="widget__body">
                    {this.state.activity}
                </div>
            </div>
        );
    }
}

reactMixin(Activity.prototype, ListenerMixin);
reactMixin(Activity.prototype, Mozaik.Mixin.ApiConsumer);

export { Activity as default };
