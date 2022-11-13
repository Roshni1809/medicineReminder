import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import Firebase from "../../config/firebase";

const auth = getAuth();

function RegisterScreen({ navigation }) {

  const [credencials, setCredencials] = useState({displayName:"", email:"", password:""});
  const [error, setError] = useState("")

  const handleCredencialChange = (type, value) => {
    
    if (error.length > 0) setError("")

    if (type === "name")
      setCredencials({...credencials, displayName:value})
    
    else if (type === "email") {
      setCredencials({...credencials, email: value})
    } else {  
      setCredencials({...credencials, password: value})
    }
  }

  const handleRegisterButton = async () => {
    const {email, password, displayName} = credencials
    if ( email.length === 0 || password.length === 0) {
      setError("Email or password can't be empty");
    } 
    
    else if (displayName.length < 3) 
      setError("Full Name should be atleat of 3 characters")

    else {
     
      try {
      
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {displayName})
       
       
        navigation.navigate("DetailScreen");
        setCredencials({email:"", password:""})

       
      } catch (error) {
       
       
        if (error.code === "auth/invalid-email")
          setError("Invalid Email Address")    
       
        else if(error.code === "auth/weak-password") 
          setError("Password should be at least 6 characters")

        else if(error.code === "auth/email-already-in-use")
          setError("Email Id already exists!!")

        else if(error.code === "auth/network-request-failed")
          setError("No internet Connection")
    }
  }
}

  const data = {
    btnText1: "Register",
    btnText2: "Already have an account? Login",
    navigate1: "",
    navigate2: ""

  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/loginIcon.jpg")} />

      <StatusBar style="auto" />
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Full Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => handleCredencialChange("name", name)}
        />
      </View>

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

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleRegisterButton()}>
        <Text style={styles.loginText}>
          {data.btnText1}
        </Text>
      </TouchableOpacity>
      <Text style={{color:"red",marginTop:5}}>{error}</Text>

      <TouchableOpacity style={styles.loginB} onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.text}>
          {data.btnText2}
        </Text>
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
    marginLeft: -20
  },

  inputView: {
    backgroundColor: "#EAE8EA",
    borderRadius: 30,
    width: "73%",
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
    //outlineStyle: "none"
  },

  forgot_button: {
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
  loginB: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  
  },
  loginText: {
    color: "white"
  },
  text: {
    fontSize:17,
    color: "#3846FE",
  }
});

export default RegisterScreen;