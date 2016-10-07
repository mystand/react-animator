import React, {PropTypes as propTypes} from 'react';
import R from 'ramda'

export default function animate(Component, propsToAnimate, duration) {
  return class Animator extends React.Component {
    constructor(props) {
      super();
      const currentAnimate = R.pick(propsToAnimate, props);
      this.state = {
        staticProps: R.omit(propsToAnimate, props),
        animateTo: currentAnimate,
        intervalId: null,
        currentAnimate
      }
    }

    componentWillUnmount() {
      const {intervalId} = this.state;
      if (intervalId != null)  clearInterval(intervalId);
    }

    componentWillReceiveProps(nextProps) {
      const nextStaticProps = R.omit(propsToAnimate, nextProps);
      const nextAnimate = R.pick(propsToAnimate, nextProps);

      if (R.equals(nextAnimate, this.state.animateTo)) {
        this.setState({staticProps: nextStaticProps})
      }

      const now = new Date().getTime();
      this.setState({
        animateFrom: this.state.currentAnimate,
        animateTo: nextAnimate,
        timeStart: now,
        timeEnd: now + duration,
        staticProps: nextStaticProps
      });
      this.startAnimationIfNeeded()
    }

    startAnimationIfNeeded() {
      const {intervalId} = this.state;
      if (intervalId == null) {
        const newIntervalId = setInterval(::this.animationStep, 3);
        this.setState({intervalId: newIntervalId});
      }
    }

    animationStep() {
      const {animateFrom, animateTo, timeStart, timeEnd} = this.state;
      const now = new Date().getTime();
      let {intervalId} = this.state;
      let currentAnimate = {};

      if (now < timeEnd) {
        for (const propName of R.keys(animateFrom)) {
          const diff = animateTo[propName] - animateFrom[propName];
          const completePercent = Math.min((now - timeStart) / (timeEnd - timeStart), 1);
          currentAnimate[propName] = animateFrom[propName] + diff * completePercent;
        }
      } else {
        clearInterval(intervalId);
        intervalId = null;
        currentAnimate = animateTo;
      }
      this.setState({currentAnimate, intervalId})
    }

    render() {
      const {staticProps, currentAnimate} = this.state;

      return (
        <Component {...staticProps} {...currentAnimate}/>
      )
    }
  }
};
