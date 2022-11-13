import { SafeAreaView, View,Text, StyleSheet,TouchableOpacity,} from 'react-native';
import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Table from "./Table"
import * as Calendar from 'expo-calendar';
import moment from 'moment';


function DetailScreen({navigation, medicineList, deleteMedicine, updateMedicine, route}) {

  React.useEffect(() => {
    const updateReminder = async (med) => {
      const event = {
        startDate: Date.parse(`${med.startDate} ${moment(med.time).format('HH:mm:ss')}`),
        title: `Time to take ${med.dose} doses of ${med.medName}`,
        endDate: Date.parse(`${med.endDate} ${moment(med.time).format('HH:mm:ss')}`),
        allDay: false,
        notes : "It's time for you to take Medicine. Please go and take the medicine.",
        alarms : [{
          method: "ALARM",
          relativeOffset: -5
        }]        
      }
      try {
        const eventId = await Calendar.updateEventAsync(med.eventId, event)      
      }
      catch (error) {
        console.log(error)
      }
    }
    if (route?.params?.med) {
      const {med, index} = route.params
      console.log(med, index);
      updateMedicine(med, index)
      updateReminder(med)
    }
  }, [route?.params?.med]);
    
  return (
      <SafeAreaView style={styles.background}>
        {medicineList.length ===0?
         (<View style={styles.noMed}>
          <Text style={styles.heading}>No medications added,   would you like to create one?</Text>
          <Text style={styles.create} onPress={() => navigation.navigate("CreateScreen", {index:0})}>CREATE</Text>
        </View>)
        :
        (<View>         
          <Table navigation = {navigation} medicineList={medicineList} deleteMedicine={deleteMedicine} updateMedicine={updateMedicine}/>
        </View>
        )
       }
        <View style={[styles.secondContent, styles.shadowProp]}>
        <FontAwesomeIcon icon={faCalendarDays} color={ '#6C76FE' } size={40}  style={styles.iconOne}/>
        <TouchableOpacity onPress={() => navigation.navigate("MedScreen")}>
          <FontAwesomeIcon icon={faCirclePlus} color={ '#6C76FE' } size={40}  style={styles.iconTwo}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.iconThree}>
          <FontAwesomeIcon icon={faUser} color={'#6C76FE'} size={40}  />
          </TouchableOpacity>
        
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent:"space-between",
    backgroundColor:"white",
    
  },

  secondContent:{
   display:"flex",
   justifyContent:"space-around",
   flexDirection:"row",
   backgroundColor: '#F3F1F3',
   borderRadius: 5,
   paddingVertical: 15,
   paddingHorizontal: 28,
   width: '100%',
  },
  icon:{
    color:"blue"
  },
  heading:{
    position:"relative",
    top:90,
    right:10,
    fontSize: 20,
    fontWeight: "bold",
    marginRight:20,
    marginLeft:20

  },
  create:{
    position:"relative",
    top:120,
    marginLeft:250,
    fontSize: 18,
    fontWeight: "bold",
  },
  iconOne:{
    position:"relative",
    bottom:15,
    right:45,
    top:1
  },
  iconTwo:{
    position:"relative",
    bottom:15,
    top:1
  },
  iconThree:{
    position:"relative",
    bottom:15,
    left:45,
    top:1
    },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: 'grey',
  },
  noMed:{
    marginTop:187,
    marginLeft:5,
    marginRight:5
  }
});

export default DetailScreen ;