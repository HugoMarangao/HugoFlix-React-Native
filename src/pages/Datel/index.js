import React, {useState,useEffect} from "react";
import { Container,HeaderButon,Header,Banner,ButtonLink,Title,ContentArea,Rate,ListGeners,Description} from "./styles";
import {Feather, Ionicons} from '@expo/vector-icons'
import { useNavigation, useRoute} from "@react-navigation/native";
import api,{ key} from "../../serveces/api";
import Stars from 'react-native-stars';
import Genres from "../../Components/Geners";
import { ScrollView,Modal } from "react-native";
import ModalLink from "../../Components/ModalLink";
import { saveMove,hasMovie,deleteMovie } from "../../ultil/storage";



export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

    const [movie,setMovie] = useState({});
    const [openLink,setOpenLink] = useState(false);
    const [favoritedMovie, setFavoritedMovie] = useState(false);
    useEffect(() => {
        
        let isActive = true;

        async function getMovie(){
            const response = await api.get(`/movie/${route.params?.id}`,{
                params:{
                    api_key: key,
                    language: 'pt-BR'
                }
            })
            .catch((err)=>{
                console.log(err)
            })

            if(isActive){
                setMovie(response.data);
               // console.log(response.data);
               const isFavorite = await hasMovie(response.data)
               setFavoritedMovie(isFavorite);
            }
        }

    if(isActive){
        getMovie();
    }
       

    return () => {
        isActive = false;
    }

    }, [])

    async function favoriteMovie(movie){

        if(favoritedMovie){
            await deleteMovie(movie.id);
            setFavoritedMovie(false);
        }else{
            await saveMove('@react',movie);
            setFavoritedMovie(true);
        }

       
    }

    return(
        <Container>
            <Header>
                <HeaderButon onPress={ () => navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color="#fff"/>
                </HeaderButon>

                <HeaderButon onPress={() => favoriteMovie(movie)}>
                    {favoritedMovie ?(

                        <Ionicons name="bookmark" size={28} color="#fff"/>
                    ) : (
                        <Ionicons name="bookmark-outline" size={28} color="#fff"/>

                    )
                    }
                </HeaderButon>
            </Header>
            <Banner 
            resizeMethod="resize"
            source={{uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}/>

            <ButtonLink onPress={()=> setOpenLink(true)}>
                <Feather name="link" size={24} color="#fff"/>
            </ButtonLink>

            <Title numberOfLines={1}>{movie.title}</Title>
            <ContentArea>
                <Stars 
                default={movie.vote_average} 
                count={10} 
                half={true} 
                starSize={20} 
                fullStar={<Ionicons name="md-star" size={24} color="#E7A74e"/>} 
                emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74e"/>} 
                halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e"/>} 
                disable={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>
            <ListGeners 
            data={movie.genres} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            keyExtractor={ (item) => String(item.id)} 
            renderItem={ ({item}) => <Genres data={item}/>}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descrição</Title>
                <Description>{movie.overview}</Description>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={openLink}>
                <ModalLink
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={ () => setOpenLink(false)}
                />
            </Modal>

        </Container>
    )
} 