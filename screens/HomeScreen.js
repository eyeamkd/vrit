import React from 'react';  
import {View,StyleSheet, Text } from 'react-native'; 
import Signin from '../components/Signin/Signin';
import Dashboard from '../components/Dashboard';

export default class HomeScreen extends React.Component{ 
  render(){ 
    return( 
      <View style={styles.mainStyle}>  
        <Dashboard/>
      </View>
    );
  }
}  

HomeScreen.navigationOptions = {
  title: 'Your Profile',
};

const styles = StyleSheet.create({ 
  mainStyle:{ 
    flex:1
  }
})