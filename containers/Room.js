import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList, ActivityIndicator, StyleSheet, Dimensions, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Stringify = require("../assets/Functions/Stringify");
import Rating from "../assets/Functions/Rating";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { SwiperFlatList } from 'react-native-swiper-flatlist';


export default function Room ({route}) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`)
                setData(response.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error.message)
            }
        };
        fetchData();
    }, [])

// Needed in item
    // In div1
        // Picture // Pictures => item.photos[0].url // item = item.photos 
        // Price => item.price
    // In div1
        // In div2
            // Title => item.title
            // In div3
                // Rating => item.ratingValue
                // Reviews => item.reviews
        // AccountPic => item.user.account.photo.url
    // Description => item.description

    const navigation = useNavigation();

    return !isLoading ?
    (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {navigation.navigate("Home")}} style={styles.arrowcontainer}>
                    <AntDesign name="arrowleft" size={30} color="#727272" />
                </TouchableOpacity>
                <View style={styles.imagecontainer}>
                    <Image source={require("../assets/Images/airbnb-logo.png")} style={styles.airbnblogo}></Image>
                </View>
            </View>
            <View style={styles.flatlist}>
                <View style={styles.suboffer_container_one}>
                    {/* <Image source={{uri: data.photos[0].url}} style={styles.offer_image} resizeMode="cover"></Image> */}
                    <SwiperFlatList style={styles.swiper}
                        autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        index={2}
                        showPagination
                        data={data.photos}
                        paginationStyle={styles.pagination}
                        renderItem={({ item }) => (
                            <Image source={{uri: item.url}} style={styles.offer_image} resizeMode="cover"></Image>
                        )}
                    />
                    <Text style={styles.textbox}>{data.price} €</Text>
                </View>
                <View style={styles.suboffer_container_two}>
                    <View style={styles.suboffer_subcontainer}>
                        <Text style={styles.offer_title} ellipsizeMode="tail" numberOfLines={1}>{data.title}</Text>
                        <Rating num1={data.ratingValue} num2={data.reviews}></Rating>
                    </View>
                    <Image style={styles.accountimage} source={{uri: data.user.account.photo.url}} resizeMode="contain"></Image>
                </View>
            </View>
            {!visible ? 
            <>
                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={3}>{data.description}</Text>
                <TouchableOpacity style={styles.showcontainer} onPress={() => {setVisible(true)}}>
                    <Text style={styles.showmore}>Show more</Text>
                    <FontAwesome name="caret-down" size={24} color="#717171" />
                </TouchableOpacity>
            </>
            :
            <>
                <Text style={styles.description} ellipsizeMode="tail" numberOfLines={10}>{data.description}</Text>
                <TouchableOpacity style={styles.showcontainer} onPress={() => {setVisible(false)}}>
                    <Text style={styles.showmore}>Show less</Text>
                    <FontAwesome name="caret-up" size={24} color="#717171" />
                </TouchableOpacity>
            </>
            }
            {/* <FlatList data={data} keyExtractor={"a"}></FlatList> */}
        </View>
    )
    :
    (
        <View>
            <View style={styles.imagecontainer}>
              <Image source={require("../assets/Images/airbnb-logo.png")} style={styles.airbnblogo}></Image>
            </View>
            <View style={styles.lottiecontainer}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        height: 50,
        flexDirection: "row"
    },
    arrowcontainer: {
        justifyContent: "center",
        width: 30
    },
    imagecontainer: {
        justifyContent: "center",
        flexDirection: "row",
        width: Dimensions.get("window").width - 50,
        paddingVertical: 5
    },
    airbnblogo: {
        height: 40,
        width: 40,
        resizeMode: "contain"
      },
      flatlist: {
        paddingHorizontal: 20,
        height: 300,
        flexDirection: "column"
      },
      offer_container: {
        borderBottomWidth: 1,
        borderColor: "#BBBBBB",
        marginBottom: 10,
        paddingVertical: 10
      },
      suboffer_container_one: {
        height: 200,
        flexDirection: "row",
        position: "relative"
      },
      offer_image: {
        height: 200,
        width: Dimensions.get("window").width - 20*2,
      },
      pagination: {
        width: Dimensions.get("window").width - 20*2,
        alignItems: "center",
        paddingLeft: 50
      },
      textbox: {
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        width: 100,
        height: 50,
        paddingVertical: 12,
        fontSize: 20,
        textAlign: "center",
        bottom: 10
      },
      suboffer_container_two: {
        marginTop: 10,
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
      },
      description: {
        paddingHorizontal: 20,
        fontSize: 16
      },
      showcontainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
      },
      showmore: {
        color: "#717171",
        fontSize: 16,
        marginRight: 10
      }
})