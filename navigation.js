import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CountScreen from './screens/countscreen';
import NewsScreen from './screens/newsscreen';
import Facts from './screens/facts'


const Tab = createBottomTabNavigator();

export default class Navigation extends Component {



  render() {
    return (
      <NavigationContainer theme={DefaultTheme} >


          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'timeline' : 'timeline';
              } else if (route.name === 'News') {
                iconName = focused ? 'comment' : 'comment';
              } else if (route.name === 'Facts') {
                iconName = focused ? 'assignment-turned-in' : 'assignment-turned-in'
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={25} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#151515',
            inactiveTintColor: '#7f7f7f',
            showLabel: true,
            style: {
              height: 50
            }
          }}
          initialRouteName = 'Home'
          backBehavior = 'none'>
          <Tab.Screen name="Home" component={CountScreen} />
          <Tab.Screen name="News" component={NewsScreen} />
          <Tab.Screen name="Facts" component={Facts} />
        </Tab.Navigator>

    </NavigationContainer>
    );
  }
}
