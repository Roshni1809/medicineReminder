import React,{ useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity,StyleSheet,Image } from 'react-native';

//Importing Firebase SignIn Functions
import { getAuth, signOut } from 'firebase/auth';

//Importing Firebase Configuration
import Firebase from "../../config/firebase";

//Initializating authentication
const auth = getAuth();

const ProfileScreen = ({navigation, user}) => {

  const handlelogout = async () => {
    try {
        
      await signOut(auth);
      navigation.navigate("Home");
    }
    catch ( error) {
    if(error.code === "auth/network-request-failed")
          setError("No internet Connection") 
    else setError(error.code)
    }
  }

  return (
 
    <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <Text style={styles.name}>{user?.displayName} </Text>
                <Text style={styles.userInfo}>{user?.email} </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Home</Text>
              </View>
            </View>
            
            
              <View style={styles.item}>
              <View style={styles.infoContent}>
              <TouchableOpacity
                onPress={() => navigation.navigate("HistoryScreen", {uid:user.uid})}>
                <Text style={styles.info}>Medication History</Text>
                </TouchableOpacity>

              </View>
            </View>
           

            <View style={styles.item}>
             
              <View style={styles.infoContent}>
                <TouchableOpacity onPress={handlelogout}>
                <Text style={styles.info}>Log Out</Text>

                </TouchableOpacity>
              </View>
            </View>

          </View>
      </View>
      </SafeAreaView>
  
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#DCDCDC",
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"black",
        fontWeight:'600',
      },
      userInfo:{
        fontSize:16,
        color:"black",
        fontWeight:'600',
      },
      body:{
        backgroundColor: '#F3F1F3',
        height:700,
        alignItems:'center',
       
      },
      item:{
        flexDirection : 'row',
      },
      infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
      },
      iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
        color:"black"
      },
      icon:{
        width:30,
        height:30,
        marginTop:20,
      },
      info:{
        fontSize:18,
        marginTop:20,
        color:"black",
      }
 
   

  
})