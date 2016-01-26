import React, { Component, PropTypes } from 'react';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import _                               from 'lodash';
import moment                          from 'moment';
import Mozaik                          from 'mozaik/browser';


class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
        };
    }

    getApiRequest() {
        let { status } = this.props;

        return {
            id: `saucelabs.status`,
            params: {
                status: status
            }
        };
    }

    onApiData(status) {
        this.setState({
            status: status
        });
    }

    render() {
        // console.log('Status', this.state);
        var widgetBodyNode = (<div className="widget__body" />);

        if (this.state.status) {
            var messageNode = messageNode = (<i className="fa fa-thumbs-down saucelabs__status__current__icon saucelabs__status__current__icon--not-ok"></i>);;

            if (this.state.status.service_operational === true) {
                messageNode = (<i className="fa fa-thumbs-up saucelabs__status__current__icon saucelabs__status__current__icon--ok"></i>);
            }

            widgetBodyNode = (
                <div className="widget__body">
                    <div className="saucelabs__status__current">
                        { messageNode }
                    </div>
                    <p className="saucelabs__status__current__wait-time">Wait Time: { this.state.status.wait_time }</p>
                </div>
            );
        }
        return (
            <div>
                <div className="widget__header">
                    Sauce Labs: Status
                    <i className="fa fa-check-square-o" />
                </div>
                {widgetBodyNode}
            </div>
        );
    }
}

reactMixin(Status.prototype, ListenerMixin);
reactMixin(Status.prototype, Mozaik.Mixin.ApiConsumer);

export { Status as default };
