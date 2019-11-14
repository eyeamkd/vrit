import React from 'react';  
import {View,
        Text,
        StyleSheet,
        TextInput,
        Button } from 'react-native';
import {AppLoading, Font } from 'expo';  
import Asset from 'expo-asset';
import saveRollNumber from '../../utils/saveRollNumber';  
import LoginComponent from '../LoginComponent';
function cacheImages(images) {
        return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
        });
    }
export default class Signin extends React.Component{  
    constructor(props){ 
        super(props); 
        this.state={ 
            rollnumber:'', 
            signin:false, 
            isReady:false
        }
    } 
    async _loadAssetsAsync() {
            const imageAssets = cacheImages([
            require('../../assets/images/blackBoard.jpg'),
            ]);
            await Promise.all([...imageAssets]);
        }  
    // onloginButtonPress=()=>{  
    //     fetch('http://192.168.0.102:3000/signin/', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             rollnumber: this.state.rollnumber
    //         }),
    //         }).then(response=>{  
    //             if(response.status==200){ 
    //                 if(saveRollNumber(this.state.username)){ 
    //                     this.setState({signin:true});
    //                 }
    //             }
    //             console.log(response) 
    //         }) 
    //         .catch(err=>console.log(err))
    // }
    render(){  
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
            }else { 
                return <LoginComponent/>;
            }
        }
    } 

    const styles = StyleSheet.create({ 
        mainStyle:{ 
            flex:1
        }
    })