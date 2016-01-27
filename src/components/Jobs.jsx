import React, { Component, PropTypes } from 'react';
import { ListenerMixin }   from 'reflux';
import reactMixin          from 'react-mixin';
import _                   from 'lodash';
import moment              from 'moment';
import Mozaik              from 'mozaik/browser';
import JobItem             from './JobItem.jsx';


class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: null
    };
  }

  getApiRequest() {
    let { jobs, limit } = this.props;

    return {
      id: `saucelabs.jobs`,
      params: {
        jobs: jobs,
        limit: limit
      }
    };
  }

  onApiData(jobs) {
    this.setState({
      jobs: jobs
    });
  }

  render() {
    // console.log(this.state);
    let count = (this.state.jobs) ? this.state.jobs.length : 0;
    count = (<span className="widget__header__count">{count}</span>)

    let jobNodes = _.map(this.state.jobs, (job, index) => {
      return (<JobItem job={job} key={index} />);
    });

    return (
      <div>
        <div className="widget__header">
          Sauce Labs: Jobs
          {count}
          <i className="fa fa-check-square-o" />
        </div>
        <div className="widget__body">
          {jobNodes}
        </div>
      </div>
    );
  }
}

reactMixin(Jobs.prototype, ListenerMixin);
reactMixin(Jobs.prototype, Mozaik.Mixin.ApiConsumer);

export { Jobs as default };
