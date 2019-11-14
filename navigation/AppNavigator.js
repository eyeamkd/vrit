import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingNavigator from './AuthLoadingNavigator';
import MainTabNavigator from './MainTabNavigator';
import LoginComponent from '../components/LoginComponent'; 
import { withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const AuthStack = createStackNavigator({ SignIn: LoginComponent });
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html 
    AuthLoading:AuthLoadingNavigator,
    Main: MainTabNavigator,  
    Auth: LoginComponent,
  }, 
  { 
    initialRouteName:'Auth',
  })
);
