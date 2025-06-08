import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './context/CartContext';

import WelcomeScreen from './src/WelcomeScreen';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import HomeScreen from './src/HomeScreen';
import ProductDetails from './src/ProductDetails';
import MarketPlace from './src/MarketPlace';
import CartContent from './src/CartContent';
import UserProfile from './src/UserProfile';
import SellerPage from './src/SellerPage';
import SellerProfile from './src/SellerProfile';
import Messages from './src/Messages';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">

          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MessagesPage" component={Messages} options={{ headerShown: false }} />



          <Stack.Screen name="ProdDetails" component={ProductDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Marketplace" component={MarketPlace} options={{ headerShown: false }} />
          <Stack.Screen name="Cart" component={CartContent} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />

          <Stack.Screen name="SellerPage" component={SellerPage} options={{ headerShown: false }} />
          <Stack.Screen name="SellerProfile" component={SellerProfile} options={{ headerShown: false }} />



        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}