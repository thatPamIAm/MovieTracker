import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MovieGridContainer from '../MovieGrid/MovieGridContainer';
import MovieDetailContainer from '../MovieDetail/MovieDetailContainer';

import LogInContainer from '../LogIn/LogInContainer.js';

import './appcss'

export default class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=e918cc56cafd311d7955d426f4da1685&language=en-US&page=1')
    .then(response => response.json())
    .then((json) => {
      let movies = json.results
      this.props.addMovies(movies)
    })
  }

  render() {

    return (
      <div>
        <Link
          className='movie-watcher-h1'
          to='/'><h1>Movie <span className='movie-watcher-span'>Watcher</span></h1></Link>

        <Route exact path='/' render={ () => {
            if(!this.props.user.id){
              return (
                <div>
                  <LogInContainer history={ this.props.history } />
                  <MovieGridContainer />
                </div>
              )
            } else {
              return (
                <MovieGridContainer />
              )
            }
          }} />

        <Route exact path='/movie/:id' render={({ match }) =>
          <MovieDetailContainer match={ match }/>
        } />
      </div>
    )
  }
}
