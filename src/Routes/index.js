import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Movie from '../pages/Movies';//importamos a pasta com o arquivo moveis
import stackRoutes from "./stackRoutes";//stack

const Drawer = createDrawerNavigator();

export default function Routes() {
    return(//No Drawe.Navigation estamos mudando o geral
        <Drawer.Navigator
            screenOptions={{
                headerShown:false,
                drawerStyle:{
                    backgroundColor:'#090A0E',
                    paddingTop:20
                },
                drawerActiveBackgroundColor:'#e72f49',
                drawerActiveTintColor:'#fff',
                drawerInactiveTintColor:'#fff'
            }}>

            <Drawer.Screen name="HomeDrawer" component={stackRoutes} 
            options={{title:'Home',drawerIcon: ({ focused, size, color}) =>(
                <MaterialCommunityIcons 
                name={focused ? 'movie-open' : 'movie-outline'} //com o focused se estiver selecionado aparece o icone se nao aparece outro
                //dessa forma ele esta pegando a cor e o tamanho passado a cima ⬇️ 
                size={size} 
                color={color}/>
            )}}/>

            <Drawer.Screen 
            name="Movies" 
            component={Movie}
            options={{title:' Meus Filmes',
            drawerIcon: ({ focused, size, color}) =>(
                <MaterialCommunityIcons 
                name={focused ? 'archive' : 'archive-outline'} //com o focused se estiver selecionado aparece o icone se nao aparece outro
                //dessa forma ele esta pegando a cor e o tamanho passado a cima ⬇️ 
                size={size} 
                color={color}/>
            )}}/>

        </Drawer.Navigator>
    )
    
}

