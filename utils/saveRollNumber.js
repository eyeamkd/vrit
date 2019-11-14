import AsyncStorage from 'react-native';
const ROLL_NUMBER = 'rollnumber'; 

setRollNumber = (rno) =>{ 
    AsyncStorage.setItem(ROLL_NUMBER,rno);  
    console.log("Roll number set");
} 

export default async function saveRollNumber(rollnumber){
    try{ 
        const isRollNumberSaved = await AsyncStorage.getItem(ROLL_NUMBER); 
        if(isRollNumberSaved===null){ 
            setRollNumber(rollnumber); 
            return true;
        } 
        return false;
    }catch(error){ 
        return false;
    }
}