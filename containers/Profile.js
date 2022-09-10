import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker"
import { createPortal } from "react-dom";

// 1- work on the image
  // C- Upload

export default function SettingsScreen({ setToken, userToken }) {
  // setToken use to add or remove token => null to erase it
  // userToken stocks the token (object containing the token and the userID)
  const navigation = useNavigation()
  
    // states to stock the data 
  const [photo, setPhoto] = useState(null)
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [username, setUserName] = useState("")
  const [isLoadinData, setisLoadinData] = useState(true)
  const [isUpdatinData, setisUpdatinData] = useState(false)

  let config = {
    headers: { Authorization: `Bearer ${userToken.token}` }
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`https://express-airbnb-api.herokuapp.com/user/${userToken.id}`,
        config)
        console.log(photo)
        setPhoto(response.data.photo.url)
        setEmail(response.data.email)
        setDescription(response.data.description)
        setUserName(response.data.username)
        setisLoadinData(false)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchData()
  }, [update])

  const update = async() => {
    setisUpdatinData(true)
      try {
        let updatingdata = {email: email, description: description, username: username}
        const response = await axios.put("https://express-airbnb-api.herokuapp.com/user/update", 
        updatingdata, config)
      } catch (error) {
        console.log(error.response.data.error)
      }
      if(photo) {
        try {
          const tab = photo.split(".")
          const extension = tab[tab.length - 1]
          const formData = new FormData()
          formData.append("photo", {
            uri: photo,
            name: `profilepicture.${extension}`,
            type: `image/${extension}`
          })
          config = {headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken.token}`
          }}
          console.log(formData)
          console.log(userToken.token)
            const uploadres = await axios.put("https://express-airbnb-api.herokuapp.com/user/upload_picture",
            formData, config)
        if(uploadres.data) {
          setisUpdatinData(false)
          alert("evrything is updated")
        }
        } catch (error) {
          console.log(error.response.data.error)
          setisUpdatinData(false)
        }
      } else {
        setisUpdatinData(false)
      }
    // Add picture params / complexify
  }

  const fromGallery = async() => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if(result.cancelled === false) {
        setPhoto(result.uri)
      } else {
        alert("No picture uploaded")
      }
    } else {
      alert("We can't add any picture from your gallery if you don't allow us to access it")
    }
  }

  const fromCamera = async() => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if(status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if(result.cancelled === false) {
        setPhoto(result.uri)
      } else {
        alert("No picture uploaded")
      }
    } else {
      alert("We can't add any picture from your gallery if you don't allow us to access it")
    }
  }

  return (!isLoadinData && !isUpdatinData) ? (
    <View style={styles.white}>
      <View style={styles.header}>
        <View style={styles.imagecontainer}>
          <Image source={require("../assets/Images/airbnb-logo.png")} style={styles.airbnblogo}></Image>
        </View>     
      </View>
      <View style={styles.imagemanager}>
        <View style={styles.imagecircle}>
          {!photo ?
            <Ionicons name="person" size={120} color="#E7E7E7" style={styles.greypers}/>
          :
            <Image source={{uri: photo}} style={styles.profilephoto}></Image>
          }
        </View>
        <View style={styles.imagebuttons}>
          <TouchableOpacity onPress={fromGallery}>
            <Ionicons name="md-images" size={30} color="#717171" />
          </TouchableOpacity>
          <TouchableOpacity onPress={fromCamera}>
            <Entypo name="camera" size={30} color="#717171" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.alltext}>
        <TextInput placeholder="email" style={styles.smallinput} onChangeText={text => {setEmail(text)}} value={email} autoCapitalize="none" autoCorrect={false}/>
        <TextInput placeholder="username" style={styles.smallinput} onChangeText={text => {setUserName(text)}} value={username}  autoCorrect={false} autoCapitalize="none"/>
        <TextInput placeholder="Describe yourself in a few words..." multiline={true} style={styles.largeinput} textAlignVertical="top" autoCapitalize="none"
            onChangeText={text => {setDescription(text)}} value={description}></TextInput>
        <TouchableOpacity style={styles.updatebutton} onPress={update}>
          <Text style={styles.buttontext}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutbutton} onPress={() => {setToken(null);}}>
          <Text style={styles.buttontext}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) :
  (
    <View style={styles.loadmodal}> 
      <ActivityIndicator style={styles.loading} size="large"></ActivityIndicator>
    </View>
  )
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: "#FFFFFF",
    height: Dimensions.get("window").height
  },
  header: {
      marginTop: 30,
      height: 50,
      flexDirection: "row",
      borderBottomColor: "#E7E7E7",
      borderBottomWidth: 1
  },
  imagecontainer: {
      justifyContent: "center",
      flexDirection: "row",
      width: Dimensions.get("window").width,
      paddingVertical: 5
  },
  airbnblogo: {
      height: 40,
      width: 40,
      resizeMode: "contain"
  },
  imagemanager: {
    marginTop: 20,
    marginHorizontal: Dimensions.get("window").width * 0.2,
    width: Dimensions.get("window").width * (1 - 0.2*2),
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imagecircle: {
    borderColor: "#FFBAC0",
    borderWidth: 1,
    width: 150,
    borderRadius: "100%",
  },
  imagebuttons: {
    width: 50,
    justifyContent: "space-around"
  },
  greypers: {
    marginLeft: 15
  },
  smallinput: {
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
    height: 30,
    marginBottom: 20,
    width: "100%"
  },
  largeinput: {
    borderWidth: 1,
    borderColor: "#EB5A62",
    height: 90,
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 5,
    width: "100%",
    paddingBottom: 50
  },
  alltext: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center"
  },
  updatebutton: {
    borderWidth: 3,
    borderColor: "#F9575C",
    width: 150,
    height: 50,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  logoutbutton: {
    borderWidth: 3,
    borderColor: "#F9575C",
    width: 150,
    height: 50,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#E7E7E7"
  },
  buttontext: {
    color: "#717171",
    fontSize: 16
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
  profilephoto: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    borderRadius: 100
  }
})