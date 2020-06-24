import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, FlatList, Image, StyleSheet } from 'react-native';


const {width, height} = Dimensions.get('window')
export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    if(this.props.data && this.props.data.length){
        return (
            <View style = { styles.container }>
              <View style = { styles.header }>
                <Text style = { styles.headerText }> COVID19 FACTS </Text>
                <Text style = { styles.date }> {this.state.currDate} </Text>
            </View>
              <FlatList
                data = { this.props.data }
                keyExtractor = {(item,index) => index.toString()}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment = 'center'
                scrollEventThrottle = {16}
                decelerationRate = 'fast'
                showsHorizontalScrollIndicator = {false}
                renderItem = { ({ item }) => {
                    return(
                        <View style = { styles.carouselItemView }>
                            <Image source = { item.img } style={ styles.img } resizeMode = { 'contain' }/>
                            <Text style = { styles.text }>{ item.description }</Text>
                        </View>
                    )
                }}
                onScroll = { Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                ) }
                />

              <View style = { styles.dotView }>
                {this.props.data.map((_, i) => {
                  let opacity = position.interpolate({
                      inputRange: [i - 1, i, i +  1],
                      outputRange: [0.3, 1, 0.3],
                      extrapolate: 'clamp'
                  })
                  return(
                    <Animated.View
                      key = {i}
                      style = {{opacity, height: height*0.005, width: width*0.05, backgroundColor: '#969696', margin: 7,marginBottom: 20, borderRadius: 10}}
                    />
                  )
                })}
              </View>
            </View>
            
            
          );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    height: height*0.07,
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  headerText: {
    fontFamily: 'LexendDeca-Regular',
    fontSize: width*0.045,
    color: '#666666'
  },
  carouselItemView: {
    flex: 1,
    height: '98%',
    width: width,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    // backgroundColor: 'orange',
    alignItems: 'center',
  },
  img: {
    height: height*0.4,
    width: width*0.5,
    // backgroundColor: 'red'
  },
  text: {
    fontSize: width*0.062,
    textAlign: 'center',
    fontFamily: 'LexendDeca-Regular'
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})