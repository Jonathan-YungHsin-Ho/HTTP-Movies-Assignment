import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateMovie(props) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (props.movies.length > 0) {
      const movieToUpdate = props.movies.find(
        movie => `${movie.id}` === props.match.params.id,
      );
      setMovie(movieToUpdate);
    }
  }, [props.match.params.id, props.movies]);

  const handleChange = e =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

  const handleChangeActor = e => {};

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res.data);
        props.setMovies([
          ...props.movies.filter(el => el.id !== movie.id),
          res.data,
        ]);
        // axios
        //   .get('http://localhost:5000/api/movies')
        //   .then(res => props.setMovies(res.data));
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='form'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            name='title'
            onChange={handleChange}
            placeholder='...title'
            value={movie.title}
          />
        </label>
        <label>
          Director:
          <input
            type='text'
            name='director'
            onChange={handleChange}
            placeholder='...director'
            value={movie.director}
          />
        </label>
        <label>
          Metascore:
          <input
            type='text'
            name='metascore'
            onChange={handleChange}
            placeholder='...metascore'
            value={movie.metascore}
          />
        </label>
        <p>Actors:</p>
        {movie.stars &&
          movie.stars.map(el => (
            <input
              type='text'
              value={el}
              placeholder='...actor'
              onChange={handleChangeActor}
            />
          ))}
        {/* <input
          type='text'
          name='firststar'
          onChange={handleChange}
          placeholder='...first star'
        />
        <input
          type='text'
          name='secondstar'
          onChange={handleChange}
          placeholder='...second star'
        />
        <input
          type='text'
          name='thirdstar'
          onChange={handleChange}
          placeholder='...third star'
        /> */}
        <button className='button'>Update Movie</button>
      </form>
    </div>
  );
}
