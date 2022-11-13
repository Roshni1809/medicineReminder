import React,{ useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity,StyleSheet, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';


const NotesScreen = ({navigation, notes, deleteNotes}) => {
  return (
    <SafeAreaView style={styles.background}>
        <View style={[styles.secondContent, styles.shadowProp]}>
         { notes.length ===0 ?(
          <Text style={styles.medication}>Have a habit of forgetting things, Save it here</Text>
          ) :(
              notes.map( (note, idx) => (
                <View key={idx} style={{display:"flex"}}>
                  <View key={idx}>
                    <Text style={styles.title}>{note.title}</Text>
                    <Text style={styles.desc}>{note.desc}</Text>
                   
                    <TouchableOpacity style={styles.cross} onPress={() => deleteNotes(idx)}>
                      <Text>X</Text>
                    </TouchableOpacity>
                 
                  </View>
                 
                </View>
              ))
            )
         }
          
          <TouchableOpacity onPress={() => navigation.navigate("AddNotesScreen")}
         
          style={styles.loginBtn}>
             <Text style={styles.loginText}>Add Notes Here</Text>
          </TouchableOpacity>

        </View>
        <View style={[styles.secondContentFooter, styles.shadowProp]}>
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

export default NotesScreen

const styles = StyleSheet.create({
  background:{
      flex:1,
      justifyContent:'space-between',
      backgroundColor:'white'
      

  },
  title:{
    fontSize:18,
    fontWeight:"bold"
  },
  desc:{
    fontSize:16,
    marginTop:5
  },


  shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
    secondContent:{
      display:"flex",
      justifyContent:"space-around",
      flexDirection:"column",
      backgroundColor: '#F3F1F3',
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 28,
      width: '90%',
      marginTop:300,
      marginLeft:15
     },
     secondContentFooter:{
      display:"flex",
      justifyContent:"space-around",
      flexDirection:"row",
      backgroundColor: '#F3F1F3',
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 28,
      width: '100%',
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
      marginTop: 40,
      backgroundColor: "#6C76FE",
    },
    loginText:{
     color:"white",
     fontSize:17,
     fontWeight:"bold",
     
    },
    medication:{
      margin:3,
      fontSize:17,
      fontWeight:"bold"
    },
   cross:{
    marginTop:-30,
    alignSelf:"flex-end"
   }

  
})