import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        this.props.setMovies(
          this.props.movies.filter(movie => movie.id !== res.data),
        );
        // axios
        //   .get('http://localhost:5000/api/movies')
        //   .then(res => this.props.setMovies(res.data));
        this.props.history.push(`/`);
      })
      .catch(err => console.log(err.response));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className='save-wrapper'>
        <MovieCard movie={this.state.movie} />
        <div>
          <button
            className='button'
            onClick={() =>
              this.props.history.push(`/update-movie/${this.state.movie.id}`)
            }>
            Update Movie
          </button>
          <button
            className='button'
            onClick={() => this.handleDelete(this.state.movie.id)}>
            Delete Movie
          </button>
          <button className='button' onClick={this.saveMovie}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
