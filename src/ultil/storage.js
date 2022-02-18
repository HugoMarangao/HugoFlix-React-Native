import AsyncStorage from "@react-native-async-storage/async-storage";

//Buscar os itens salvos
export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key)

    let moviesSave = JSON.parse(myMovies) || [];
    
    return moviesSave;

}

//salvar um novo filme
export async function saveMove(key, newMovie){
    let moviesStored = await getMoviesSave(key);

    //se tiver algum filme salvo com esse mesmo ID / ou duplicado precisamos ignorar.
    const hasMovie = moviesStored.some( item => item.id === newMovie.id)

    if(hasMovie){
        console.log("Esse Filme ja esta na sua lista");
        return;
    }

    moviesStored.push(newMovie);

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
    console.log("FILME SALVO COM SUCESSO!!");
}

// deletar algum filme especifico
export async function deleteMovie(id){
    let moviesStored = await getMoviesSave('@react');

    let myMovies = moviesStored.filter( item => {
        return (item.id !== id)
    })

    await AsyncStorage.setItem('@react',JSON.stringify(myMovies))
    console.log('filme deletado com sucesso');
    return myMovies;
}


//filtar algum filme se ja esta salvo
export async function hasMovie(movie){
    let moviesStored = await getMoviesSave('@react');

    const hasMovie = moviesStored.find( item => item.id === movie.id)

    if(hasMovie){
        return true;
    }

    return false;
}

