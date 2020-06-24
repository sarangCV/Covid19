import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg ,{ Path, Circle } from 'react-native-svg';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/Ionicons';

export default class MainHeaderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = { styles.container }>

        <View style={ styles.top }>
          <Text style = { { ...styles.title, color: this.props.stroke } }> {this.props.title} </Text>
        </View>
        <View style={ styles.middle }>
          <Text style = { { ...styles.number, color: this.props.stroke } }> {this.props.number} </Text>
          <Icon name = { this.props.icon } size = {20} color = {this.props.circleFill} style={{marginRight: 5}}/>
          <Text style = { { ...styles.deltaNumber, color: this.props.circleFill } }>{this.props.deltaNumber}</Text>
        </View>
        <View style={ styles.bottom }>
          <Svg height= {this.props.svgHeight} width={this.props.svgWeight} viewBox={this.props.viewBox} >
            <Path
              d= { this.props.d }
              fill= { this.props.fill }
              stroke= { this.props.stroke }
              strokeWidth = { this.props.strokeWidth }
              strokeDasharray = { this.props.strokeDasharray }
              strokeDashoffset = { this.props.strokeDashoffset }
            />
            <Circle fill={ this.props.circleFill } r={ this.props.circleR } cx={ this.props.circleCX } cy={ this.props.circleCY } style={ this.props.circleStyle }></Circle>
          </Svg>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height: height*0.15,
        width: width*0.42,
        // backgroundColor: 'lightgreen',
        margin: 10,
        // alignItems: 'center'
        
    },
    top: {
      height: height*0.035,
      // width: width*0.35,
      paddingLeft: 20,
      // backgroundColor: 'green',
      justifyContent: 'flex-end',
      // alignItems: 'center',
    },
    title: {
      fontSize: width*0.03,
      fontFamily: 'LexendDeca-Regular',
      // backgroundColor: 'blue'
    },
    number: {
      fontSize: width*0.055,
      fontFamily: 'LexendDeca-Regular',
      color: '#000'
    },
    deltaNumber: {
      fontSize: width*0.04,
      fontFamily: 'SourceSansPro-SemiBold',
    },
    middle: {
      height: height*0.05,
      // width: width*0.35,
      flexDirection: 'row',
      // backgroundColor: 'grey', 
      alignItems: 'center',
      paddingLeft: 15
    },
    bottom: {
      flex: 1,
      // backgroundColor: 'orange',
      // width: width*0.35,
      // alignItems: 'center',
      // justifyContent: 'center'
    }
})