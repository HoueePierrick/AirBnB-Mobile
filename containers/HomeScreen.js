import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList, ActivityIndicator, StyleSheet, Dimensions, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Stringify = require("../assets/Functions/Stringify");
import Rating from "../assets/Functions/Rating";
// import LottieView from 'lottie-react-native';


export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const animation = useRef(null);

  useEffect( () => {
    const fetchData = async() => {
      try {
        const response = await axios.get("https://express-airbnb-api.herokuapp.com/rooms")
        setData(response.data)
        // Stringify(data)
        // console.log(data)
        // console.log(data[0].photos[0].url)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData();
  }, [])

  const navigation = useNavigation();

  // Object containing
  // _id => id of the offer ==> to use data[x]._id
// In a div
    // photos => array containing images as object
      // url => picture url ==> to use data[x].photos[0].url
      // price => price without currency ==> to use data[x].price 
// In a div
// In a subdiv
    // title => title of the offer ==> to use data[x].title
// In a sub-subdiv
// ratingValue => full number ==> to use data[x].ratingValue
// reviews => full number ==> to useData[x].reviews
// In a subdiv
// data[x].user.account.photo.url ==> to use to get user's picture

return !isLoading ?
    (
          <View>
            <View style={styles.imagecontainer}>
              <Image source={require("../assets/Images/airbnb-logo.png")} style={styles.airbnblogo}></Image>
            </View>
              <FlatList data={data} keyExtractor={item => item._id}
              renderItem={({item}) => 
                <TouchableOpacity style={styles.offer_container} onPress={() => {navigation.navigate("room", {id: item._id})}}>
                  <View style={styles.suboffer_container_one}>
                    <Image source={{uri: item.photos[0].url}} style={styles.offer_image} resizeMode="cover"></Image>
                    <Text style={styles.textbox}>{item.price} €</Text>
                  </View>
                  <View style={styles.suboffer_container_two}>
                    <View style={styles.suboffer_subcontainer}>
                      <Text style={styles.offer_title} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
                      <Rating num1={item.ratingValue} num2={item.reviews}></Rating>
                    </View>
                    <Image style={styles.accountimage} source={{uri: item.user.account.photo.url}} resizeMode="contain"></Image>
                  </View>
                </TouchableOpacity>
              } style={styles.flatlist} scrollEnabled={true}
              ></FlatList>
            <Button
              title="Go to Profile"
              onPress={() => {
                navigation.navigate("Profile", { userId: 123 });
              }}
            />
          </View>
    )  
    :
   (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View>
          <View style={styles.imagecontainer}>
            <Image source={require("../assets/Images/airbnb-logo.png")} style={styles.airbnblogo}></Image>
          </View>
          <View style={styles.lottiecontainer}>
            <ActivityIndicator></ActivityIndicator>
            {/* <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 200,
                height: 200,
                backgroundColor: '#eee',
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require('../assets/Lottie/95909.json')}
            /> */}
          </View>
          <Button
            title="Go to Profile"
            onPress={() => {
              navigation.navigate("Profile", { userId: 123 });
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )  
}

const styles = StyleSheet.create({
  imagecontainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 30
  },
  flatlist: {
    paddingHorizontal: 20,
    height: Dimensions.get("window").height - 100,
    flexDirection: "column"
  },
  offer_container: {
    borderBottomWidth: 1,
    borderColor: "#BBBBBB",
    height: 300,
    marginBottom: 10,
    paddingVertical: 10
  },
  suboffer_container_one: {
    height: 200,
  },
  airbnblogo: {
    height: 40,
    width: 40,
    resizeMode: "contain"
  },
  offer_image: {
    height: 200
  },
  textbox: {
    position: "relative",
    backgroundColor: "black",
    color: "white",
    width: 100,
    height: 50,
    paddingVertical: 12,
    fontSize: 20,
    textAlign: "center",
    bottom: 55
  },
  suboffer_container_two: {
    marginTop: 5,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  suboffer_subcontainer: {
    height: "100%",
    width: "75%",
  },
  offer_title: {
    fontSize: 20,
    height: 30,
    width: "100%",
    marginBottom: 10
  },
  fullnotation: {
    height: 30
  },
  stars: {
    width: "60%",
    height: "100%"
  },
  accountimage: {
    width: 75,
    height: 75,
    borderRadius: 50
  },
  lottiecontainer: {
    width: "100%",
    alignItems: "center"
  }
})