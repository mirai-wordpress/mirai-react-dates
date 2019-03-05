import React from 'react';
import { withGesture } from 'react-with-gesture';

const SWIPE_MIN_DISTANCE = 50;
const SWIPE_MAX_OFF_PATH = 300;
const SWIPE_THRESHOLD_VELOCITY = 0.1;

class Gesture extends React.Component {
    constructor(props) {
      super(props);
      this.disabledScroll = false,
      this.state = {
        startTime: null,
        gestureRecognized : false
      }
      
      this.disableScroll = this.disableScroll.bind(this);
      this.enableScroll = this.enableScroll.bind(this);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
      const {delta: [xDelta, yDelta], event, passive, down} = nextProps;
      if (!this.disabledScroll && down) {
          this.disabledScroll = true;
          this.disableScroll();
      }
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
      if (this.disabledScroll && !down) {
          this.enableScroll();
          this.disabledScroll = false;
      }
      return true;
    }
    
    disableScroll() {
        if (window.addEventListener) { // older FF
            window.addEventListener('DOMMouseScroll', this.preventDefault, {passive: false});
        }
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
        window.addEventListener('touchmove', this.preventDefault, {passive: false});
//        window.ontouchmove  = this.preventDefault; // mobile
    }
    
    enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', this.preventDefault, {passive: false});
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.removeEventListener('touchmove', this.preventDefault, {passive: false});
    }
    
    preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault && e.cancelable) {
            e.preventDefault();
        }
        e.returnValue = false;
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
          <div style={{touchAction: "none"}}>
              {this.props.children}
          </div>
      );
    }
}

export default withGesture({passive: false})(Gesture);