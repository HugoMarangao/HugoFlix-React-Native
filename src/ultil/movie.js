//criar um lista de filmes com o tamanho que eu desejar
export function getListMovies(size,movies){
    let popularMovies = [];//para que nao apareca todos os filmes da api criamos esse sistema 

    for(let i = 0, l = size; i < l;i++){//passaremos na home o numero de filmes que sera comparado com aqui e serao exibidos
        popularMovies.push(movies[i])
    }

    return popularMovies;
}

//gerar um numero aleatorio com base no tamanho da lista de filmes que eu passar
export function randomBanner(movies){
    return Math.floor(Math.random() * movies.length)//o floor(faz com que o numero que for seja inteiro)
}