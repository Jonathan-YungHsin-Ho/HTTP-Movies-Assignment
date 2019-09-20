import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddMovie(props) {
  const [movie, setMovie] = useState({});
  const [stars, setStars] = useState([]);
  const [firstStar, setFirstStar] = useState('');
  const [secondStar, setSecondStar] = useState('');
  const [thirdStar, setThirdStar] = useState('');

  const handleChange = e =>
    setMovie({ ...movie, [e.target.name]: e.target.value });

  // const handleChangeArr = e => setStars([...stars]);

  useEffect(() => {
    setStars([firstStar, secondStar, thirdStar]);
  }, [firstStar, secondStar, thirdStar]);

  useEffect(() => setMovie({ ...movie, stars: stars }), [stars]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then(res => {
        console.log(res);
        props.setMovies(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='form'>
      <h2>Add Movie</h2>
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
        <label>
          First Star:
          <input
            type='text'
            name='firststar'
            // onChange={handleChangeArr}
            onChange={e => setFirstStar(e.target.value)}
            placeholder='...first star'
          />
        </label>
        <label>
          Second Star:
          <input
            type='text'
            name='secondstar'
            // onChange={handleChangeArr}
            onChange={e => setSecondStar(e.target.value)}
            placeholder='...second star'
          />
        </label>
        <label>
          Third Star:
          <input
            type='text'
            name='thirdstar'
            // onChange={handleChangeArr}
            onChange={e => setThirdStar(e.target.value)}
            placeholder='...third star'
          />
        </label>
        <button className='button'>Add Movie</button>
      </form>
    </div>
  );
}
