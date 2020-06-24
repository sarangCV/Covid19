import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style = { styles.container } onPress = { this.props.onPress }>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 7,
        height: height*0.10,
        marginVertical: 5,
        elevation: 0,
        backgroundColor: '#fafafa',
        borderTopWidth: 0.5,
        borderTopColor: 'lightgrey'
    },
    
})