import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Carousel from '../components/carousel';
import {factsData} from '../data/factsData';

export default class Facts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Carousel data = { factsData }/>
    );
  }
}
