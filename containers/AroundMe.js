import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign } from '@expo/vector-icons'; 
import * as Location from "expo-location";
import ExtrLatLng from "../assets/Functions/ExtrLatLng";
import DistArray from "../assets/Functions/DistArray";

export default function AroundMe() {
    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [allLocs, setAllLocs] = useState([])
    const [coords, setCoords] = useState(null)
    const [allowLoc, setAllowLoc] = useState(false)
    const [allLocDist, setAllLocDist] = useState([])

    useEffect(() => {
        const askPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            // demande l'autorisation de partage à l'utilisateur
            // si autorise, devient "granted"

            if(status === "granted") {
                let location = await Location.getCurrentPositionAsync({});

                const obj = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };

                setCoords(obj); // stock les données de localisation de l'utilisateur

                setAllowLoc(true)
            }
        }

        askPermission()

        const fetchData = async() => {
            try {
                const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/around`)
                setData(response.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }

        fetchData() 

        if(data.length > 0) {
            const alllocations = ExtrLatLng(data)
            setAllLocs(alllocations)
            setAllLocDist(DistArray(coords, allLocs))
        }

    }, [data])

    return !isLoading ? (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {navigation.navigate("Home")}} style={styles.arrowcontainer}>
                    <AntDesign name="arrowleft" size={30} color="#727272" />
                </TouchableOpacity>
                <View style={styles.imagecontainer}>
                    <Image source={require("../assets/Images/airbnb-logo.png")} style={styles.airbnblogo}></Image>
                </View>
            </View>
            {!allowLoc ?
            <Text>We can't display rooms around you as you haven't shared your location with us</Text>
            :
            <MapView style={styles.mapview} provider={PROVIDER_GOOGLE}
            showsUserLocation={true} initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2
            }}>
                {allLocDist.map((item) => {
                    return <MapView.Marker key={item.rank}  // item.rank
                                    coordinate={{
                                        latitude: item.coords[1],
                                        longitude: item.coords[0]
                                    }}
                                    onPress={() => {navigation.navigate("room", {id: item.id})}}
                                >
                            </MapView.Marker>
                })}
            </MapView>
            }
        </View>
    )
    :
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
    lottiecontainer: {
       marginTop: 20,
       width: "100%",
       alignItems: "center"
    },
    mapview: {
        marginHorizontal: 20,
        marginTop: 10,
        height: Dimensions.get("window").height - 150,
        width: Dimensions.get("window").width - 20*2
    },
    touchable: {
        borderWidth: 1,
        borderColor: "red"
    }
})