import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Platform, Dimensions, Image, TextInput, ScrollView} from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import Constants from "expo-constants";

export default function SignInScreen({ setToken }) {  
  const navigation = useNavigation();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [vispass, setVisPass] = useState(false)
  const [response, setResponse] = useState("")

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <ScrollView style={Platform.OS === "android" ? styles.android : styles.ios}>
          <View style={styles.imagecontainer}>
            <Image source={require("../assets/airbnb-logo.png")} style={styles.airbnblogo}></Image>
            <Text style={styles.pageTitle}>Sign in</Text>
          </View>
          <View style={styles.formcontainer}>
            <TextInput placeholder="email" style={styles.smallinput} onChangeText={text => {setEmail(text)}} value={email}/>
            <View style={styles.passwordcontainer}>
              <TextInput placeholder="password" secureTextEntry={!vispass ? true : false} style={styles.smallinput} 
              onChangeText={text => {setPassword(text);}} value={password}/>
              { 
                !vispass ?
                <Entypo name="eye" style={styles.icon} onPress={() => {setVisPass(true)}}></Entypo>
                :
                <Entypo name="eye-with-line" style={styles.icon} onPress={() => {setVisPass(false)}}></Entypo>
              }
            </View>
            <View style={styles.imagecontainer}>
              <TouchableOpacity style={styles.signinbutton}
                onPress={async () => {
                  const userToken = "secret-token";
                  setToken(userToken);
                }}
              >
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
  }
})

// borderWidth: 1,
// borderColor: "red"