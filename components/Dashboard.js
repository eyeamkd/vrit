import React from 'react'; 
import {View, Text, StyleSheet , ActivityIndicator, FlatList} from 'react-native';   
import ProgressCircle from 'react-native-progress-circle'; 
import { BarChart, Grid , YAxis } from 'react-native-svg-charts'
import AsyncStorage from 'react-native';

const fill = 'rgb(134, 65, 244)' 
const data   = [ 7, 7, 7, 6, 7, 6, 7, 7, 6, 7, 7, 6, 7, 7, 7, 7, 7 ] 
const YAxisData = [0,1,2,3,4,5,6,7]
let userInfoObject = null;
export default class Dashboard extends React.Component{   
    // getRollNumber= async ()=>{  
    //     try{ 
    //         const rno = await AsyncStorage.getItem('rollnumber'); 
    //         if(rno!=null){ 
    //             this.setState({ 
    //                 rollNumberPresent:true, 
    //                 rollnumber:rno
    //             }); 
    //             getUserInfo(rno);
    //         } 
    //         else{ 
    //             console.log("Roll number not present in async storage");
    //         }
    //     }catch(err){  
    //         console.log(err);
    //     }
    // } 
    constructor(props){  
        super(props);
        this.state={ 
            rollNumberPresent:false,
            rollnumber:'', 
            name:'',
            surname:'',
            attendance:'',
            pollsConducted:0,
            dataLoaded:false,
            color:'red',
            pollsParticipated:0
        } 
    }  
    componentDidMount(){ 
        fetch('http://192.168.43.108:3000/users/info/16P61A1233')
        .then((resp)=>resp.json()) 
        .then((respjson)=>{ this.setState({ 
            name:respjson.name, 
            surname:respjson.surname, 
            dataLoaded:true, 
            attendance:respjson.attendance,
            pollsConducted:respjson.pollsConducted,   
            pollsConducted:respjson.pollsConducted,  
            pollsParticipated:respjson.pollsParticipated
            });  
            if(this.state.attendance>75) 
                this.setState({color:'green'}) ;
            else if(this.state.attendance>=65) 
            this.setState({color:'yellow'}) ;
            else this.setState({color:'red'}) ;
        })
        .catch(err=>{ 
            console.log(err);   
        }) 
        
    } 
    getColor=()=>{ 
        
    }
    render(){  
            if(this.state.dataLoaded){ 
                return( 
                    <View style= {styles.container}>   
                        <View style={styles.heading}>  
                            <Text style={{fontSize:30,fontWeight:'500', textAlign:'left' }} >Hey {this.state.name}!!</Text> 
                        </View>  
                        <Text style={{fontSize:15,fontWeight:'500', textAlign:'left' , marginBottom:20}} >Your Attendance:</Text>  
                        <View style={{paddingLeft:70}}>  
                            <ProgressCircle
                                percent={this.state.attendance}
                                radius={100}
                                borderWidth={8}
                                color={this.state.color}
                                shadowColor=""
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 18 }}>{`${this.state.attendance}%`}</Text>
                            </ProgressCircle>  
                        </View> 
                            <Text style={{fontSize:15,fontWeight:'500', textAlign:'left' , marginBottom:20}} >Your Recent Attendance Activity:</Text>   
                            <View style={{height:200, flexDirection:'row',marginBottom:20}}>
                                <YAxis
                                data={ data }
                                contentInset={ { top:7, bottom:0 } }
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }} 
                                numberOfTicks={8}
                                />
                                <BarChart
                                style={{ flex:1,marginLeft:16 }}
                                data={ data }
                                svg={{ fill }}
                                contentInset={{ top: 7, bottom: 0 }} 
                                showGrid={false}
                                >
                                </BarChart>
                            </View>  
                            <Text style={{fontSize:15,fontWeight:'500', textAlign:'left' , marginBottom:20}} >{`Number of polls conducted by you:${this.state.pollsConducted}`}</Text>  
                            <Text style={{fontSize:15,fontWeight:'500', textAlign:'left' , marginBottom:20}} >{`Number of polls in which you have participated:${this.state.pollsParticipated}`}</Text>  
                    </View>
                )
            }else { 
                return( 
                    <ActivityIndicator/>
                );
            }
        }
    } 
const styles = StyleSheet.create({ 
    container:{ 
        flex:1,
        alignContent:'flex-start',
        alignItems:'flex-start',
        paddingLeft:20
    }, 
    heading:{   
        marginBottom:20
    }
})