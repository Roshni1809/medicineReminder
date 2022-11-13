import { Text, View, SafeAreaView, TouchableOpacity,StyleSheet, } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function CreateScreen ({navigation}) {
  const data={
    header:"Please Choose one of the following",
    options:[
      { head:"Scan Prescription/ Medicine",
        screen:"CreateScreen"},
      { head:"Add Medications Manually",
      screen:"CreateScreen"},
    {  head:"Add Notes or Events",
    screen:"NotesScreen"}
    
    ]
  }
    return (
        <SafeAreaView style={[styles.background, styles.shadowProp]}>
        <Text style={styles.text}>Please Choose one of the following</Text>
        <View style={styles.Content}>
        {/* <TouchableOpacity onPress={() => navigation.navigate("CreateScreen")}>
          <Text style={styles.notes}>Scan Prescription</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MedScreen")}>
          <Text style={styles.medication}>Add Medications Manually</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("NotesScreen")}>
          <Text style={styles.notes}>Scan Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("NotesScreen")}>
          <Text style={styles.notes}>Add Notes or Events</Text>
          </TouchableOpacity> */}
          {data.options.map((item,index)=>(
          <TouchableOpacity key={index} onPress={() => navigation.navigate(item.screen, {index})}>
          <Text style={styles.notes}>{item.head}</Text>
          </TouchableOpacity>

          ))}
        </View>

        <View style={[styles.secondContent, styles.shadowProps]}>
        <FontAwesomeIcon icon={faCalendarDays} color={ '#6C76FE' } size={40}  style={styles.iconOne}/>
        <TouchableOpacity onPress={() => navigation.navigate("MedScreen")}>
          <FontAwesomeIcon icon={faCirclePlus} color={ '#6C76FE' } size={40}  style={styles.iconTwo}/>
          </TouchableOpacity>
        <FontAwesomeIcon icon={faUser} color={ '#6C76FE' } size={40}  style={styles.iconThree}/>
        </View>
      </SafeAreaView>
    )
};

export default CreateScreen;

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:'space-between',
        backgroundColor:'white'
        

    },
    medication:{
        fontSize:19,
        fontWeight:"bold",
        position:"relative",
        paddingBottom:8,
        paddingTop:8
    },
    text:{
        fontSize:22,
        fontWeight:"bold",
        position:"relative",
        paddingBottom:2,
        marginTop:170,
        marginLeft:15,
        marginRight:10
        
    },
    notes:{
        fontSize:19,
        fontWeight:"bold",
        position:"relative",
        paddingTop:8,
        paddingBottom:8
    },
    Content:{
        marginLeft:"auto",
        marginRight:"auto",
        backgroundColor: '#F3F1F3',
        borderRadius: 10,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '94%',
        marginVertical: 10,
        marginTop:-160

    },

    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,
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
      shadowProps: {
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 20,
        shadowColor: 'grey',
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
    
})