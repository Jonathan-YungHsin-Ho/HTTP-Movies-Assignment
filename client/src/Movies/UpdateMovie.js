import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateMovie(props) {
  const [movie, setMovie] = useState({});
  const [stars, setStars] = useState([]);
  const [firstStar, setFirstStar] = useState('');
  const [secondStar, setSecondStar] = useState('');
  const [thirdStar, setThirdStar] = useState('');

  useEffect(() => {
    if (props.movies.length > 0) {
      const movieToUpdate = props.movies.find(
        movie => `${movie.id}` === props.match.params.id,
      );
      setStars(movieToUpdate.stars);
      setFirstStar(movieToUpdate.stars[0]);
      setSecondStar(movieToUpdate.stars[1]);
      setThirdStar(movieToUpdate.stars[2]);
      setMovie(movieToUpdate);
    }
  }, [props.match.params.id, props.movies]);

  const handleChange = e =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

  // const handleChangeActor = e => setStars([...stars, e.target.value]);

  useEffect(() => {
    setStars([firstStar, secondStar, thirdStar]);
    console.log(stars);
    console.log(movie);
  }, [firstStar, secondStar, thirdStar]);

  const handleSetActors = e => {
    e.preventDefault();
    setMovie({ ...movie, stars: stars });
  };

  // useEffect(() => {
  //   setMovie({ ...movie, stars: stars });
  // }, [stars]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        // console.log(res.data);
        props.setMovies([
          res.data,
          ...props.movies.filter(el => el.id !== movie.id),
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
            placeholder={'...metascore'}
            value={movie.metascore}
          />
        </label>
        <p>Actors:</p>
        {/* {stars &&
          stars.map(el => (
            <input
              type='text'
              // value={el}
              placeholder='...actor'
              onChange={handleChangeActor}
            />
          ))} */}
        <input
          type='text'
          name='firststar'
          onChange={e => setFirstStar(e.target.value)}
          value={firstStar}
        />
        <input
          type='text'
          name='secondstar'
          onChange={e => setSecondStar(e.target.value)}
          value={secondStar}
        />
        <input
          type='text'
          name='thirdstar'
          onChange={e => setThirdStar(e.target.value)}
          value={thirdStar}
        />
        <button className='button' onClick={handleSetActors}>
          Set Actors
        </button>
        <button className='button'>Update Movie</button>
      </form>
    </div>
  );
}
