import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';

var Status;
var status;

describe('SauceLabs — Status', () => {

  let sandbox;

  before(() => {
    mockery.enable({ useCleanCache: true });
    mockery.warnOnUnregistered(false);
    mockery.registerMock('mozaik/browser', {
      Mixin: { ApiConsumer: {} }
    });

    Status = require('./../components/Status.jsx');
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    status  = TestUtils.renderIntoDocument(<Status />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
  });


  it('should return correct api request', function () {
    expect(status.getApiRequest()).to.eql({
      id: 'saucelabs.status',
      params: {
        status: undefined
      }
    });
  });

  describe('having no status', () => {
    it('should show an empty widget body', function() {
      let widgetBody = TestUtils.findRenderedDOMComponentWithClass(status, 'widget__body');
      expect(widgetBody.innerHTML).to.not.exist;
    });
  });

  describe('having a "good" status message', () => {
    beforeEach(function() {
      status.setState({
        status: {
          'wait_time'      :0.3333333333333333,
          'service_operational':true,
          'status_message'   :'Basic service status checks passed.'
        }
      });
    });

    it('should display status icon', () => {

      let icon = TestUtils.findRenderedDOMComponentWithClass(status, 'saucelabs__status__current');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-thumbs-up');
    });

    it('should display a wait time over 0', () => {
      let timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'saucelabs__status__current__wait-time');
      expect(timestamp.getDOMNode().textContent.replace('Wait Time: ','')).to.be.above(0);
    });
  });

  describe('having a "bad" status message', () => {
    beforeEach(() => {
      status.setState({
        status: {
          'wait_time'      :null,
          'service_operational':false,
          'status_message'   :'Basic service status checks failed.'
        }
      });
    });

    it('should display status icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(status, 'saucelabs__status__current');
      expect(icon.getDOMNode().innerHTML).to.contain('class="fa fa-thumbs-down');
    });

    it('should display a NULL for wait time', () => {
      let timestamp = TestUtils.findRenderedDOMComponentWithClass(status, 'saucelabs__status__current__wait-time');
      expect(timestamp.getDOMNode().textContent).to.equal('Wait Time: ');
    });
  });
});
