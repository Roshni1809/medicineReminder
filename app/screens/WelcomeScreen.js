import React from "react";
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";

function WelcomeScreen({ navigation }) {
  return ( 
    <SafeAreaView style={styles.background}>
       <Image style={styles.image} source={require("../../assets/mainScreen.jpg")} />
       <Text style={styles.subtitle}>We care for you..!!</Text>
      <View style={styles.loginButton}> 
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
       </View>
      <View style={styles.registerButton}>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.registerButtonText}>New User? Register here</Text>
        </TouchableOpacity>
      </View> 
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    backgroundColor:"white",
    
  },
  loginButton: {
    width: "85%",
    height: 45,
    backgroundColor: "#6C76FE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom:30
    
  },
  registerButton: {
    width: "85%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom:110
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: "10%",
  },
  subtitle: {
    color: "#3846FE",
    fontSize: 23,
    fontWeight: "bold",
    position: "absolute",
    top: "32%",
  },
  loginButtonText:{
    color:"white",
    fontSize:16
  },
  registerButtonText:{
    color: "#3846FE",
    fontSize:17
  },

  image:{
    width:150,
    height:150,
    position: "absolute",
    top: "8%",
    marginTop:25
  },
});

export default WelcomeScreen;
