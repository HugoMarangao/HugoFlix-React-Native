import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from '../pages/Home';
import Detail from "../pages/Datel";
import serch from "../pages/Search";

const Stack = createNativeStackNavigator();

export default function stackRoutes(){
    return(//passando a Home como principal o index home sera o primeiro a aparcer
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{headerShown:false}}
            />

            <Stack.Screen
                name="Detail" 
                component={Detail}
                options={{headerShown:false,title:"Detalhes"}}
            />

            <Stack.Screen 
                name="serch" 
                component={serch}
                options={{title:"Sua Busca",headerTintColor:"#FFF",headerStyle:{backgroundColor:"#141a29",color:"#FFF"}}}
            />
            
        </Stack.Navigator>
    );
}