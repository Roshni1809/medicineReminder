import React, {useState, useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import DetailScreen from "./app/screens/DetailScreen";
import CreateScreen from './app/screens/CreateScreen';
import MedScreen from './app/screens/MedScreen';
import NotesScreen from './app/screens/NotesScreen';
import ForgetScreen from "./app/screens/ForgetScreen";
import AddNotesScreen from "./app/screens/AddNotesScreen"
import UpdateScreen from "./app/screens/UpdateScreen";
import * as Calendar from 'expo-calendar';
import ImagePickerComponent from "./app/screens/ImagePicker";
import ProfileScreen from "./app/screens/ProfileScreen";
import HistoryScreen from "./app/screens/historyScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import Firebase from "./config/firebase";
const auth = getAuth();
const Stack = createNativeStackNavigator();

export default function App() {
  const [notes, setNotes] = useState([]);  
  const [medicineList, setMedicineList] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    (async () => {

      const { status } = await Calendar.requestCalendarPermissionsAsync();
    })();
  }, []);

  onAuthStateChanged(auth, (user) => {
    if(user) setUser(user)
  })    
  
  async function saveMedicineListToDb(hospitalName) {
      const medHistory = {
        hospitalName,
        date: new Date(),
        medicineList
      }
      try {
        const value = await AsyncStorage.getItem(user.uid)
        if(value !== null) {
          const historyArray = JSON.parse(value)
          historyArray = [...historyArray, medHistory]
        }
        else {
          historyArray = [medHistory]
        }
        const historyArrayJson = JSON.stringify(historyArray)
        await AsyncStorage.setItem(user.uid, historyArrayJson)
        console.log("data Saved");
      } catch (e) {
        console.log("Error while saving medicine to local storage");
      }
    }

    const addMedicineList = (newMed, eventId)=> {
      newMed.eventId = eventId
      console.log(newMed)
      setMedicineList([...medicineList, newMed])
    }

    const updateMedicine = (updatedMed, index) => {
      const updatedList = medicineList.map( (med, idx) => idx === index? updatedMed:med)
      setMedicineList(updatedList)
    }

    const deleteMedicine = async (index) => {
      const copyMedList = [...medicineList]
      const medTobeDeleted = copyMedList.splice(index, 1)
      setMedicineList(copyMedList)
      Calendar.deleteEventAsync(medTobeDeleted[0].eventId)
    }
   
  const addNotes = ({title, desc})=> {
    const newNotes = {
      id : notes.length + 1,
      title,
      desc
    }
    setNotes([...notes, newNotes])
  }

  const deleteNotes = (id) => {
    var newNotes = [...notes]
    newNotes.splice(id, 1)
    setNotes(newNotes)
  }
return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          // options={{ title: 'Welcome' }}
          
        />
         <Stack.Screen name="HistoryScreen">
         { (props) => <HistoryScreen {...props} medicineList={medicineList}/>}
         </Stack.Screen>
        <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        />
         <Stack.Screen 
        name="UpdateScreen" 
        component={UpdateScreen} 
        />
       <Stack.Screen 
        name="RegisterScreen" 
        component={RegisterScreen} 
        />
        <Stack.Screen name="DetailScreen" >
        { (props) => <DetailScreen {...props} medicineList={medicineList} deleteMedicine={deleteMedicine} updateMedicine={updateMedicine}/>}
        </Stack.Screen>
      <Stack.Screen 
        name="MedScreen" 
        component={MedScreen} 
        />
        <Stack.Screen name="ProfileScreen"  >
      { (props) => <ProfileScreen {...props} user={user}/>}
      </Stack.Screen>      
      <Stack.Screen
       name="CreateScreen"
        >
      { (props) => <CreateScreen {...props} addMedicineList={addMedicineList} saveMedicineListToDb={saveMedicineListToDb}/>}
      </Stack.Screen>
      <Stack.Screen name="NotesScreen" >
        { (props) => <NotesScreen {...props} notes={notes} deleteNotes={deleteNotes} />}
        </Stack.Screen>
        <Stack.Screen 
        name="ForgetScreen" 
        component={ForgetScreen} 
        />
        <Stack.Screen name="AddNotesScreen" >
        { (props) => <AddNotesScreen {...props} addNotes={addNotes} />}
        </Stack.Screen>
        <Stack.Screen 
        name="ImagePicker" 
        component={ImagePickerComponent} 
        />
       
        
      </Stack.Navigator>

  </NavigationContainer>
  );
}


