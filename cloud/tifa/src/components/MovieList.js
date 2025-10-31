const MovieList = ({movies}) => {
  return (
    <ul>
      {movies.map(movie => <li key={movie.imdbID}>{movie.Title}</li>)}  
    </ul>
  );
}

export default MovieList;












