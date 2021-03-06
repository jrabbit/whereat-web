import Location from '../../app/models/Location';
import UserLocation from '../../app/models/UserLocation';

import { Seq } from 'immutable';

const l = {};

//TODO make immutable sample locs...

l.s17 = {
  lat: 40.7092529,
  lon: -74.0112551,
  time: 1316232000000
  //1316232000000
  //1316232000001
};

l.s17UL = {
  id: "75782cd4-1a42-4af1-9130-05c63b2aa9ff",
  lat: 40.7092529,
  lon: -74.0112551,
  time: 1316232000000
};


l.s17_ = {
  lat: 40.7092528,
  lon: -74.0112550,
  time: 1316232000001
};

l.s17_UL = {
  id: "75782cd4-1a42-4af1-9130-05c63b2aa9ff",
  lat: 40.7092528,
  lon: -74.0112550,
  time: 1316232000000
};

l.s17Nav = {
  coords: {
    latitude: 40.7092529,
    longitude: -74.0112551
  },
  timestamp: 1316232000000
};

l.s17Location = Location(l.s17);

l.s17_Nav = {
  coords: {
    latitude: 40.7092528,
    longitude: -74.0112550
  },
  timestamp: 1316232000000
};

l.nyse2 = [{
  "lat": 40.704715,
  "lon": -74.013685,
  "time": 1316232000000
}, {
  "lat": 40.703084,
  "lon": -74.010126,
  "time": 1316232000000
}];


l.nyse2Seq = Seq.of(
  Location({
    "lat": 40.704715,
    "lon": -74.013685,
    "time": 1316232000000
  }),
  Location({
    "lat": 40.703084,
    "lon": -74.010126,
    "time": 1316232000000
  }));


l.nyse2UL = [{
  "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
  "lat": 40.704715,
  "lon": -74.013685,
  "time": 1316232000000
}, {
  "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
  "lat": 40.703084,
  "lon": -74.010126,
  "time": 1316232000000
}];

l.nyse3 = [{
  lat: 40.7092529,
  lon: -74.0112551,
  time: 1316232000000
}, {
  "lat": 40.704715,
  "lon": -74.013685,
  "time": 1316232000000
}, {
  "lat": 40.703084,
  "lon": -74.010126,
  "time": 1316232000000
}];


l.nyse3Seq = Seq.of(
  Location({
    lat: 40.7092529,
    lon: -74.0112551,
    time: 1316232000000
  }),
  Location({
    "lat": 40.704715,
    "lon": -74.013685,
    "time": 1316232000000
  }),
  Location({
    "lat": 40.703084,
    "lon": -74.010126,
    "time": 1316232000000
  }));

l.nyse3UL = [{
  id: "75782cd4-1a42-4af1-9130-05c63b2aa9ff",
  lat: 40.7092529,
  lon: -74.0112551,
  time: 1316232000000
},{
  "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
  "lat": 40.704715,
  "lon": -74.013685,
  "time": 1316232000000
}, {
  "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
  "lat": 40.703084,
  "lon": -74.010126,
  "time": 1316232000000
}];


l.nyse3ULSeq = Seq.of(
  UserLocation({
    id: "75782cd4-1a42-4af1-9130-05c63b2aa9ff",
    lat: 40.7092529,
    lon: -74.0112551,
    time: 1316232000000
  }),
  UserLocation({
    "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
    "lat": 40.704715,
    "lon": -74.013685,
    "time": 1316232000000
  }),
  UserLocation({
    "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
    "lat": 40.703084,
    "lon": -74.010126,
    "time": 1316232000000
  }));

l.initRequest = {
  id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
  lat: 40.703084,
  lon: -74.010126,
  time: 1316232000000
};

l.initResponse = [{
  "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
  "lat": 40.704715,
  "lon": -74.013685,
  "time": 1316232000000
}, {
  "id": "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
  "lat": 40.703084,
  "lon": -74.010126,
  "time": 1316232000000
}];


l.refreshRequests = [
  [
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        lat: 40.705007,
        lon: -74.012537,
        time: 1316232000000
      }
    },
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        lat: 40.704092,
        lon: -74.008989,
        time: 1316232000000
      }
    }
  ],
  [
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        lat: 40.705731,
        lon: -74.011443,
        time: 1316232000000
      }
    },
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        lat: 40.705264,
        lon: -74.010029,
        time: 1316232000000
      }
    }
  ],
  [
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fa",
        lat: 40.706886,
        lon: -74.010853,
        time: 1316232000000
      }
    },
    {
      lastPing: 0,
      location: {
        id: "75782cd4-1a42-4af1-9130-05c63b2aa9fb",
        lat: 40.706638,
        lon: -74.011006,
        time: 1316232000000
      }
    }
  ]
];



module.exports = l;
