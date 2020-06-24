import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends Component {
    
  render() {
    return (
      <View style = {styles.container}>
        <ActivityIndicator
        size = "large"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})