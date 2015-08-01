const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const should = chai.should();
const {wait} = require('../../src/modules/async');


const React = require('react');
const Application = require('../../src/application');
const { RED, GREEN } = require('../../src/constants/Colors');
const { GO_RADIUS, GO_DIAMETER } = require('../../src/constants/Dimensions');
const { createStore, createApplication } = require('marty/test-utils');
const testTree = require('react-test-tree');

const GoButton = require('../../src/components/GoButton');

describe('GoButton Component', () => {

  const setup = (color) => {

    const spies = {
      ping: sinon.spy(),
      togglePoll: sinon.spy()
    };

    const app = createApplication(Application, {
      stub: {
        goButtonStore: createStore({
          getColor: sinon.stub().returns(color)
        }),
        shareActions: {
          ping: spies.ping,
          togglePoll: spies.togglePoll
        }
      }
    });

    return [app, spies];
  };

  const press = (node) => (
    Promise.resolve()
      .then(() => node.simulate.touchStart)
      .then(() => wait(1))
      .then(() => node.simulate.touchEnd)
  );

  describe('Inner Component', () => {

    it('contains a tappable svg circle with correct dimensions and color', () => {
      const app = setup()[0];
      const gb = testTree(<GoButton.InnerComponent color={RED} />);

      gb.tappable.getClassName().should.equal('Tappable-inactive');
      gb.svg.getAttribute('width').should.equal(GO_DIAMETER);
      gb.svg.getAttribute('height').should.equal(GO_DIAMETER);
      gb.circle.getAttribute('cx').should.equal(GO_RADIUS);
      gb.circle.getAttribute('cy').should.equal(GO_RADIUS);
      gb.circle.getAttribute('r').should.equal(GO_RADIUS);
      gb.circle.getAttribute('fill').should.equal(RED);
    });
  });

  describe('clicking go button', () => {

    it('calls shareActions#ping', () => {
      const [app, {ping}] = setup(RED);
      const gb = testTree(<GoButton/>, { context: { app: app }});
      gb.click();

      ping.should.have.been.calledOnce;
    });
  });

  xdescribe('pressing go button', () => {

    it('calls shareActions#poll', (done) => {
      const [app, {togglePoll}] = setup(RED);
      const gb = testTree(<GoButton />, {context: {app: app}});

      press(gb).should.be.fulfilled
        .then(() => togglePoll.should.have.been.calledOnce)
        .should.notify(done);

      // TODO: how to simulate a long press?
    });
  });

  xdescribe('listening to store', () => {

    it('changes color when GoButtonStore state changes', () => {
      const app = setup(RED)[0];
      const gb = testTree(<GoButton />, { context: { app: app }});

      gb.getProp('color').should.eql(RED);

      // TODO: why does `gb` have no color prop provided by store?
      // This contradicts example provided here:
      // https://github.com/martyjs/marty-test-examples/blob/master/app/components/foo.js
      // Only way to get `gb.getProp('color')` to return anything is
      // to provide `color={RED}` as a prop in line 94.
      // But that defeats the purpose of placing the store listener under test!
    });
  });
});