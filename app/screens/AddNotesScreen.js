import React ,{ useState }from 'react'
import { Text, View, SafeAreaView, TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';


const NotesScreen = ({ addNotes, navigation}) => {

const [note, setNote] = useState({title:"", desc:""})

  const handleSubmit = () => {
    addNotes(note)
    navigation.navigate("NotesScreen")
  }
    
  return (
    <SafeAreaView style={styles.background}>
        <View style={[styles.secondContent, styles.shadowProp]}>
                <TextInput
                    placeholder="Add Note Title here"
                    placeholderTextColor="#003f5c"
                    style={styles.title}
                    value = {note.title}
                    onChangeText = {text => setNote({...note, title:text})}
                />
                <TextInput
                    placeholder="Add Description here"
                    placeholderTextColor="#003f5c"
                    multiline={true}
                    style={styles.text}
                    scrollEnabled={true}
                    returnKeyLabel='done'
                    blurOnSubmit={true}
                    value = {note.desc}
                    onChangeText = {text => setNote({...note, desc:text})}
                />
          
          
          <TouchableOpacity
           onPress={() => handleSubmit()} 
          style={styles.loginBtn}>
             <Text style={styles.loginText}>Add Notes</Text>
      </TouchableOpacity>

        </View>
        <View style={[styles.secondContentFooter, styles.shadowProp]}>
        <FontAwesomeIcon icon={faCalendarDays} color={ '#6C76FE' } size={40}  style={styles.iconOne}/>
        <TouchableOpacity >
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
      backgroundColor:'white',
  },
  shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 3,
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
      marginTop:100,
    
     
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
      shadowOffset: {width: 3, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 10,
      shadowColor: 'grey',
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
      marginTop:250,
      marginLeft:15,
      
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
     borderColor: "gray"
    },
    text: {
      height: 80,
      fontSize: 16,
      borderRadius:2,
      paddingTop:5,
      borderColor: "gray"
  

  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    
},

  
})