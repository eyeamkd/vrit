import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingNavigator from './AuthLoadingNavigator';
import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html 
  AuthLoading:AuthLoadingNavigator,
  Main: MainTabNavigator, 
  AuthStack:Auth
}, 
{ 
  initialRouteName:'AuthLoading',
});

export default createBrowserApp(switchNavigator, { history: 'hash' });
