import React, { Component, PropTypes } from 'react';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import _                               from 'lodash';
import moment                          from 'moment';
import Mozaik                          from 'mozaik/browser';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    getApiRequest() {
        let { user } = this.props;

        return {
            id: `saucelabs.user`,
            params: {
                user: user
            }
        };
    }

    onApiData(user) {
        this.setState({
            user: user
        });
    }

    render() {
        console.log('User', this.state);
        // var jobNodes = _.map(this.state.jobs, (job, index) => {
        //     return (<JobItem job={job} key={index} />);
        // });
        return (
            <div>
                <div className="widget__header">
                    Suace Labs: Activity
                    <i className="fa fa-check-square-o" />
                </div>
                <div className="widget__body">
                    {this.state.user}
                </div>
            </div>
        );
    }
}

reactMixin(User.prototype, ListenerMixin);
reactMixin(User.prototype, Mozaik.Mixin.ApiConsumer);

export { User as default };
