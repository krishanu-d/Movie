import React, { PureComponent } from 'react';
import * as Animatable from 'react-native-animatable';

export class TransitionView extends PureComponent {
  render() {
    const { index, ...rest } = this.props;
    const transitionDuration = 2000
    return (
      <Animatable.View
        animation="fadeIn"
        duration={transitionDuration}
        delay={index ? (index * transitionDuration) / 5 : 0}
        useNativeDriver
        {...rest}
      />
    );
  }
}
