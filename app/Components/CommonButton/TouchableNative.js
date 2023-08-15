import React from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity, View, TouchableHighlight} from 'react-native';
import PropTypes from "prop-types";

const ANDROID_VERSION_LOLLIPOP = 21;

export default class TouchableNative extends React.Component {

    state = {showShadow: true};
    onPressIn = () => {
        this.setState({showShadow: false});
    };

    onPressOut = () => {
        this.setState({showShadow: true});
    };

    isiPhoneDevice () {
        return (Platform.OS === 'ios')
    }

    render() {
        if(!this.props.visible)
            return null;

        /*
         * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
         * therefore only enable it on Android Lollipop and above.
         *
         * All touchables on Android should have the ripple effect according to
         * platform design guidelines.
         * We need to pass the background prop to specify a borderless ripple effect.
         */
        const {TouchableComponent, TouchableFallback, containerStyle, style, pressColor, borderless, children, backgroundColor, borderRadius, shadow, id, ...other} = this.props;

        let rest = {onPressIn: this.onPressIn, onPressOut: this.onPressOut, ...other};

        let shadowStyle = {};
        if(shadow && this.state.showShadow)
            shadowStyle = {};

        if (
            !this.isiPhoneDevice() &&
            Platform.Version >= ANDROID_VERSION_LOLLIPOP &&
            TouchableComponent === TouchableNativeFeedback
        ) {
            return (
                <View style={[{overflow: 'hidden', backgroundColor: backgroundColor, borderRadius: borderRadius}, shadowStyle, containerStyle]}>
                    <TouchableNativeFeedback
                        {...rest}
                        background={TouchableNativeFeedback.Ripple(
                            pressColor,
                            borderless
                        )}
                        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
                        accessible={true}
                        accessibilityLabel={id}
                    >
                        <View style={style}>{children}</View>
                    </TouchableNativeFeedback>
                </View>
            );
        }

        let TouchableDefault = TouchableFallback;
        if(TouchableComponent !== TouchableNativeFeedback)
            TouchableDefault = TouchableComponent;

        if(TouchableDefault === TouchableHighlight)
            return (
                <View style={[{backgroundColor: backgroundColor, borderRadius: borderRadius}, shadowStyle, containerStyle]}>
                    <TouchableHighlight activeOpacity={0.8} underlayColor={pressColor} {...rest} style={{backgroundColor: backgroundColor, borderRadius: borderRadius}} accessible={true}
                                        accessibilityLabel={id}>
                        <View style={style}>
                            {children}
                        </View>
                    </TouchableHighlight>
                </View>
            );

        return (
            <TouchableOpacity activeOpacity={0.8} style={[{backgroundColor: backgroundColor, borderRadius: borderRadius}, shadowStyle, style, containerStyle,]} {...rest} accessible={true}
                              accessibilityLabel={id}>
                {children}
            </TouchableOpacity>
        );
    }
}

TouchableNative.propTypes = {
    visible: PropTypes.bool,
    borderless: PropTypes.bool,
    pressColor: PropTypes.string,
    TouchableComponent: PropTypes.any,
    TouchableFallback: PropTypes.any,
    containerStyle: PropTypes.any,
    style: PropTypes.any,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    shadow: PropTypes.bool,
    id: PropTypes.string,
};

TouchableNative.defaultProps = {
    visible: true,
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)',
    TouchableComponent: TouchableNativeFeedback,
    TouchableFallback: TouchableOpacity,
    id: 'title2345'
};
