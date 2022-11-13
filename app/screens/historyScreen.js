import React, { useState,useEffect } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HistoryScreen = ({ navigation, route }) => {


  const [history, setHistory] = useState([])

  const { uid } = route.params
  useEffect(() => {
    async function getHistory() {
      try {
        const value = await AsyncStorage.getItem(uid)
        if (value !== null) {
          setHistory(JSON.parse(value))
        }
        else console.log("No recorde Found");
      } catch (e) {
        // error reading value
      }
    }
    getHistory()
  }, [])

  return (
    <SafeAreaView style={styles.background}>
      <View style={[styles.secondContent, styles.shadowProp]}>
        <Text style={styles.header}>
          Medication History
        </Text>
        {history.map(medicineList => (
          <View>
            <Text style={styles.hospitalName}>
              Hospital Name - {medicineList.hospitalName}
            </Text>
            <Text styles={styles.date}>
              Date - {moment(medicineList.date).format('DD/MM/YYYY')}
            </Text>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text styles={styles.head}>S.No</Text>
              <Text styles={styles.head}>Medicine</Text>
              <Text styles={styles.head}>Dose</Text>
              <Text styles={styles.head}>Time</Text>
            </View>
            {medicineList.medicineList.map( (med, idx) => (
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text styles={styles.head}>{idx+1}</Text>
              <Text styles={styles.head}>{med.medName}</Text>
              <Text styles={styles.head}>{med.dose}</Text>
              <Text styles={styles.head}>{moment(med.time).format('HH:mm')}</Text>
            </View>
            ))}
          </View>
        ))}

      </View>
      <View style={[styles.secondContentFooter, styles.shadowProp]}>
        <FontAwesomeIcon icon={faCalendarDays} color={'#6C76FE'} size={40} style={styles.iconOne} />
        <TouchableOpacity onPress={() => navigation.navigate("MedScreen")}>
          <FontAwesomeIcon icon={faCirclePlus} color={'#6C76FE'} size={40} style={styles.iconTwo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.iconThree}>
          <FontAwesomeIcon icon={faUser} color={'#6C76FE'} size={40} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HistoryScreen


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',



  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  secondContent: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: '#F3F1F3',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 28,
    width: '90%',
    marginTop: 210,
    marginLeft: 15,
    height: 300
  },
  secondContentFooter: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: '#F3F1F3',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 28,
    width: '100%',
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
  shadowProps: {
    shadowColor: 'black',
    // shadowOffset: {width: 5, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: 'grey',
  },

  loginBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#6C76FE",
  },
  loginText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",

  },
  medication: {
    margin: 3,
    fontSize: 17,
    fontWeight: "bold"
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 1,
    marginBottom: 5,


  },
  hospitalName: {
    fontSize: 14,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    marginBottom: 30,
  },
  head: {
    fontSize: 15,
    fontWeight: "bold",
  }

})