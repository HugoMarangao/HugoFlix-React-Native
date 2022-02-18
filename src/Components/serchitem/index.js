import React from "react";
import { Banner, Container, Title, RateContainer, Rate } from "./styles";
import {Ionicons} from '@expo/vector-icons'


export default function SearchItem({data, navigatePage}) {
    
    function detailMovie(){

        if(data.release_data === ''){
            alert('Filme ainda sem data');
            return;
        }

        navigatePage(data);
    }
    
    return(
        <Container onPress={detailMovie}>
            { data?.poster_path ? (
                <Banner
                    resizeMethod="resize"
                    source={{uri: `https://image.tmdb.org/t/p/original/${data?.poster_path}` }}
                />
            ) : (
                <Banner
                    resizeMethod="resize"
                    source={ require('../../../assets/icon.png')}

                />
            )}

            <Title>{data?.title}</Title>

            <RateContainer>
                <Ionicons name="md-star"size={12} color="#E7A74e"/>
                <Rate>{data?.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    );
}