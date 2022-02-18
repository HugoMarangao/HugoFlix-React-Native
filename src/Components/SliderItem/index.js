import React from "react";
import { Container,BannerItem,Title,RateContainer,Rate } from "./styles";
import {Ionicons} from '@expo/vector-icons'

export default function Slider({data,navigatePage}){
    return(
        <Container activeOpacity={0.7} onPress={()=> navigatePage(data)}>
            <BannerItem
                source={{uri:`https://image.tmdb.org/t/p/original/${data.poster_path}`}}//dessa forma as imagens irao ser pegas com base no sete feito  na home
            />
            <Title numberOfLines={1}/*essa propriedade limita o numero de linhas*/>{data.title}</Title>
            <RateContainer>
                <Ionicons name="star" size={12} color="#E7A74e"/>
                <Rate>{data.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    );
}