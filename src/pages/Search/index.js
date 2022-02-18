import React,{useState,useEffect} from "react";
import { Container,ListMovies} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import {ActivityIndicator} from 'react-native';
import api, {key} from '../../serveces/api';
import SearchItem from "../../Components/serchitem";

export default function serch(){
    
    const [movie,setMovie] = useState([]);
    const [loading,setLoading] = useState(true)

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(()=>{
        let isActive = true;

        async function getSearchMovie(){
            const response = await api.get('/search/movie', {
                params:{
                        query: route?.params?.name,
                        api_key: key,
                        language: 'pt-BR',
                        page:1, 
                }
            })

            if(isActive){
                setMovie(response.data.results);
                console.log(response.data.results);
                setLoading(false);
            }
        }

        if(isActive){
            getSearchMovie();
        }

        return () =>{
            isActive = false
        }
    })

    function navigateDetailsPage(item){
        navigation.navigate('Detail', {id: item.id})
    }

    if(loading){
        return(
            <Container>
                <ActivityIndicator size="large" color="red"></ActivityIndicator>
            </Container>
        )
    }

    return(
        <Container>
            <ListMovies
                data={movie}
                showVerticalScrollIndicator={false}
                keyExtractor={ (item) => String(item.id)}
                renderItem={ ({item}) => <SearchItem data={item} navigatePage={ () => navigateDetailsPage(item)}/>}
            />
        </Container>
    )
} 