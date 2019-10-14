import React from 'react';  
import {View,StyleSheet } from 'react-native'; 
import Signin from '../components/Signin/Signin';

export default class HomeScreen extends React.Component{ 
  render(){ 
    return( 
      <View style={styles.mainStyle}>  
        <Signin/>
      </View>
    );
  }
} 

const styles = StyleSheet.create({ 
  mainStyle:{ 
    flex:1
  }
})