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
        let { owner, activity } = this.props;

        return {
            id:     `saucelabs.activity`
            // params: {
            //     owner:      owner,
            //     activity: activity
            // }
        };
    }

    onApiData(activity) {
        this.setState({
            activity: activity
        });
    }

    render() {

        return (
            <div className="saucelabs">
                <div className="widget__header">
                    <span className="travis__activity__slug">
                        <span className="widget__header__subject">Header</span>
                    </span>
                    <span className="widget__header__count">
                      0
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    Test
                </div>
            </div>
        );
    }
}



reactMixin(Repository.prototype, ListenerMixin);
reactMixin(Repository.prototype, Mozaik.Mixin.ApiConsumer);

export { Repository as default };
