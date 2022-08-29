import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Platform, Dimensions, Image, TextInput, ScrollView} from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { useState } from "react";
import Constants from "expo-constants";
import axios from "axios";

export default function SignInScreen({ setToken }) {  
  const navigation = useNavigation();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [vispass, setVisPass] = useState(false)
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const manageSubmit = async(email, password) => {
    if(!email) {
      setResponse("Please provide an email")
    } else if(!password) {
      setResponse("Please provide a password")
    } else {
      try {
        setIsLoading(true)
        const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/log_in",
        {email: email, password: password})
        console.log(response.data)
        setToken(response.data.token)
        setIsLoading(false)
      } catch (error) {
        setResponse("Your email or password is wrong")
        setIsLoading(false)
      }
    }
  }

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <ScrollView style={Platform.OS === "android" ? styles.android : styles.ios}>
          <View style={styles.imagecontainer}>
            <Image source={require("../assets/Images/airbnb-logo.png")} style={styles.airbnblogo}></Image>
            <Text style={styles.pageTitle}>Sign in</Text>
          </View>
          <View style={styles.formcontainer}>
            <TextInput placeholder="email" style={styles.smallinput} onChangeText={text => {setEmail(text)}} value={email} autoCorrect={false} autoCapitalize="none"/>
            <View style={styles.passwordcontainer}>
              <TextInput placeholder="password" secureTextEntry={!vispass ? true : false} style={styles.smallinput} autoCorrect={false} autoCapitalize="none"
              onChangeText={text => {setPassword(text);}} value={password}/>
              { 
                !vispass ?
                <Entypo name="eye" style={styles.icon} onPress={() => {setVisPass(true)}}></Entypo>
                :
                <Entypo name="eye-with-line" style={styles.icon} onPress={() => {setVisPass(false)}}></Entypo>
              }
            </View>
            {response ? <View style={styles.imagecontainer}><Text style={styles.error}>{response}</Text></View> : <View></View>}
            <View style={styles.imagecontainer}>
              <TouchableOpacity style={styles.signinbutton} onPress={async () => {manageSubmit(email, password)}}>
                <Text>Sign in</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.imagecontainer}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.otherpage}>No account ? Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imagecontainer}>
            <View style={styles.blackbar}></View>
          </View>
          {isLoading && <View style={styles.loadmodal}>
            <ActivityIndicator style={styles.loading} size="large"></ActivityIndicator>
          </View>}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  android: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFFFFF",
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height
  },
  ios: {
    backgroundColor: "#FFFFFF",
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height
  },
  airbnblogo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginBottom: 20
  },
  imagecontainer: {
    alignItems: "center",
    marginTop: 20
  },
  pageTitle: {
    color: "#717171",
    fontSize: 20,
    fontWeight: "bold"
  },
  formcontainer: {
    paddingHorizontal: 20,
    marginTop: 100
  },
  smallinput: {
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
    height: 30,
    marginBottom: 20
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 10,
    fontSize: 20
  },
  passwordcontainer: {
    position: "relative"
  },
  signinbutton: {
    marginTop: 80,
    height: 40,
    width: 150,
    borderColor: "#EB5A62",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    color: "#CACACA",
  },
  otherpage: {
    color: "#A0A0A0",
    fontSize: 12,
    position: "relative",
    bottom: 10
  },
  blackbar: {
    backgroundColor: "black",
    width: 120,
    height: 5
  },
  loadmodal: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "red",
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height,
    paddingVertical: Dimensions.get("window").height / 2,
    zIndex: 2
  },
  loading: {
    zIndex: 3,
    position: "relative",
    height: 40,
  },
  error: {
    color: "#F9575C",
    fontSize: 12,
    position: "relative",
    top: 25
  }
})