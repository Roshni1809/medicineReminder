import React, { useState,  } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faUser, faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import DatePikerComponent from '../helpers/Calander';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';

function UpdateScreen({route, navigation}) {
  const { medicine, index} = route.params
  const [open, setOpen] = useState(false)
  const [med, setMed] = useState({medName: medicine.medName , dose: medicine.dose, startDate:medicine.startDate,endDate: medicine.endDate, time : medicine.time, eventId : medicine.eventId})
  
  const handleSubmitButton = () => {
    console.log("inside submit ");
    navigation.navigate({
      name: 'DetailScreen',
      params: { med, index },
      merge: true,
    });
  }

  const handleDateChange =  (date, id) => {
    if (id === 1) {
      setMed({...med, startDate:date})
    }
    else if(id ===2) {
      setMed({...med, endDate:date})
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={[styles.background, styles.shadowProp]}>
      <View style={styles.Content}>
        <Text style={styles.medication}>Update Medicine</Text>
        <View>
          <Text style={styles.placeText}>Enter Medicine name</Text>
          <View style={styles.imgText}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Medicine Name"
              placeholderTextColor="#003f5c"
              value={med.medName}
              onChangeText={e => setMed({ ...med, medName: e })}
            />
            {!index && <TouchableOpacity>
              <Image style={styles.image} source={require("../../assets/pickerIcon.png")} />
            </TouchableOpacity>
            }
          </View>

          <Text style={styles.placeText}>Enter the Dose</Text>
          <View style={styles.imgText}>

            <TextInput
              style={styles.TextInput}
              placeholder="Enter dose"
              placeholderTextColor="#003f5c"
              value={med.dose}
              onChangeText={e => setMed({ ...med, dose: e })}

            />
          </View>
          <Text style={styles.placeText}>start date</Text>
          <DatePikerComponent handleDateChange={handleDateChange} id={1} />
          <Text style={styles.placeText}>End date</Text>
          <DatePikerComponent handleDateChange={handleDateChange} id={2} />
          <Text style={styles.placeText}>Time to be Taken</Text>
          { open && <DateTimePicker
             value={new Date()}
             mode="time"
             is24Hour={true}
             display="default"
             onChange={(t, s) =>{
              setMed({...med, time:s})
              setOpen(false)
            }}
          /> }
          <TouchableOpacity onPress={() => setOpen(true)} style={{display:"flex", flexDirection:"row"}} >
          <View style={styles.imgText}>
            <TextInput
              style={{borderColor: "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
              width: 200,
              marginTop: 10,}}
              value={moment(med.time).format('HH:mm:ss')}
              editable={false}
            />
          </View>
          <FontAwesomeIcon icon={faClock} size={30} color={'#6C76FE'} style={styles.clock}/>
          </TouchableOpacity>
        </View>
        {/* <Button style={styles.button} onPress={() =>  handleSubmitButton() } title="Submit"></Button> */}
        <TouchableOpacity
           onPress={() =>  handleSubmitButton()}color={'#6C76FE'} title="Submit" style={styles.submit}>
             <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      </View>
      <View style={[styles.secondContent, styles.shadowProp]}>
        <FontAwesomeIcon icon={faCalendarDays} color={'#6C76FE'} size={40} style={styles.iconOne} />
        <TouchableOpacity onPress={() => navigation.navigate("MedScreen")}>
          <FontAwesomeIcon icon={faCirclePlus} color={'#6C76FE'} size={40} style={styles.iconTwo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.iconThree}>
          <FontAwesomeIcon icon={faUser} color={'#6C76FE'} size={40}  />
          </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
  )
};

export default UpdateScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white'


  },
  medication: {
    fontSize: 19,
    fontWeight: "bold",
    position: "relative",
    paddingBottom: 5,
    
  },
  notes: {
    fontSize: 19,
    fontWeight: "bold",
    position: "relative"
  },
  Content: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: '#F3F1F3',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    width: '94%',
    margin: 80,

  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  image: {
    width: 48,
    height: 48
  },
  submit:{
    width: "100%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C76FE",
    marginTop:15
  },
  submitText:{
    color:"white",
    fontSize:17,
    fontWeight:"bold",
    borderColor: "gray",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 5,
    borderWidth: 1,
    padding: 10,
    maxWidth: 245,
    fontSize: 17

  },
  imgText: {
    //   display:"flex",
    flexDirection: "row",
    alignItems: "center"
  },
  placeText: {
    fontSize: 17,
    marginTop: 5,
  },
  secondContent: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: '#F3F1F3',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 28,
    width: '100%',
    // marginTop:80
  },
  iconOne: {
    position: "relative",
    bottom: 15,
    right: 45,
    top: 1
  },
  iconTwo: {
    position: "relative",
    bottom: 15,
    top: 1
  },
  iconThree: {
    position: "relative",
    bottom: 15,
    left: 45,
    top: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  clock:{
    marginLeft:-28
  },
  button:{
    marginTop:10
  }
})