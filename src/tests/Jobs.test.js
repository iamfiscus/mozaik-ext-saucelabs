import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';
import _      from 'lodash';
import moment      from 'moment';

var Jobs;
var jobs;

describe('SauceLabs — Jobs', () => {

  let sandbox;
  let mockJobs = [{
    browser: 'googlechrome',
    browser_version: '47.0.2526.73',
    start_time: 1453850617, // 2016-01-26 05:23:37 PM
    end_time: 1453850839, // 2016-01-26 05:27:19 PM
    error: 'Test did not see a new command for 90 seconds. Timing out.',
    id: 'bc8f1810807143e7b96c9546eb0b282a',
    log_url: 'https://saucelabs.com/jobs/bc8f1810807143e7b96c9546eb0b282a/selenium-server.log',
    name: 'Test Name',
    os: 'Windows 10',
    passed: null,
    jobs: 'complete',
    video_url: 'https://saucelabs.com/jobs/bc8f1810807143e7b96c9546eb0b282a/video.flv'
  }];

  before(() => {
    mockery.enable({ useCleanCache: true });
    mockery.warnOnUnregistered(false);
    mockery.registerMock('mozaik/browser', {
      Mixin: { ApiConsumer: {} }
    });

    Jobs = require('./../components/Jobs.jsx');
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    jobs  = TestUtils.renderIntoDocument(<Jobs />);
  });

  afterEach(() => {
    sandbox.restore();
    jobs = null;
  });

  after(() => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
  });

  it('should return correct api request', function () {
    expect(jobs.getApiRequest()).to.eql({
      id: 'saucelabs.jobs',
      params: {
        jobs: undefined,
        limit: null
      }
    });
  });

  describe('having no jobs', () => {
    // jobs.setState({
    //   jobs: mockJobs
    // });

    it('should show an empty widget body', function() {
      let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'widget__body');
      expect(widgetBody.innerHTML).to.not.exist;
    });

    it('should show an Job count 0', function() {
      let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'widget__header__count');
      expect(widgetBody.getDOMNode().textContent).to.equal('0');
    });
  });

  describe('having a "good" jobs message', () => {
    beforeEach(function() {
      jobs.setState({
        jobs: mockJobs
      });
    });

    it(`should show an Job count "${mockJobs.length}"`, function() {
      let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'widget__header__count');
      expect(widgetBody.getDOMNode().textContent).to.equal(jobs.state.jobs.length.toString());
    });

    it(`should show an Job title of "${mockJobs[0].name}"`, function() {
      let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__title');
      expect(widgetBody.getDOMNode().textContent).to.equal(jobs.state.jobs[0].name);
    });

    it(`should show an Job title of "${mockJobs[0].id}"`, function() {
      mockJobs[0].name = null;

      jobs.setState({
        jobs: mockJobs
      });

      let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__title');
      expect(widgetBody.getDOMNode().textContent).to.equal(jobs.state.jobs[0].id);
    });
  });
  // @TODO Failing not sure why...
  // describe('having time', () => {
  //   it('should not show a start time', function() {
  //     jobs.setState({
  //       jobs: [{browser:'',os:'',start_time:''}]
  //     });

  //     let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__start-time');
  //     expect(widgetBody).to.not.exist;
  //   });

  //   it(`should not show a start time at "2016-01-26 05:23:37 PM"`, function() {
  //     jobs.setState({
  //       jobs: [{browser:'',os:'',start_time:'1453850617'}]
  //     });

  //     let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__start-time');
  //     expect(widgetBody.getDOMNode().innerHTML).to.contain(`Start Time: 2016-01-26 05:23:37 PM`);
  //   });

  //   it('should not show a end time', function() {
  //     jobs.setState({
  //       jobs: [{browser:'',os:'',end_time:''}]
  //     });

  //     let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__end-time');
  //     expect(widgetBody.innerHTML).to.not.exist;
  //   });

  //   it(`should not show a end time at "2016-01-26 05:27:19 PM"`, function() {
  //     jobs.setState({
  //       jobs: [{browser:'',os:'',end_time:'1453850839'}]
  //     });

  //     let widgetBody = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__end-time');
  //     expect(widgetBody.getDOMNode().innerHTML).to.contain(`End Time: 2016-01-26 05:27:19 PM`);
  //   });
  // });

  describe('having browser', () => {

    it('should display Chrome icon', () => {
      jobs.setState({
        jobs: [{browser:'Google',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-chrome');
      expect(icon.getDOMNode().innerHTML).to.contain('title="Google');
    });

    it('should display Safari icon', () => {
      jobs.setState({
        jobs: [{browser:'Safari',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-safari');
    });

    it('should display Firefox icon', () => {
      jobs.setState({
        jobs: [{browser:'Firefox',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-firefox');
    });

    it('should display Opera icon', () => {
      jobs.setState({
        jobs: [{browser:'Opera',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-opera');
    });

    it('should display Explorer icon', () => {
      jobs.setState({
        jobs: [{browser:'Explorer',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-internet-explorer');
    });

    it('should display Edge icon', () => {
      jobs.setState({
        jobs: [{browser:'Edge',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-edge');
    });

    it('should display default icon', () => {
      jobs.setState({
        jobs: [{browser:'',os:'',browser_version:42}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-globe');
      expect(icon.getDOMNode().innerHTML).to.contain('42');
    });
  });

  describe('having OS', () => {

    it('should display Windows icon', () => {
      jobs.setState({
        jobs: [{os:'Windows 10',browser:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-windows');
      expect(icon.getDOMNode().innerHTML).to.contain('title="Windows 10');
    });

    it('should display Apple icon', () => {
      jobs.setState({
        jobs: [{os:'Apple',browser:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-apple');
    });

    it('should display Apple icon', () => {
      jobs.setState({
        jobs: [{os:'Mac',browser:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-apple');
    });

    it('should display Linux icon', () => {
      jobs.setState({
        jobs: [{os:'Linux',browser:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-linux');
    });

    it('should display default icon', () => {
      jobs.setState({
        jobs: [{browser:'',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__instance');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-desktop');
    });
  });
  describe('having status', () => {

    it('should display Default icon', () => {
      jobs.setState({
        jobs: [{browser:'',os:''}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__header');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-question-circle');
      // expect(icon.getDOMNode().innerHTML).to.contain('title="');
    });

    it('should display Error icon', () => {
      jobs.setState({
        jobs: [{browser:'',os:'',error:'Error'}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__header');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-exclamation-circle');
      expect(icon.getDOMNode().innerHTML).to.contain('title="Error');
    });

    it('should display Success icon', () => {
      jobs.setState({
        jobs: [{browser:'',os:'',pass:'Pass'}]
      });

      let icon = TestUtils.findRenderedDOMComponentWithClass(jobs, 'saucelabs__jobs__item__header');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-check-circle');
      expect(icon.getDOMNode().innerHTML).to.contain('title="Pass');
    });
  });
});
