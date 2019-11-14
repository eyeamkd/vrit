import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View, 
    Text
} from 'react-native'; 
import Signin from '../components/Signin/Signin'; 
import { withNavigation } from 'react-navigation'; 

class AuthLoadingScreen extends React.Component {
constructor(props){ 
    super(props); 
    console.log('inside the constructor');
    this.renderApp();
}
renderApp=()=>{  
    console.log("inside the renderapp");
    this.props.navigation.navigate('Auth');
}
  // Render any loading content that you like here
    render() {
        return (
        <View style={styles.contianer}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
    } 

const styles = StyleSheet.create({ 
    contianer:{ 
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
}) 

export default withNavigation(AuthLoadingScreen);