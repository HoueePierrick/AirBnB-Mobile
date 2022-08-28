import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, ActivityIndicator, SafeAreaView, Platform, Dimensions, TouchableOpacity, Image, TextInput, ScrollView} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Entypo } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import Constants from "expo-constants";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [description, setDescription] = useState("")
  const [password, setPassword] = useState("")
  const [passConfirm, setPassConfirm] = useState("")
  const [vispass, setVisPass] = useState(false)
  const [visConfirm, setVisConfirm] = useState(false)
  const [response, setResponse] = useState("")

  const manageSubmit = (email, userName, description, password) => {
    let success = false;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!reg.test(email)) {
      setResponse("Please provide a correct email")
    }
  }

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <ScrollView style={Platform.OS === "android" ? styles.android : styles.ios}>
          <View style={styles.imagecontainer}>
            <Image source={require("../assets/airbnb-logo.png")} style={styles.airbnblogo}></Image>
            <Text style={styles.pageTitle}>Sign up</Text>
          </View>
          <View style={styles.formcontainer}>
            <TextInput placeholder="email" style={styles.smallinput} onChangeText={text => {setEmail(text)}} value={email} autoCapitalize="none"/>
            <TextInput placeholder="username" style={styles.smallinput} onChangeText={text => {setUserName(text)}} value={userName}/>
            <TextInput placeholder="Describe yourself in a few words..." multiline={true} style={styles.largeinput} textAlignVertical="top"
            onChangeText={text => {setDescription(text)}} value={description}></TextInput>
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
            <View style={styles.passwordcontainer}>
              <TextInput placeholder="confirm password" secureTextEntry={!visConfirm ? true : false} style={styles.smallinput}
              onChangeText={text => {setPassConfirm(text);}} value={passConfirm}/>
              { 
                !visConfirm ?
                <Entypo name="eye" style={styles.icon} onPress={() => {setVisConfirm(true)}}></Entypo>
                :
                <Entypo name="eye-with-line" style={styles.icon} onPress={() => {setVisConfirm(false)}}></Entypo>
              }
            </View>
            {response ? <View style={styles.imagecontainer}><Text style={styles.error}>{response}</Text></View> : <View></View>}
            <View style={styles.imagecontainer}>
              <TouchableOpacity style={styles.signupbutton}
                onPress={async () => {manageSubmit(email, userName, description, password)
                  // const userToken = "secret-token";
                  // setToken(userToken);
                }}
              >
                <Text>Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imagecontainer}>
              <View style={styles.blackbar}></View>
            </View>
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
    height: Dimensions.get("window").height,
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
    marginTop: 30
  },
  smallinput: {
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
    height: 30,
    marginBottom: 20,
  },
  largeinput: {
    borderWidth: 1,
    borderColor: "#EB5A62",
    height: 90,
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 5
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
  signupbutton: {
    marginTop: 20,
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
  error: {
    color: "#F9575C",
    fontSize: 12,
    position: "relative",
    top: 25
  }
})