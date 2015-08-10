const Marty = require('marty');
const BaseComponent = require('./BaseComponent.jsx');
const Tappable = require('react-tappable');
const { wait } = require('../modules/async');
const { RED, GREEN } = require('../constants/Colors');
const { GO_RADIUS, GO_DIAMETER } = require('../constants/Dimensions');


class GoButton extends BaseComponent {

  constructor(){
    super();
    this.bindAll('_handlePress', '_handleClick');
    this.events = { onClick: this._handleClick, onPress: this._handlePress };
  }

  render(){
    return (
      <Tappable ref="tappable" {...this.events} >
        <svg ref="svg" className="goButton" width={GO_DIAMETER} height={GO_DIAMETER}>
          <circle ref="circle" cx={GO_RADIUS} cy={GO_RADIUS} r={GO_RADIUS} fill={this.props.color} />
        </svg>
      </Tappable>
    );
  };

  _handleClick(){
    if (!this.props.polling) {
      this.app.userLocationActions.ping();
    }
  }

  _handlePress(){
    this.props.polling ?
      this.app.userLocationActions.stopPolling(this.props.pollId) :
      this.app.userLocationActions.poll();
  }

}

module.exports = Marty.createContainer(GoButton, {
  listenTo: ['goButtonStore', 'userLocationStore'],
  fetch: {
    color() {
      return this.app.goButtonStore.getColor();
    },
    polling(){
      return this.app.userLocationStore.isPolling();
    },
    pollId(){
      return this.app.userLocationStore.getPollId();
    }
  }
});
