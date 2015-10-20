const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const should = chai.should();

const Application = require('../../app/application');
const { createStore, createApplication } = require('marty/test-utils');
const testTree = require('react-test-tree');
import { Map } from 'immutable';
import { merge } from 'lodash';

import {
  shouldHaveBeenCalledWith
} from '../support/matchers';
import {
  emptyState,
  ping1State,
  ping2State,
  pollState
} from '../support/sampleLocPubStates';
import { s1, s2 } from '../support/sampleSettings';


import SettingsPage from '../../app/components/SettingsPage';
import { shareFreq } from '../../app/constants/Settings';


describe('SettingsPage component', () => {

  const setup = (stgState = s1, locPubState = emptyState) => {

    const stgSpies = {
      setShareFreq: sinon.spy(),
      setTtl: sinon.spy()
    };

    const locPubSpies = {
      resetPolling: sinon.spy()
    };
    const spies = merge({}, stgSpies, locPubSpies);

    const app = createApplication(Application, {
      include: ['settingsStore', 'locPubStore'],
      stub: {
        settingsActions: stgSpies,
        locPubActions: locPubSpies
      }
    });
    app.settingsStore.state = stgState;
    app.locPubStore.state = locPubState;

    const component = propTree(
      app,
      stgState.get('shareFreq'),
      locPubState.get('isPolling'),
      locPubState.get('pollId')
    );

    return [app, component, spies];
  };

  const propTree = (app, shareFreq, isPolling, pollId) =>
    testTree(<SettingsPage.InnerComponent
               curShareFreq={shareFreq}
               isPolling={isPolling}
               pollId={pollId}
             />, specs(app));

  const tree = (app) => testTree(<SettingsPage />, specs(app));
  const specs = (app) => ({context: { app: app }});

  describe('contents', () => {

    describe('on first load', () => {

      it('displays correctly', () => {
        const [app, comp] = setup(s2);

        comp.settingsPage.should.exist;
        comp.settingsPage.getClassName().should.equal('settingsPage');

        comp.shareFreqContainer.should.exist;
        comp.shareFreqContainer.getClassName().should.equal('shareFreqContainer');
        comp.shareFreqContainer.innerText.should.contain('Share location every:');

        comp.shareFreqMenu.should.exist;
        comp.shareFreqMenu.getClassName().should.equal('shareFreqMenu btn-group');
        comp.shareFreqMenu.getProp('title').should.equal(shareFreq.labels[2]);
        [0,1,2,3,4].map(i => {
          const item = comp[`shareFreqItems${i}`];
          item.should.exist;
          i === 2 ?
            item.getClassName().should.equal('shareFreqItem active') :
            item.getClassName().should.equal('shareFreqItem');
        });
      });
    });
  });

  describe('reactivity', () => {

    describe('curShareFreq prop', () =>{

      it('reacts to SettingsStore#getShareFreq', () => {
        const [app, comp] = setup(s1);
        comp.getProp('curShareFreq').should.equal(1);

        app.settingsStore.setShareFreq(2);
        const comp2 = tree(app);
        comp2.innerComponent.getProp('curShareFreq').should.equal(2);
      });
    });

    describe('isPolling prop', () => {

      it('reacts to LocPubStore#getIsPolling()', () =>{
        const [app] = setup(s1, emptyState);
        const comp = tree(app);
        comp.innerComponent.getProp('isPolling').should.be.false;

        app.locPubStore.pollingOn(1);
        const comp2 = tree(app);
        comp2.innerComponent.getProp('isPolling').should.be.true;
      });

      it('reacts to LocPubStore#getPollId', () => {
        const [app] = setup(s1, emptyState);
        const comp = tree(app);
        comp.innerComponent.getProp('pollId').should.equal(-1);

        app.locPubStore.pollingOn(1);
        const comp2 = tree(app);
        comp2.innerComponent.getProp('pollId').should.equal(1);
      });
    });
  });

  describe('interactivity', () => {

    describe('#_handleShareFreqSelect', () => {

      describe('when not polling', () => {

        it('calls settingsActions#setShareFreq but not reset polling', () => {
          const [app, _, {resetPolling, setShareFreq}] = setup(s1);
          const comp = tree(app).innerComponent;

          comp.shareFreqItems2.simulate.select();
          setShareFreq.should.have.been.calledWith(2);

          comp.shareFreqItems3.simulate.select();
          setShareFreq.should.have.been.calledWith(3);

          resetPolling.should.not.have.beenCalled;
        });
      });

      describe('when polling', () => {

        it('calls settingsActions#setShareFreq and resets polling', () => {
          const [app, _, {resetPolling, setShareFreq}] = setup(s1, pollState);
          const comp = tree(app).innerComponent;
          comp.getProp('isPolling').should.beTrue;

          comp.shareFreqItems2.simulate.select();
          setShareFreq.should.have.been.calledWith(2);
          resetPolling.should.have.been.calledWith(1, shareFreq.values[2]);

          comp.shareFreqItems3.simulate.select();
          setShareFreq.should.have.been.calledWith(3);
          resetPolling.should.have.been.calledWith(1, shareFreq.values[3]);
        });
      });
    });
  });
});
