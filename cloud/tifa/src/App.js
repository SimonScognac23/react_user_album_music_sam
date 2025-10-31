
import './App.css';
import {useState, useEffect} from 'react';
import MovieList from './components/MovieList'



const APIKEY =  '';
const APIURL = 'https://www.omdbapi.com';


const fetchMovies = async (search = 'Guardians') => {

  // richiammiamo l APIURL con il parametro di ricerca batman
  
 const response = await fetch(APIURL + '?apikey='+ APIKEY + '&s=' + search)  // utiliziammo l a libreria fetch api, come parametro passiamo l API KEY piu parametro ricerca s che è uguale  a + search
// la fetch ritorna una promise quindi metto il then
.then(res => res.json());  // la prima promise ritorna un oggetto res e poi chiamamiamo il metodo json per avere i body della risposta in jason
const {Search: movies, totalResults: totalCount} = response; // ritorniamo i valori movies e totalCount
console.log(response);

return {movies, totalCount};
}


function App() {



  // creaimo un hooks per gestire lo stato
  const [movies, setMovies ] = useState([])  // primo parametro lo chiameremo movies e il valore inziale è un array vuoto 
  const [totalCount, setTotalCount ] = useState(0) // secondo hooks per tenere traccia del numero totale di film trovati


useEffect( () => {  // in qsta funzione facciamo la chiamata all API


  const callApi = async () => {
  const data = await fetchMovies();
  fetchMovies();
  setMovies(data.movies);   // a setMovies gli passiamo data.movies
  setTotalCount(data.totalCount);  // a settotalcount gli passiamo totalcount



  }
  callApi();
  return () => {
    
  }


}, []);



//   chiamo movies che ritornera un array e react lo converitra automaticmanete in elementi 
// l attributo key serve se react cambia e fa il refresh sa quale elemento è cambiato 
  return (
   <div className="App">

     <h1> my movies </h1>
   <MovieList movies={movies} />
</div>

    
    



  
  );
}

export default App;
