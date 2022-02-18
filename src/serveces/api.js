import axios from "axios";//instalamos o axios 

//url filmes em cartaz
//movie/now_playing?api_key=a6d8c6339986f498a0ad65c13c59c463&language=pt-BR&page=1

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'//essa e a parte da url que nunca muda
})

export const key = 'a6d8c6339986f498a0ad65c13c59c463'//essa é nossa chave

export default api;