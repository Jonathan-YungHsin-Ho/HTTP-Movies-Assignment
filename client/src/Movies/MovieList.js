import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function MovieList(props) {
  return (
    <div className='movie-list'>
      {props.movies.length > 0 &&
        props.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  console.log(movie);
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
