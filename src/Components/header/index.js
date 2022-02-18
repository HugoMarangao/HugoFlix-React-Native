import React from "react";
import {View,Text} from 'react-native';
import { Container, MenuButton, Title } from "./styles";
import {Feather} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Header({title}){
//colocando o title como funcao ele pode ser alterado
    const navigation = useNavigation();

    return(
        <Container>
            <MenuButton onPress={() => navigation.openDrawer()}>
                <Feather name='menu'size={36} color="#fff"/>
            </MenuButton>
            <Title>{title}</Title>
        </Container>
    )
}