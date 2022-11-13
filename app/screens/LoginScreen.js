import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";


//Importing Firebase SignIn Functions
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

//Importing Firebase Configuration
import Firebase from "../../config/firebase";

//Initializating authentication
const auth = getAuth();

function LoginScreen({navigation}) {
 
  const [credencials, setCredencials] = useState({email:"", password:""});
  const [error, setError] = useState("")

  const handleCredencialChange = (type, value) => {
    if (error.length > 0) setError("")
    
    if (type === "email") {
      setCredencials({...credencials, email: value})
    } else {    
      setCredencials({...credencials, password: value})
    }
  }


  const  handleLoginButton = async () => {
    
    const {email, password}  = credencials
    
    //Checking if email or password field is empty
    if ( email.length === 0 || password.length === 0) {
      setError("Email or password can't be empty");
    } else {
      
      try {
        
        //Sending email and password to firebase for authentication
        await signInWithEmailAndPassword(auth, email, password);
        
        //If authentication is successful, navigate to Detail Screen
        navigation.navigate("DetailScreen");
        setCredencials({email:"", password:""})
        
      } catch (error) {
        
        //If authentication display error to user
        if(error.code ===  "auth/invalid-email" || error.code === "auth/wrong-password")
          setError("Invalid email or password")
        
        else if(error.code === "auth/network-request-failed")
          setError("No internet Connection") 

        else if( error.code === "auth/user-not-found")
          setError("User Not Found")

    }
  }
  }
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/loginIcon.jpg")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={credencials.email}
          onChangeText={(email) => handleCredencialChange("email", email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={credencials.password}
          onChangeText={(password) => handleCredencialChange("password", password)}
        />
      </View>
 
      <TouchableOpacity onPress={() => navigation.navigate("ForgetScreen")}>
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity onPress={handleLoginButton} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.errorMsg}>{error}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.registerButtonText}>New User? Register here</Text>
        </TouchableOpacity>
    </View>
    
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width: 150,
    height: 150,
    marginLeft:-20
  },
 
  inputView: {
    backgroundColor: "#EAE8EA",
    borderRadius: 30,
    width: "72%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
   
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 15, 
    width: "90%",
    //outlineStyle: 'none'
  },
  
 
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#6C76FE",
  },
  loginText:{
   color:"white",
  //  marginTop:30
  },
  errorMsg:{
    color:"red",
     marginTop:10, 
  },
  registerButtonText:{
    marginTop: 30,
    color: "#3846FE",
    fontSize:17
  },
});

export default LoginScreen;