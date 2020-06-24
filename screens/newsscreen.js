import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, Image, ImageBackground, Linking,TouchableOpacity } from 'react-native';
import NewsCard from '../components/newsCard';
import Icon from 'react-native-vector-icons/Feather';
import LoadingScreen from '../components/loadingScreen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currDate: new Date().toDateString(),
      data: [],
      topNews: {source: {}},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData =  () => {
    fetch('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=24cf1985087946dbad6f46afc191cece')
    .then(response => response.json())
    .then((responseJson) => {
      for (let i = 1; i < responseJson.articles.length; i++) {
        const element = responseJson.articles[i];
        // console.log(element)
        this.setState({ data: this.state.data.concat(element),
          topNews: responseJson.articles[0],
          isLoading: false})
      }
        // console.log(this.state.topNews)
    })
    
  }

  getHeader = () => {
    const topNews = this.state.topNews;
    return(
    <TouchableOpacity style = { styles.topNewsView } onPress = {()=> {Linking.openURL(`${topNews.url}`)}}>
      <ImageBackground
        source = {{uri: `${topNews.urlToImage}`}}
        style={ styles.topNewsImage }
        imageStyle = {{ opacity: 0.85 }}
        // resizeMode = 'center'
        >
        <View style={styles.overlay}>
          <Text style={ styles.topNewsTitle } >{ topNews.title }</Text>
          <View style={styles.overlayInnerView}>
            <Icon name = "external-link" size = {12} color = '#a5a5a5' style={{ marginRight: 5 }}/>
            <Text style = { styles.overlayInnerViewText }>{topNews.source.name}</Text>
          </View>
        </View>
       
      </ImageBackground>
    </TouchableOpacity>
    )
    
};

  render() {
    // console.log(this.state.topNews)
    return (
      <View style = { styles.container }>
        <View style = { styles.header }>
          <Text style = { styles.headerText }> COVID19 NEWS </Text>
          <Text style = { styles.date }> {this.state.currDate} </Text>
        </View>
      {this.state.isLoading ? (
         <View style={ styles.container }>
            <LoadingScreen/>
          </View>
      ) : (
        <View style = { styles.body }>
          
        <FlatList
          data = { this.state.data }
          renderItem = {({item}) => { return(
            <NewsCard onPress = {()=> {Linking.openURL(`${item.url}`)}}>
              <View style = { styles.newsCardLeftView }>
                <View>
                  <Text style={ styles.newsCardTitle }>{ item.title }</Text>
                </View>
                <View style={ styles.newsCardLinkIconView }>
                  <Icon name = "external-link" size = {12} color = '#a5a5a5' style={{ marginRight: 5 }}/>
                  <Text style={ styles.newsCardLinkIconText }>{item.source.name}</Text>
                </View>
              </View>
              <View style = { styles.newsCardRightView }>
                <Image
                  source = {{uri: `${item.urlToImage}`}}
                  style = {styles.img}/>
              </View>
            </NewsCard>
          )
          }}
          keyExtractor = {(item,index) => index.toString()}
          ListHeaderComponent = { this.getHeader }
          />
      </View>
      )}
        
      </View>
    );
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
  date: {
    fontFamily: 'LexendDeca-Regular',
    color: '#666666',
    fontSize: width*0.030
  },
  body: {
    // backgroundColor: 'orange',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    flex: 1,
  },
  img: {
    height: height*0.09,
    width: width*0.20,
    resizeMode: 'cover',
    borderRadius: 7
  },
  topNewsView: {
    height: height*0.25,
    borderRadius: 7,
    backgroundColor: 'black',
  },
  topNewsImage: {
    height: '100%',
    width: '100%',
    borderRadius: 7,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    alignItems: 'center',
    // justifyContent: 'space-between'
    
  },
  topNewsTitle: {
    color: '#fff',
    fontFamily: 'LexendDeca-Regular'
  },
  overlay: {
    // height: height*0.07,
    width: '99%',
    // backgroundColor:'green',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,.3)',

  },
  overlayInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  overlayInnerViewText: {
    fontSize: width*0.03,
    color: '#a5a5a5',
    fontFamily: 'OpenSans-Regular'
  },
  newsCardLeftView: {
    // backgroundColor: 'orange',
    flex: 2,
    justifyContent: 'space-between'
  },
  newsCardLinkIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsCardLinkIconText: {
    fontSize: width*0.025,
    color: '#a5a5a5',
    fontFamily: 'OpenSans-Regular'
  },
  newsCardRightView: {
    // backgroundColor: 'green',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  newsCardTitle: {
    fontSize: width*0.028,
    fontFamily: 'LexendDeca-Regular'
  }
})