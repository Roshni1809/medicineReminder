import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faTimes, faPencil } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { faCirclePlus, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import style from 'react-native-datepicker/style';
import { useEffect } from 'react/cjs/react.production.min';


export default function table({ medicineList, deleteMedicine, navigation }) {

  const tableHead = ['S.no', 'Medicine',"Dose", 'Time', 'Action']

  const [medicineTaken, setMedicineTaken] = useState([])

  const changeColor = (index) => {
    if (medicineTaken.includes(index)) {
      var medicineTook = medicineTaken.filter(med => med != index)
      setMedicineTaken(medicineTook)
    }
    else {
      setMedicineTaken([...medicineTaken, index])
    }
  }
  const actionComponent = (index, medicine) => (
    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: 40 }}>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => changeColor(index)}>
          <FontAwesomeIcon icon={faCircleCheck} color={medicineTaken.includes(index) ? '#0BDA51' : '#D3D3D3'} size={18} />
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => deleteMedicine(index)}>
          <FontAwesomeIcon icon={faTimes} size={18} />
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate("UpdateScreen", {
          medicine, index
        })} >
          <FontAwesomeIcon icon={faPencil} size={18} />
        </TouchableOpacity>

      </View>
    </View>
  )


  return (
    <SafeAreaView style={styles.container}>
      <Table borderStyle={{ borderColor: 'transparent' }}>
        <Text style={styles.header} >Medications to be taken today</Text>

        <Row data={ tableHead} style={styles.head} textStyle={styles.text} flexArr={[2, 5,2, 2, 4]}/>
        {
          medicineList.map((medicine, index) => (
            <TableWrapper key={index} style={styles.row}>
              <Cell data={index + 1} textStyle={styles.rowtext} />
              <Cell data={medicine.medName} textStyle={styles.rowtextMed} />
              <Cell data={medicine.dose} textStyle={styles.rowtextDose} />
              <Cell data={moment(medicine.time).format('HH:mm')} textStyle={styles.rowtextTime} />
              <Cell data={actionComponent(index, medicine)} textStyle={styles.rowtext}  />
            </TableWrapper>
          ))

        }
      </Table>
      <View style={[styles.secondContent, styles.shadowProp]}>
        <FontAwesomeIcon icon={faCalendarDays} color={'#6C76FE'} size={40} style={styles.iconOne} />
        <TouchableOpacity onPress={() => navigation.navigate("MedScreen")}>
          <FontAwesomeIcon icon={faCirclePlus} color={'#6C76FE'} size={40} style={styles.iconTwo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <FontAwesomeIcon icon={faUser} color={'#6C76FE'} size={40} style={styles.iconThree} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    padding: 5,
    paddingTop: 30,
    display: "flex",
    justifyContent: "space-between",
    marginTop: 60,
    width: '100%',
    // marginLeft:-10


  },
  action: {
    display: "flex",
    flexDirection: "row"
  },
  head: {
    height: 100,
    marginLeft: 10,
    // width: '100%',

  },
  text: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5
  },
  rowtext: {
    marginLeft: 25,
    fontSize: 14,
    color: "black",
  },
  rowtextMed: {
    marginLeft: -20,
    marginRight: -20,
    fontSize: 14,
    color: "black",
  },
  rowtextTime: {
    fontSize: 14,
    marginLeft: 5 ,
    color: "black",
  },
  rowtextDose: {
    fontSize: 14,
    marginLeft: 40 ,
    color: "black",
  },
  row: {
    flexDirection: 'row',
    fontSize: 16,
    color: "black",
  },
  btn: {
    width: 48,
    height: 18,
    marginLeft: -60

  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    marginLeft: 22,
    textDecorationLine: "underline"

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
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: 'grey',
  },
  secondContent: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: '#F3F1F3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 28,
    width: '100%',
  },

});