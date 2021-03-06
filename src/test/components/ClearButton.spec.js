import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
const should = chai.should();


import Application from '../../app/application';

import { createApplication } from 'marty/test-utils';
import testTree from 'react-test-tree';
import { shouldHaveBeenCalledWithImmutable } from '../support/matchers';

import User from '../../app/models/User';
import ClearButton from '../../app/components/ClearButton';

describe('ClearButton Component', () => {

  const setup = () => {

    const spies = { remove: sinon.spy() };
    const app = createApplication(Application, {
      stub: { locSubActions: spies }
    });
    return [app, spies];
  };

  const propTree = (app, color) => testTree(<ClearButton.InnerComponent />, settings(app));
  const tree = (app) => testTree(<ClearButton />, settings(app));
  const settings = (app) => ({context: { app: app }});

  describe('contents', () => {

    describe('button', () => {

      it('is rendered with correct styling', () => {
        const [app] = setup();
        const cb = propTree(app);

        cb.button.getClassName().should.equal('clearButton btn btn-default');
        cb.glyphicon.getClassName().should.equal('glyphicon glyphicon-remove');
      });
    });
  });

  describe('events', () =>{


    describe('clicking clear button', () => {

      it('calls locPubActions#remove', () => {
        const [app, {remove}] = setup();
        const cb = tree(app);
        cb.innerComponent.click();

        shouldHaveBeenCalledWithImmutable(remove, User());
      });
    });

  });
});
