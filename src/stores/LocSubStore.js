const Marty = require('marty');

const LocSubConstants = require('../constants/LocSubConstants');
const LocPubConstants = require('../constants/LocPubConstants');
const UserLocation = require('../models/UserLocation');
const Location = require('../models/Location');
const { convertPosition } = require('../models/LocationCompanion');

const { Map, List } = require('immutable');
const geo = require('../modules/geo');

class LocSubStore extends Marty.Store {

  constructor(options){
    super(options);
    this.state = Map({locs: Map()});
    this.state.set('center', this.getCenter());

    this.handlers = {
      save: LocSubConstants.LOCATION_RECEIVED,
      saveMany: LocSubConstants.LOCATIONS_RECEIVED
    };
  }

  //HANDLERS

  //(UserLocation) -> Unit
  save(loc){
    const l = UserLocation(loc);
    this.replaceState(this.state.setIn(['locs', l.id], l));
  }

  // (Seq[UserLocation]) -> Unit
  saveMany(locs){
    this.replaceState(
      locs.reduce(
        (acc, loc) => acc.setIn(['locs', loc.id], loc),
        this.state,
        this));
  }

  //ACCESSORS

  // () -> UserLocation
  getCenter(){
    return this.fetch({
      id: 'getCenter',
      locally(){
        return this.state.get('center');
      },
      remotely(){
        return geo.get()
          .then(pos => {
            const loc = convertPosition(pos);
            this.replaceState(this.state.set('center', loc));
            Promise.resolve(loc);
          });
      }
    });
  }

  // () -> UserLocation
  getLocs(){
    return this.state.get('locs').valueSeq();
  }

}

module.exports = LocSubStore;