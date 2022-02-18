import React, {useState,useEffect} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import { Container,SearchContainer,SearchButton,Input,Title,Banner,BannerButton,SliderMovie} from './styles';
import Header from '../../Components/header';
import {Feather} from '@expo/vector-icons';
import Slider from '../../Components/SliderItem';
import { getListMovies, randomBanner } from '../../ultil/movie';
import api, {key} from '../../serveces/api';
import { useNavigation } from '@react-navigation/native';

export default function Home(){

    const [nowMovies,setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies,setTopMovies] = useState([]);
    const [bannerMovies,setBannerMovies] = useState({});
    const [input,setInput] = useState('');


    const [loading,setLoding] = useState(true);//essa é nossa funcao de carregamento e quero que ela sempre seja verdadeira ate que toda api seja carregada

    const navigation = useNavigation();

    useEffect(() => {//ele ira fornecer os itens para o aparecimento do slide
     let isActive = true;
     const ac = new AbortController();//quando estivermos em outra pagina nao quero que isso seja executado

     async function getMovies(){
           /* const response = await api.get('/movie/now_playing',{
                params:{
                    api_key: key,
                    language: 'pt-BR',
                    page:1,
                }
                //dessa forma tambem daria certo porem seria muito repetitivo
            })*/
            const [nowData,popularaData,topData] = await Promise.all([//aqui estamos passando a rota de modo dinamico acessando os  tres tipos de filmes que queremos
                api.get('/movie/now_playing',{
                    params:{
                        api_key: key,//estamos puxando a chave da api que ultilizamos
                        language: 'pt-BR',//a linguagem que queremos
                        page:1,//e a pagina dos banners
                    }
                }),//essa parte ira mostrar os filmes em cartaz
                api.get('/movie/popular',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page:1,
                    }
                }),//nessa os filmes mais populares
                api.get('/movie/top_rated',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page:1,
                    }
                })//e nesse com a melhor classificaçao
            ])

        if(isActive){//aqui verificamos se tudo isso vai ser usado
            const nowList = getListMovies(10,nowData.data.results);//aqui estamos passando o numero de itens e qual ele deve puxar
            const popularList = getListMovies(5,popularaData.data.results);
            const topList = getListMovies(5,topData.data.results);

            setNowMovies(nowList);//como ali em cima fizemos constantes agr setamos dentro dos useStates
            setPopularMovies(popularList);
            setTopMovies(topList);
            setBannerMovies(nowData.data.results[randomBanner(nowData.data.results)])

            setLoding(false);//agora que tudo foi carregado ele sera falso
        }
    
        }

     getMovies();

     return () => {//essa e uma funcao fantasma que sera usada quando sairmos da pagina
         isActive = false;//logo a api nao sera retronada
         ac.abort(); 
     }
    }, [])

    function navigateDetailsPage(item){
        navigation.navigate('Detail', {id: item.id})
    }

    function handlerSearchMovie(){

        if(input === '')return;

        navigation.navigate('serch', {name: input})
        setInput('');
    }

    if(loading){
        return(
            <Container>
                <ActivityIndicator size="large" color="red">

                </ActivityIndicator>
            </Container>
        );
    }

    return(
        <Container>
            <Header title="HugoFlix"/>
        
            <SearchContainer>
                <Input placeholder="Ex: Vingadores" placeholderTextColor="#ddd" value={input} onChangeText={(text)=>setInput(text)}/>
                <SearchButton onPress={handlerSearchMovie}>
                    <Feather name="search"
                     size={30}
                     color="#fff"/>
                </SearchButton>
            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>
                
                <BannerButton activeOpacity={0.7} onPress={ ()=> navigateDetailsPage(bannerMovies)}>
                    <Banner 
                        resizeMethod="resize"//com isso ele vai tentar encaixar a imagem toda
                        source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovies.poster_path}` }}
                    />
                </BannerButton>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}//remove a linha do slide
                    data={nowMovies}//o data passa uma lista que sera repetida
                    renderItem={ ({item}) => <Slider data={item} navigatePage={() =>navigateDetailsPage(item)}/>}//dessa forma a lsia renderizada esta sendo puxada
                    keyExtractor={ (item) => String(item.id)}
               />

                <Title>Populares</Title>
                  <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}//remove a linha do slide
                    data={popularMovies}//o data passa uma lista que sera repetida
                    renderItem={ ({item}) => <Slider data={item} navigatePage={() =>navigateDetailsPage(item)}/>}//dessa forma a lsia renderizada esta sendo puxada
                    keyExtractor={ (item) => String(item.id)}//nao sei para que serve
                />

                 <Title>Mais Votados</Title>
                  <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}//remove a linha do slide
                    data={topMovies}//o data passa uma lista que sera repetida
                    renderItem={ ({item}) => <Slider data={item} navigatePage={() =>navigateDetailsPage(item)}/>}//dessa forma a lsia renderizada esta sendo puxada
                    keyExtractor={ (item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}