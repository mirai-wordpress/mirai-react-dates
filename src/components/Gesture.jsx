import React from 'react';
import { withGesture } from 'react-with-gesture';

const SWIPE_MIN_DISTANCE = 120;
const SWIPE_MAX_OFF_PATH = 250;
const SWIPE_THRESHOLD_VELOCITY = 0.3;

class Gesture extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startTime: null,
        gestureRecognized : false
      }
    }
    
    shouldComponentUpdate(nextProps, nextState) {
      const {xDelta, yDelta, event, passive} = nextProps;
      if (nextState.startTime) {
          let diff = new Date().getTime() - nextState.startTime.getTime();
          if (!this.state.gestureRecognized && diff > 150) {
              let xVelocity = xDelta / diff;
              let yVelocity = yDelta / diff;
              let isSwipe = this.isSwipe(xDelta, yDelta, xVelocity, yVelocity);
              if (isSwipe) {
                  this.setState({gestureRecognized : true});
              }
          }
      }
      if (this.props.down != nextProps.down) {
          if (nextProps.down) {
              this.setState({gestureRecognized : false, startTime: new Date()});
          } else {
              this.setState({gestureRecognized : false, startTime: null});
          }
      }
      return true;
    }
    
    isSwipe(xDelta, yDelta, xVelocity, yVelocity) {
      if (Math.abs(yDelta) > SWIPE_MAX_OFF_PATH) { return false; }

      let enoughSpeedX = Math.abs(xVelocity) > SWIPE_THRESHOLD_VELOCITY;
      let enoughSpeedY = Math.abs(yVelocity) > SWIPE_THRESHOLD_VELOCITY;
      if(xDelta > SWIPE_MIN_DISTANCE && enoughSpeedX) {
          // right to left swipe
          if (this.props.onSwipeLeft) {
              this.props.onSwipeLeft();
          }
          if (this.props.onSwipe) {
              this.props.onSwipe({direction: "LEFT"});
          }
          return true;
      } else if (xDelta < -SWIPE_MIN_DISTANCE && enoughSpeedY) {
          // left to right swipe
          if (this.props.onSwipeRight) {
              this.props.onSwipeRight();
          }
          if (this.props.onSwipe) {
              this.props.onSwipe({direction: "RIGHT"});
          }
          return true;
      }
      
      if (yDelta > SWIPE_MIN_DISTANCE && enoughSpeedY) {
          if (this.props.onSwipeTop) {
              this.props.onSwipeTop();
          }
          if (this.props.onSwipe) {
              this.props.onSwipe({direction: "TOP"});
          }
          return true;
      } else if (yDelta < -SWIPE_MIN_DISTANCE && enoughSpeedY) {
          if (this.props.onSwipeBottom) {
              this.props.onSwipeBottom();
          }
          if (this.props.onSwipe) {
              this.props.onSwipe({direction: "BOTTOM"});
          }
          return true;
      }
      return false;
    }
    
    render() {
      return (
          <div>
              {this.props.children}
          </div>
      );
    }
}

export default withGesture(Gesture);