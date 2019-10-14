import React from 'react';  
import {View,
        Text,
        StyleSheet,
        TextInput,
        Button } from 'react-native';
import {AppLoading, Font} from 'expo';

export default class Signin extends React.Component{  
    constructor(props){ 
        super(props); 
        this.state={ 
            username:'',
            password:'',
        }
    }  
    onloginButtonPress=()=>{  
        fetch('http://192.168.0.3:3000/signin/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            }).then(response=>{console.log(response)}) 
            .catch(err=>console.log(err))
    }
    render(){  
        console.log(this.state); 
            return(   
                <View style={styles.mainStyle}>  
                    <TextInput 
                        placeholder = "Username"  
                        onChangeText = {(username)=>{this.setState({username:username})}}
                    />
                    <TextInput 
                        placeholder = "Password" 
                        onChangeText = {(password)=>{this.setState({password:password})}}
                    /> 
                    <Button  
                        title = "Login  "
                        onPress = {()=>{this.onloginButtonPress()}}
                    />
                </View> 
                
            ); 
        }
    } 

    const styles = StyleSheet.create({ 
        mainStyle:{ 
            flex:1
        }
    })