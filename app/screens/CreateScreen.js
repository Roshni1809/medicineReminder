import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faUser, faCalendarDays, faPlus, faClock } from '@fortawesome/free-solid-svg-icons';
import DatePikerComponent from '../helpers/Calander';
import * as Calendar from 'expo-calendar';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';

function CreateScreen({ navigation, addMedicineList, route, saveMedicineListToDb }) {
  const { index } = route.params
  const [hospitalName, setHospitalName] = useState("")
  const [med, setMed] = useState({ medName: "", dose: "", time: new Date(), startDate: new Date(), endDate: new Date() })
  const [open, setOpen] = useState(false)

  
  const createEvent = async () => {
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
      console.log(event.startDate, event.endDate);
      const eventId = await Calendar.createEventAsync("1", event)
      return eventId
    
    }
    catch (error) {
      console.log(error)
      return null
    }
  }

  const handleSubmitButton = async () => {
    const eventId = await createEvent()
    if(eventId) {
      addMedicineList(med, eventId)
      setMed({medName: "", dose: "", time: new Date(), startDate: new Date(), endDate: new Date(), time: new Date() })
    }
  }
  const handleFinalSubmit = () => {
    saveMedicineListToDb(hospitalName)
    navigation.navigate("DetailScreen")
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
          <Text style={styles.medication}>Woooh!!! You are one step away from getting Reminders.</Text>
          <View>
            
              </View>
          <View>
      
            <Text style={styles.placeText}>Enter Hospital name</Text>
            <View style={styles.imgText}>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter Hospital Name"
                placeholderTextColor="#003f5c"
                 value={hospitalName}
                 onChangeText={e => setHospitalName(e)}
              />
              </View>
            <Text style={styles.placeText}>Enter Medicine name</Text>
            <View style={styles.imgText}>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter Medicine Name"
                placeholderTextColor="#003f5c"
                value={med.medName}
                onChangeText={e => setMed({ ...med, medName: e })}
              />
              {!index && <TouchableOpacity onPress={()=> navigation.navigate("ImagePicker")}>
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
           
            <Text style={styles.placeText}>Start Date</Text>
            <DatePikerComponent handleDateChange={handleDateChange} id={1} />
            <Text style={styles.placeText}>End Date</Text>
            <DatePikerComponent handleDateChange={handleDateChange} id={2} />
            <Text style={styles.placeText}>Time to be Taken</Text>
            { open && <DateTimePicker
               value={med.time}
         
               mode="time"
               is24Hour={false}
               display="default"
               onChange={(t, s) =>{
                setMed({...med, time:s})
                setOpen(false)
                console.log(moment(s).format('HH:mm:ss'))
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
            <FontAwesomeIcon icon={faClock}  size={30} color={'#6C76FE'} style={styles.clock}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => { handleSubmitButton() }} >
            <FontAwesomeIcon icon={faCirclePlus} color={'#6C76FE'} size={25} style={styles.add}/>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={() => handleFinalSubmit()}color={'#6C76FE'} title="Submit" style={styles.submit}>
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

export default CreateScreen;

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white'

  },
  medication: {
    fontSize: 16,
    fontWeight: "bold",
    position: "relative",
    paddingBottom: 5,
    marginTop:60
  },
  notes: {
    fontSize: 16,
    fontWeight: "bold",
    position: "relative"
  },
  Content: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: '#F3F1F3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 350,
    // margin: "auto",

  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  image: {
    width: 45,
    height: 45
  },
  TextInput: {
    height: 40,
    flex: 1,
    padding: 10,
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    // marginLeft: 5,
    borderWidth: 1,
    padding: 10,
    maxWidth: 240,
    fontSize: 17,
    // width:75,
    color: "black",


  },
  imgText: {
    //   display:"flex",
    flexDirection: "row",
    alignItems: "center"
  },
  placeText: {
    fontSize: 16,
    marginTop: 2
  },
  secondContent: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: '#F3F1F3',
    borderRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 28,
    // width: '100%',
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
    width: 100,
    // marginTop: 5,
    fontSize:10
  },
  add:{
  marginTop:20,
  marginLeft:150,
  marginBottom:20
  },
  submit:{
    width: "100%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C76FE",
  },
  submitText:{
    color:"white",
    fontSize:17,
    fontWeight:"bold",
    borderColor: "gray",
  },
  hospitalText:{
    fontSize: 16,
    marginTop: 2
  },
  hospitalTextInput:{
    height:40,
  },
  clock:{
    marginLeft:-28
  }
})