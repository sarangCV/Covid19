import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';

import MainHeaderCard from '../components/mainHeaderCard';
import ContentCard from '../components/contentCard';
import moment from 'moment';
import LoadingScreen from '../components/loadingScreen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class CountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currDate: new Date().toDateString(),
      districtData: { Kasaragod: {delta:{}},
                      Kannur: {delta:{}},
                      Kozhikode: {delta:{}},
                      Wayanad: {delta:{}},
                      Malappuram: {delta:{}},
                      Palakkad: {delta:{}},
                      Thrissur: {delta:{}},
                      Idukki: {delta:{}},
                      Ernakulam: {delta:{}},
                      Kottayam: {delta:{}},
                      Alappuzha: {delta:{}},
                      Pathanamthitta: {delta:{}},
                      Kollam: {delta:{}},
                      Thiruvananthapuram: {delta:{}}
                    },
      kerala: [],
      lastupdatedtime: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('https://api.covid19india.org/state_district_wise.json')
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        districtData: responseJson.Kerala.districtData
      })
      console.log(this.state.districtData)
    })

    fetch('https://api.covid19india.org/data.json')
    .then(response => response.json())
    .then((responseJson) => {
      const filteredData = responseJson.statewise.filter((item) => {
        return(item.state === 'Kerala')
      })
      this.setState({
        kerala: filteredData[0],
        lastupdatedtime: moment(`${filteredData[0].lastupdatedtime}`, "DD/MM/YYYY hh:mm:ss").utcOffset("+05:30").fromNow(),
        isLoading: false
      })
      // console.log(this.state.kerala)
    })
  }

  render() {
    // console.log(this.state.districtData.Alappuzha)
    return (
      <View style = { styles.container }>
        <View style = { styles.header }>
          <Text style = { styles.headerText }> COVID19 KERALA </Text>
          <Text style = { styles.date }> {this.state.currDate} </Text>
        </View>

        {this.state.isLoading ? (
          <View style={ styles.container }>
            <LoadingScreen/>
          </View>
        ) : (
          <View style = { styles.body }>
          <ScrollView showsVerticalScrollIndicator = {false}>
              <View style = { styles.mainContentView }>
                <View style = { styles.mainContent }>
                  <View style = { styles.mainContentHeader }>
                    <Text style = { styles.lastupdatedtime }>Last updated time : { this.state.lastupdatedtime } </Text>
                  </View>
                  <View style = { styles.mainContentBody }>
                    <View style = { styles.mainContentBodyTop }>
                      <MainHeaderCard
                        title = "Confirmed"
                        number = { this.state.kerala.confirmed }
                        deltaNumber = { this.state.kerala.deltaconfirmed }
                        newCase = { this.state.kerala.deltaconfirmed }
                        svgHeight = "100%"
                        svgWeight = "100%"
                        viewBox = "0 0 100 35"
                        d="M5,25.12143161482744C6.5,24.456327226246273,8,23.791222837665103,9.5,23.791222837665103C11,23.791222837665103,12.5,25.271552336315864,14,25.870046868342566C15.5,26.46854140036927,17,27.38219002982531,18.5,27.38219002982531C20,27.38219002982531,21.5,23.4044879988638,23,23.388581167447807C24.5,23.372674336031814,26,23.380627751739812,27.5,23.36472092032382C29,23.348814088907826,30.5,21.177531600624913,32,20.728163613123137C33.5,20.27879562562136,35,20.377716233489558,36.5,20.05411163187047C38,19.73050703025138,39.5,18.78653600340861,41,18.78653600340861C42.5,18.78653600340861,44,21.965913932680017,45.5,21.965913932680017C47,21.965913932680017,48.5,19.69521374804715,50,18.717937792927138C51.5,17.740661837807128,53.00000000000001,16.4164181224258,54.50000000000001,16.102258201959952C56.00000000000001,15.788098281494106,57.5,15.631018321261184,59,15.631018321261184C60.5,15.631018321261184,62,16.749467405198125,63.5,16.749467405198125C65,16.749467405198125,66.5,14.65871325095867,68,13.957818491691521C69.5,13.256923732424372,71,12.54409884959523,72.5,12.54409884959523C74,12.54409884959523,75.5,19.54111631870473,77,19.54111631870473C78.5,19.54111631870473,80,16.533731004118735,81.5,15.231359181934385C83,13.928987359750035,84.5,11.726885385598635,86,11.726885385598635C87.5,11.726885385598635,89,11.789518534299102,90.5,11.789518534299102C92,11.789518534299102,93.5,11.534512143161482,95,11.27950575202386"
                        fill="none"
                        stroke="#ff073a"
                        strokeWidth = "2"
                        strokeDasharray = "105.36489868164062"
                        strokeDashoffset = "0"
                        circleFill = "#ff073a"
                        circleR = "2.5"
                        circleCX = "95"
                        circleCY = "11.27950575202386"
                        circleStyle = "opacity: 1;"
                        icon = 'md-arrow-round-up'
                        />
                      <MainHeaderCard
                        title = "Active"
                        number = { this.state.kerala.active }
                        svgHeight = "100%"
                        svgWeight = "100%"
                        viewBox = "0 26 100 35"
                        d="M5,33.230933106092884C6.5,33.471026842778016,8,33.71112057946315,9.5,34.057094162760976C11,34.4030677460588,12.5,34.551200113620226,14,35.306774605879845C15.5,36.062349098139464,17,38.590541116318704,18.5,38.590541116318704C20,38.590541116318704,21.5,34.75401221417413,23,34.191308052833406C24.5,33.62860389149268,26,33.34725181082232,27.5,33.34725181082232C29,33.34725181082232,30.5,56.53046442266723,32,56.53046442266723C33.5,56.53046442266723,35,33.499360886237746,36.5,33.499360886237746C38,33.499360886237746,39.5,34.14657008947593,41,34.14657008947593C42.5,34.14657008947593,44,34.14557591251243,45.5,34.14358755858543C47,34.141599204658434,48.5,33.72702741087914,50,32.893907115466554C51.5,32.06078682005397,53.00000000000001,28.175543246697917,54.50000000000001,28.175543246697917C56.00000000000001,28.175543246697917,57.5,28.935591535293284,59,29.54452492543673C60.5,30.153458315580174,62,31.829143587558583,63.5,31.829143587558583C65,31.829143587558583,66.5,31.554750745632727,68,31.05070302513848C69.5,30.54665530464423,71,28.804857264593096,72.5,28.804857264593096C74,28.804857264593096,75.5,35.778014486578606,77,35.778014486578606C78.5,35.778014486578606,80,33.55752023860247,81.5,32.84618662121858C83,32.134853003834685,84.5,31.815722198551345,86,31.510012782275247C87.5,31.20430336599915,89,31.011930123561996,90.5,31.011930123561996C92,31.011930123561996,93.5,32.38836812952706,95,33.76480613549212"
                        fill="none"
                        stroke="#007bff"
                        strokeWidth = "2"
                        strokeDasharray = "142.07508850097656"
                        strokeDashoffset = "0"
                        circleFill = "#007bff"
                        circleR = "2.5"
                        circleCX = "95"
                        circleCY = "34.11077971878994"
                        circleStyle = "opacity: 1;"
                        />
                    </View>
                    <View style = { styles.mainContentBodyBottom }>
                      <MainHeaderCard
                        title = "Recovered"
                        number = { this.state.kerala.recovered }
                        deltaNumber = { this.state.kerala.deltarecovered }
                        svgHeight = "100%"
                        svgWeight = "100%"
                        viewBox = "0 5 100 35"
                        d="M5,37.317000426075836C6.5,36.259693225394116,8,35.2023860247124,9.5,35.2023860247124C11,35.2023860247124,12.5,36.016616957818485,14,36.016616957818485C15.5,36.016616957818485,17,34.30762675756284,18.5,34.30762675756284C20,34.30762675756284,21.5,34.55219429058372,23,34.75798892202812C24.5,34.96378355347252,26,35.54239454622923,27.5,35.54239454622923C29,35.54239454622923,30.5,10,32,10C33.5,10,35,32.16616957818491,36.5,32.16616957818491C38,32.16616957818491,39.5,30.30208777162335,41,30.30208777162335C42.5,30.30208777162335,44,33.42181508308479,45.5,33.42181508308479C47,33.42181508308479,48.5,31.486152535151255,50,31.486152535151255C51.5,31.486152535151255,53.00000000000001,33.69919045590115,54.50000000000001,33.69919045590115C56.00000000000001,33.69919045590115,57.5,32.39433319130805,59,31.906689390711545C60.5,31.419045590115037,62,31.2917909387871,63.5,30.77332765232211C65,30.25486436585712,66.5,28.795909671921603,68,28.795909671921603C69.5,28.795909671921603,71,29.477915068882247,72.5,29.517682147422235C74,29.557449225962223,75.5,29.577332765232217,77,29.577332765232217C78.5,29.577332765232217,80,28.74520664678313,81.5,28.196420962931406C83,27.64763527907968,84.5,26.284618662121858,86,26.284618662121858C87.5,26.284618662121858,89,26.97358329782702,90.5,26.97358329782702C92,26.97358329782702,93.5,25.14976565828718,95,23.32594801874734"
                        fill="none"
                        stroke="#28a745"
                        strokeWidth = "2"
                        strokeDasharray = "136.9618682861328"
                        strokeDashoffset = "0"
                        circleFill = "#28a745"
                        circleR = "2.5"
                        circleCX = "95"
                        circleCY = "23.32594801874734"
                        circleStyle = "opacity: 1;"
                        icon = 'md-arrow-round-up'
                        />
                      <MainHeaderCard
                        title = "Deceased"
                        number = { this.state.kerala.deaths }
                        deltaNumber = { this.state.kerala.deltadeaths }
                        svgHeight = "100%"
                        svgWeight = "100%"
                        viewBox = "0 30 100 35"
                        d="M5,44.576480613549215C6.5,44.55560289731572,8,44.53472518108224,9.5,44.53472518108224C11,44.53472518108224,12.5,44.552620366425224,14,44.552620366425224C15.5,44.552620366425224,17,44.50291151825025,18.5,44.48402215594376C20,44.465132793637274,21.5,44.439284192586285,23,44.439284192586285C24.5,44.439284192586285,26,44.475074563272265,27.5,44.475074563272265C29,44.475074563272265,30.5,44.19769919045589,32,44.19769919045589C33.5,44.19769919045589,35,44.38858116744781,36.5,44.38858116744781C38,44.38858116744781,39.5,44.337878142309336,41,44.337878142309336C42.5,44.337878142309336,44,44.400511291009806,45.5,44.400511291009806C47,44.400511291009806,48.5,44.36670927425082,50,44.337878142309336C51.5,44.30904701036785,53.00000000000001,44.25337310041187,54.50000000000001,44.22752449936088C56.00000000000001,44.201675898309894,57.5,44.19620792501065,59,44.182786536003405C60.5,44.169365146996164,62,44.15842920039767,63.5,44.146996165317425C65,44.13556313023718,66.5,44.11418832552194,68,44.11418832552194C69.5,44.11418832552194,71,44.221559437579884,72.5,44.221559437579884C74,44.221559437579884,75.5,44.1937224826019,77,44.1917341286749C78.5,44.189745774747905,80,44.1907399517114,81.5,44.1887515977844C83,44.186763243857406,84.5,43.992898735975004,86,43.93225394120154C87.5,43.87160914642807,89,43.82488282914359,90.5,43.82488282914359C92,43.82488282914359,93.5,43.83383042181508,95,43.842778014486576"
                        fill="none"
                        stroke="#6c757d"
                        strokeWidth = "2"
                        strokeDasharray = "90.03114318847656"
                        strokeDashoffset = "0"
                        circleFill = "#6c757d"
                        circleR = "2.5"
                        circleCX = "95"
                        circleCY = "43.842778014486576"
                        circleStyle = "opacity: 1;"
                        icon = 'md-arrow-round-up'
                        />
                    </View>

                  </View>
                </View>
              </View>

              <View style = { styles.subContentHeader }>
                <Text style = { styles.subContentHeaderText }>Districtwise Data</Text>
              </View> 

              <View style = { styles.subContent }>
                                  
                <View style = { styles.subContentBodyLeftView }>
                  <ContentCard
                    title = "Kasaragod"
                    confirmed = {this.state.districtData.Kasaragod.confirmed}
                    active = {this.state.districtData.Kasaragod.active}
                    recovered = {this.state.districtData.Kasaragod.recovered}
                    deceased = {this.state.districtData.Kasaragod.deceased}
                    deltaConfirmed = { this.state.districtData.Kasaragod.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Kasaragod.delta.recovered }
                    deltaDeceased = { this.state.districtData.Kasaragod.delta.deceased }
                    backgroundColor = '#f8e4e3'
                    textColor = '#ed4242'
                    />
                  <ContentCard
                    title = "Kannur"
                    confirmed = {this.state.districtData.Kannur.confirmed}
                    active = {this.state.districtData.Kannur.active}
                    recovered = {this.state.districtData.Kannur.recovered}
                    deceased = {this.state.districtData.Kannur.deceased}
                    deltaConfirmed = { this.state.districtData.Kannur.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Kannur.delta.recovered }
                    deltaDeceased = { this.state.districtData.Kannur.delta.deceased }
                    backgroundColor = '#f3f3fd'
                    textColor = '#6c6cd9'
                  />
                  <ContentCard
                    title = "Kozhikode"
                    confirmed = {this.state.districtData.Kozhikode.confirmed}
                    active = {this.state.districtData.Kozhikode.active}
                    recovered = {this.state.districtData.Kozhikode.recovered}
                    deceased = {this.state.districtData.Kozhikode.deceased}
                    deltaConfirmed = { this.state.districtData.Kozhikode.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Kozhikode.delta.recovered }
                    deltaDeceased = { this.state.districtData.Kozhikode.delta.deceased }
                    backgroundColor = '#e6f4ea'
                    textColor = '#3cad5c'
                    />
                    <ContentCard
                    title = "Wayanad"
                    confirmed = {this.state.districtData.Wayanad.confirmed}
                    active = {this.state.districtData.Wayanad.active}
                    recovered = {this.state.districtData.Wayanad.recovered}
                    deceased = {this.state.districtData.Wayanad.deceased}
                    deltaConfirmed = { this.state.districtData.Wayanad.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Wayanad.delta.recovered }
                    deltaDeceased = { this.state.districtData.Wayanad.delta.deceased }
                    backgroundColor = '#e9e3f0'
                    textColor = '#a16bdf'
                    />
                    <ContentCard
                    title = "Malappuram"
                    confirmed = {this.state.districtData.Malappuram.confirmed}
                    active = {this.state.districtData.Malappuram.active}
                    recovered = {this.state.districtData.Malappuram.recovered}
                    deceased = {this.state.districtData.Malappuram.deceased}
                    deltaConfirmed = { this.state.districtData.Malappuram.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Malappuram.delta.recovered }
                    deltaDeceased = { this.state.districtData.Malappuram.delta.deceased }
                    backgroundColor = '#f0ece3'
                    textColor = '#e0b24b'
                    />
                    <ContentCard
                    title = "Palakkad"
                    confirmed = {this.state.districtData.Palakkad.confirmed}
                    active = {this.state.districtData.Palakkad.active}
                    recovered = {this.state.districtData.Palakkad.recovered}
                    deceased = {this.state.districtData.Palakkad.deceased}
                    deltaConfirmed = { this.state.districtData.Palakkad.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Palakkad.delta.recovered }
                    deltaDeceased = { this.state.districtData.Palakkad.delta.deceased }
                    backgroundColor = '#e1e7f7'
                    textColor = '#4977f2'
                    />
                    
                    <ContentCard
                    title = "Thrissur"
                    confirmed = {this.state.districtData.Thrissur.confirmed}
                    active = {this.state.districtData.Thrissur.active}
                    recovered = {this.state.districtData.Thrissur.recovered}
                    deceased = {this.state.districtData.Thrissur.deceased}
                    deltaConfirmed = { this.state.districtData.Thrissur.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Thrissur.delta.recovered }
                    deltaDeceased = { this.state.districtData.Thrissur.delta.deceased }
                    backgroundColor = '#f7eef9'
                    textColor = '#ca67e0'
                    />
                </View>
                   
                <View style = { styles.subContentBodyRightView }>
                <ContentCard
                    title = "Idukki"
                    confirmed = {this.state.districtData.Idukki.confirmed}
                    active = {this.state.districtData.Idukki.active}
                    recovered = {this.state.districtData.Idukki.recovered}
                    deceased = {this.state.districtData.Idukki.deceased}
                    deltaConfirmed = { this.state.districtData.Idukki.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Idukki.delta.recovered }
                    deltaDeceased = { this.state.districtData.Idukki.delta.deceased }
                    backgroundColor = '#efefef'
                    textColor = '#6d6d6d'
                    />
                  <ContentCard
                    title = "Ernakulam"
                    confirmed = {this.state.districtData.Ernakulam.confirmed}
                    active = {this.state.districtData.Ernakulam.active}
                    recovered = {this.state.districtData.Ernakulam.recovered}
                    deceased = {this.state.districtData.Ernakulam.deceased}
                    deltaConfirmed = { this.state.districtData.Ernakulam.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Ernakulam.delta.recovered }
                    deltaDeceased = { this.state.districtData.Ernakulam.delta.deceased }
                    backgroundColor = '#f7f3e2'
                    textColor = '#d1b332'
                  />
                  <ContentCard
                    title = "Kottayam"
                    confirmed = {this.state.districtData.Kottayam.confirmed}
                    active = {this.state.districtData.Kottayam.active}
                    recovered = {this.state.districtData.Kottayam.recovered}
                    deceased = {this.state.districtData.Kottayam.deceased}
                    deltaConfirmed = { this.state.districtData.Kottayam.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Kottayam.delta.recovered }
                    deltaDeceased = { this.state.districtData.Kottayam.delta.deceased }
                    backgroundColor = '#e2ecf7'
                    textColor = '#438ee0'
                    />
                    <ContentCard
                    title = "Alappuzha"
                    confirmed = {this.state.districtData.Alappuzha.confirmed}
                    active = {this.state.districtData.Alappuzha.active}
                    recovered = {this.state.districtData.Alappuzha.recovered}
                    deceased = {this.state.districtData.Alappuzha.deceased}
                    deltaConfirmed = { this.state.districtData.Alappuzha.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Alappuzha.delta.recovered }
                    deltaDeceased = { this.state.districtData.Alappuzha.delta.deceased }
                    backgroundColor = '#f7e5e2'
                    textColor = '#ed4242'
                    />
                    <ContentCard
                    title = "Pathanamthitta"
                    confirmed = {this.state.districtData.Pathanamthitta.confirmed}
                    active = {this.state.districtData.Pathanamthitta.active}
                    recovered = {this.state.districtData.Pathanamthitta.recovered}
                    deceased = {this.state.districtData.Pathanamthitta.deceased}
                    deltaConfirmed = { this.state.districtData.Pathanamthitta.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Pathanamthitta.delta.recovered }
                    deltaDeceased = { this.state.districtData.Pathanamthitta.delta.deceased }
                    backgroundColor = '#e2f7ed'
                    textColor = '#28bf77'
                    />
                    <ContentCard
                    title = "Kollam"
                    confirmed = {this.state.districtData.Kollam.confirmed}
                    active = {this.state.districtData.Kollam.active}
                    recovered = {this.state.districtData.Kollam.recovered}
                    deceased = {this.state.districtData.Kollam.deceased}
                    deltaConfirmed = { this.state.districtData.Kollam.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Kollam.delta.recovered }
                    deltaDeceased = { this.state.districtData.Kollam.delta.deceased }
                    backgroundColor = '#f4f7e2'
                    textColor = '#acc229'
                    />
                    
                    <ContentCard
                    title = "Thiruvananthapuram"
                    confirmed = {this.state.districtData.Thiruvananthapuram.confirmed}
                    active = {this.state.districtData.Thiruvananthapuram.active}
                    recovered = {this.state.districtData.Thiruvananthapuram.recovered}
                    deceased = {this.state.districtData.Thiruvananthapuram.deceased}
                    deltaConfirmed = { this.state.districtData.Thiruvananthapuram.delta.confirmed }
                    deltaRecovered = { this.state.districtData.Thiruvananthapuram.delta.recovered }
                    deltaDeceased = { this.state.districtData.Thiruvananthapuram.delta.deceased }
                    backgroundColor = '#f7e2e2'
                    textColor = '#ed4242'
                    />
                </View> 
                
              </View>
          </ScrollView>   

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
  mainContentView: {
    height: height*0.40,
    // backgroundColor: 'green',
    padding: 5,
    // elevation: 10,
    // borderWidth: 1,
    borderRadius: 5

  },
  mainContent: {
    backgroundColor: '#eeeeee',
    flex: 1,
    borderRadius: 10,
  },
  mainContentHeader: {
    height: height*0.05,
    // backgroundColor: 'blue',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  lastupdatedtime: {
    color: '#787878',
    fontFamily: 'LexendDeca-Regular'
  },
  mainContentBody: {
    flex: 1,
    // backgroundColor: 'pink',
    borderRadius: 10,

  },
  mainContentBodyTop: {
    flex:1,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  mainContentBodyBottom: {
    flex:1,
    flexDirection: 'row',
    // backgroundColor: 'grey',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,


  },
  subContent: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  subContentHeader: {
    height: height*0.05,
    // backgroundColor: 'red',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  subContentHeaderText: {
    color: '#787878',
    fontSize: width*0.035,
    fontFamily: 'LexendDeca-Regular'
  },
  subContentBodyLeftView: {
    flex: 1,
    // backgroundColor: 'green',
    padding: 5
  },
  subContentBodyRightView: {
    flex: 1,
    // backgroundColor: 'purple',
    padding: 5

  },
})