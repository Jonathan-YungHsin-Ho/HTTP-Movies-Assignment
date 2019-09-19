import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState({});

  useEffect(
    () =>
      axios
        .get('http://localhost:5000/api/movies')
        .then(res => setMovies(res.data))
        .catch(err => console.log(err.response)),
    [],
  );

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      {movies && (
        <Route
          exact
          path='/'
          render={props => {
            return <MovieList {...props} movies={movies} />;
          }}
        />
      )}
      <Route
        path='/movies/:id'
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path='/update-movie/:id'
        render={props => {
          return (
            <UpdateMovie {...props} movies={movies} setMovies={setMovies} />
          );
        }}
      />
    </>
  );
};

export default App;
