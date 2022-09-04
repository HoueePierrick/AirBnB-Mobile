import {  Text, View, StyleSheet} from "react-native";
import { Entypo } from '@expo/vector-icons'; 

const Rating = (props) => {
    const {num1, num2} = props
    return (
        <View style={styles.fullnotation}>
            <View style={styles.stars}>
                {num1 < 0.5 ?
                <>
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                </>
                : num1 < 1.5 ?
                <>
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                </>
                : num1 < 2.5 ?
                <>
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                </>
                : num1 <= 3.5 ?
                <>
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                </>
                : num1 <= 4.5 ?
                <>
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#BBBBBB" />
                </>
                :
                <>
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                    <Entypo name="star" size={24} color="#FFB000" />
                </>
                }
            </View>
            <View style={styles.stars}>
                <Text style={styles.review}>{num2} reviews</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fullnotation: {
        flexDirection: "row"
    },
    stars: {
        width: "50%",
        height: 30,
        flexDirection: "row",
        marginRight: 5,
        alignItems: "center"
    },
    review: {
        color: "#BBBBBB"
    }
})

export default Rating