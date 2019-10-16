import React from 'react';
import { ScrollView, StyleSheet, View, Text, Picker, AppState, TextInput  } from 'react-native';
import { Notifications } from 'expo'; 
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PUSH_REGISTRATION_ENDPOINT = 'http://26523884.ngrok.io/notifications/token';  
const MESSAGE_ENDPOINT = 'http://26523884.ngrok.io/notifications/message'; 


export default class LinksScreen extends React.Component {   
  constructor(props){  
    super(props);  
    this.handleAppStateChange=this.handleAppStateChange.bind(this);
    this.state={ 
    notification:null,
    messageText:'' 
  }
  } 
  componentDidMount(){ 
    AppState.addEventListener('change',this.handleAppStateChange); 
    this.registerForNotificationsAysnc();
  } 
  componentWillMount(){ 
    AppState.removeEventListener('change',this.handleAppStateChange);
  }  
  welcomeNotification=()=>{  
    const AttendanceCalculationNotification = { 
      title:'Today\'s Classes Update!',
      body:'Check out the classes that you have attended today, so that VRIT can keep your attendance upto date', 
      sound:'true',
      priority:'high',
      vibrate:'true'
    }  
    let timeForClassWorkNotification =  new Date(); 
    const classWorkNotificationSchedulingOptions = { 
        time: (new Date()).getTime() + 10000,
    };  
    Notifications.scheduleLocalNotificationAsync(AttendanceCalculationNotification,classWorkNotificationSchedulingOptions);
  }
  registerForNotificationsAysnc = async ()=>{  
    const {status} = await  Permissions.askAsync(Permissions.NOTIFICATIONS); 
    if(status !== 'granted'){  
      console.log("Status is not granted");
    } 
    let token = await Notifications.getExpoPushTokenAsync();  
    console.log("token is "+token);
    return fetch(PUSH_REGISTRATION_ENDPOINT,{ 
      method:'POST',
      headers:{ 
        'Accept':'application/json',
        'Content-Type':'application/json'
      }, 
      body:JSON.stringify({ 
        token:{ 
          value:token,
        }, 
        user:{ 
          username:'kunal',
          name:'Kunal Dubey'
        },
      }),
    }); 
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  } 
  handleNotification=(notification)=>{ 
    this.setState({notification});
  }
  handleAppStateChange=(appState)=>{ 
    if(appState=='background'){ 
      console.log('app is in background',this.state.seconds);
    }
  } 
  handleChangeText=(text)=>{ 
    this.setState({messageText:text});
  }  
  sendMessage = async()=>{ 
    fetch(MESSAGE_ENDPOINT,{ 
      method:'POST',
      headers:{ 
        Accept:'application/json',
        'Content-Type':'application/json',
      }, 
      body: JSON.stringify({ 
        message: this.state.messageText,
      }),
    }); 
    this.setState({messageText:''});
  }
  render(){  
    this.welcomeNotification();
    return (
      <View style={styles.container}>  
        <TextInput 
          value={this.state.messageText} 
          onChangeText={this.handleChangeText} 
          style={styles.textInput}
        /> 
        <TouchableOpacity  
          style={styles.button} 
          onPress={this.sendMessage}
        >  
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity> 
        {this.state.notification?this.renderNotificaiton():null}
      </View>
  );
  }
  
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent:'center', 
    alignItems:'center',
    paddingTop: 15, 
    backgroundColor: '#474747',
  }, 
  picker:{ 
    width:100,
  },   
  textInput:{ 
    height:50,
    width:300,
    borderColor:'#f6f6f6',
    borderWidth:1,
    backgroundColor:'#fff',
    padding:10
  },
  button:{ 
    padding:10
  },
  buttonText:{ 
    fontSize:18,
    color:'#fff' 
  }, 
  label:{ 
    fontSize:18
  }
});
