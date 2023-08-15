import {Component} from 'react';
import React from 'react';
import { TouchableHighlight,TouchableNativeFeedback, Image,Text} from 'react-native'
import PropTypes from "prop-types";
import TouchableNative from './TouchableNative';
import { Colors } from '../../Colors';
// import { Colors } from '../../Common/Colors';
// import { Fonts } from '../../Common/Fonts';

class CommonButton extends Component {
    render () {
        return (
            <TouchableNative visible={this.props.visible}
                             TouchableComponent={this.props.TouchableComponent}
                             TouchableFallback={this.props.TouchableFallback}
                             disabled={this.props.disabled}
                             activeOpacity={this.props.activeOpacity}
                             shadow={this.props.shadow}
                             onPress={this.props.onPress}
                             pressColor={this.props.underlayColor}
                             borderRadius={this.props.borderRadius}
                             backgroundColor={(this.props.disabled && this.props.disabledColor != null) ? this.props.disabledColor : this.props.backgroundColor}
                             containerStyle={this.props.containerStyle}
                             id={this.props.title}
                             style={[{
                                borderRadius: this.props.borderRadius,
                                // borderWidth: 1,
                                // fontFamily:Fonts.RobotoMedium,
                                borderColor: Colors.themeColor,
                                padding: 6,
                                minWidth: 60,
                                minHeight: 24,
                                alignItems: 'center',
                                justifyContent: 'center'}, this.props.style]}>
                {
                    this.props.showIcon &&
                    <Image source={this.props.icon} style={this.props.imageStyle}/>
                }

                <Text style={[{
                    color: 'white',
                    textAlign: "center",
                    paddingHorizontal: 6,
                    fontSize: 12,
                    // fontFamily:Fonts.RobotoMedium
                }, this.props.textStyle]}>
                    {this.props.title}
                </Text>

                {
                    this.props.showRightIcon &&
                    <Image source={this.props.icon} style={this.props.imageStyle}/>
                }

            </TouchableNative>
        )
    }
}

CommonButton.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    activeOpacity: PropTypes.number,
    underlayColor: PropTypes.string,
    disabled: PropTypes.bool,
    disabledColor: PropTypes.string,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    style: PropTypes.any,
    containerStyle: PropTypes.any,
    textStyle: PropTypes.any,
    TouchableComponent: PropTypes.any,
    TouchableNativeFeedback: PropTypes.any,
    shadow: PropTypes.bool,
    showIcon: PropTypes.bool,
    icon: PropTypes.any,
    imageStyle: PropTypes.any,
    showRightIcon: PropTypes.bool,
};

CommonButton.defaultProps = {
    visible: true,
    disabled: false,
    shadow: true,
    disabledColor: Colors.light_gray,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    activeOpacity: 0.5,
    TouchableFallback: TouchableHighlight,
    TouchableComponent: TouchableNativeFeedback,
    showIcon: false,
    showRightIcon: false
};

export default CommonButton;
