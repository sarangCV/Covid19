import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class ContentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = { { ...styles.container, backgroundColor: this.props.backgroundColor } }>
        <View style={ styles.header }>
          <Text style={ { ...styles.title, color: this.props.textColor } }>{ this.props.title }</Text>
        </View>
        <View style={ styles.body }>
          <View style={ styles.confirmedView }>
              <Text style={ styles.bodyText2 }>confirmed : { this.props.confirmed } </Text><Icon name = 'md-arrow-round-up' size = {15} color = '#B71C1C' style={{marginRight: 5}}/><Text style={ styles.bodyTextNew1 }>{ this.props.deltaConfirmed }</Text>
          </View>
          <Text style={ styles.bodyText1 }>active : { this.props.active }</Text>
          <View style={ styles.confirmedView }>
              <Text style={ styles.bodyText3 }>recovered : { this.props.recovered } </Text><Icon name = 'md-arrow-round-up' size = {15} color = '#388E3C' style={{marginRight: 5}}/><Text style={ styles.bodyTextNew2 }>{ this.props.deltaRecovered }</Text>
          </View>
          <View style={ styles.confirmedView }>
              <Text style={ styles.bodyText4 }>deceased : { this.props.deceased } </Text><Icon name = 'md-arrow-round-up' size = {15} color = '#607D8B' style={{marginRight: 5}}/><Text style={ styles.bodyTextNew3 }>{ this.props.deltaDeceased }</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        
        // height: height*0.17,
        borderRadius: 7,
        marginVertical: 5,
        elevation: 0
    },
    header: {
        height: height*0.035,
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // elevation: 1,
        // backgroundColor: 'red'

    },
    title: {
        fontSize: width*0.035,
        fontFamily: 'LexendDeca-Regular',
        // color: '#ed4242'
    },
    body: {
        // height: '80%',
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomStartRadius: 10,
        // borderBottomEndRadius: 10,
        // elevation: 1,
        flex: 1,
        // backgroundColor: 'orange'

        
    },
    bodyText1: {
      fontSize: width*0.032,
      fontFamily: 'OpenSans-Regular',
      color: '#3F51B5',
      
    },
    confirmedView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyText2: {
      fontSize: width*0.032,
      fontFamily: 'OpenSans-Regular',
      color: '#B71C1C',
      marginRight: 2

    },
    bodyText3: {
      fontSize: width*0.032,
        fontFamily: 'OpenSans-Regular',
      color: '#388E3C',
      marginRight: 2

    },
   bodyText4: {
    fontSize: width*0.032,
    fontFamily: 'OpenSans-Regular',
      color: '#607D8B',
      marginRight: 2
    },
    bodyTextNew1: {
        fontSize: width*0.030,
        color: '#B71C1C',
        marginRight: 5,
        fontFamily: 'LexendDeca-Regular',

    },
    bodyTextNew2: {
        fontSize: width*0.030,
        color: '#388E3C',
        marginRight: 5,
        fontFamily: 'LexendDeca-Regular',

    },
    bodyTextNew3: {
        fontSize: width*0.030,
        color: '#607D8B',
        marginRight: 5,
        fontFamily: 'LexendDeca-Regular',

    }
})