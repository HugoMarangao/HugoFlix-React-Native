import React from "react";
import {View,Text} from 'react-native';
import {Ionicons,Feather} from '@expo/vector-icons';
import {Container,Title,RateContainer,Rate,ActionContainer,DetailButton,DelteButton} from "./styles";

export default function FavoriteItem({data, navigatePage, deleteMovie}){
    return(
        <Container>
            <Title size={22}>{data.title}</Title>

            <RateContainer>
                <Ionicons name="md-star"size={12} color="#E7A74e"/>

                <Rate>{data.vote_average}/10</Rate>

            </RateContainer>

            <ActionContainer>
                <DetailButton onPress={ ()=> navigatePage(data)}>
                    <Title size={14}>Ver Detalhes</Title>
                </DetailButton>

                <DelteButton onPress={ ()=> deleteMovie(data.id)}>
                    <Feather name="trash"size={24} color="white"/>
                </DelteButton>
            </ActionContainer>
        </Container>
    );
}
