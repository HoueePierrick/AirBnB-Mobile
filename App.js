import React, { useState, useEffect } from "react"; // functions for state and API loading
import AsyncStorage from "@react-native-async-storage/async-storage"; // don't know
import { NavigationContainer } from "@react-navigation/native"; // for navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // for navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // for navigation at the bottom of the app
import { Ionicons } from "@expo/vector-icons"; // to import icons

// Components import
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import Profile from "./containers/Profile";
import SplashScreen from "./containers/SplashScreen";
import Room from "./containers/Room";
import AroundMe from "./containers/AroundMe";
import "./assets/Functions/ignoreWarnings"

// For navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState({});

  // Function to get or remove token based on if there is a token
  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", JSON.stringify(token));
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const gotToken = await AsyncStorage.getItem("userToken");
      const finalToken = JSON.parse(gotToken) 
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(finalToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) { // to use if haven't received token => to be seen
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab">
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false, // hides header ?
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                    headerShown: false
                  }}
                >

                  {() => (
                    <Stack.Navigator screenOptions={{headerShown: false}}>

                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "My App",
                          headerStyle: { backgroundColor: "red" },
                          headerTitleStyle: { color: "white" },
                        }}>
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>

                      <Stack.Screen name="room" component={Room} options={{headerShown: false}}></Stack.Screen>

                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"location-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: "AroundMe",
                          headerShown: false
                        }}
                      >
                        {() => <AroundMe />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabProfile"
                  options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"person-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                          headerShown: false
                        }}
                      >
                        {() => <Profile setToken={setToken} userToken={userToken}/>}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
