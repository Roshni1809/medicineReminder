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
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

//Importing Firebase Configuration
import Firebase from "../../config/firebase";

//Initializating authentication
const auth = getAuth();



function ForgetScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("")
    const [resetLinkSent, setResetLinkSent] = useState(false)


    const handleEmailChange = (email) => {
        if (error.length > 0) setError("")
        setEmail(email)
    }
    
    const handlePasswordReset = async () => {
        
        try {
           
            await sendPasswordResetEmail(auth, email)
            
            setResetLinkSent(true)
            setEmail("")
        } catch (error) {
           
            if (error.code === "auth/invalid-email")
                setError("Invalid Email Id")
            
            else if (error.code === "auth/network-request-failed")
                setError("No internet Connection")
            else if( error.code === "auth/user-not-found")
                setError("User Not Found")
        }
    };

    if (resetLinkSent) {

        return (
            <View style={styles.container}>
                <Text style={styles.registerButtonText}>Password Link has been Sent to Email </Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Go Back To Login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    else {
        return (

            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/loginIcon.jpg")} />

                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter Valid Email"
                        placeholderTextColor="#003f5c"
                        value={email}
                        onChangeText={(email) => handleEmailChange(email)}
                    />
                </View>
                <TouchableOpacity onPress={handlePasswordReset} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Reset Password</Text>
                </TouchableOpacity>
                <Text style={styles.errorMsg}>{error}</Text>
            </View>

        );
    }
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
    loginText: {
        color: "white",
        //  marginTop:30
    },
    errorMsg: {
        color: "red",
        marginTop: 10,
    },
    registerButtonText: {
        marginTop: 30,
        color: "#3846FE",
        fontSize: 17
    },
});

export default ForgetScreen;