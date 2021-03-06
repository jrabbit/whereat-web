import Marty from 'marty';
import { Map } from 'immutable';
import GoButtonConstants from '../constants/GoButtonConstants';
import { RED, GREEN } from '../constants/Colors';

class GoButtonStore extends Marty.Store {

  constructor(options){
    super(options);
    this.state = Map({
      color: RED
    });

    this.handlers = {
      on: GoButtonConstants.GO_BUTTON_ON,
      off: GoButtonConstants.GO_BUTTON_OFF
    };
  }

  //handlers

  on(){
    this.replaceState(Map({color: GREEN }));
  }

  off(){
    this.replaceState(Map({color: RED }));
  }

  //accessors

  getColor(){
    return this.state.get('color');
  }
}

export default GoButtonStore;
