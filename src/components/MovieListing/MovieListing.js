import React from 'react'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { getAllMovies, getAllShows, getIsLoading } from '../../features/movies/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import { Settings } from '../../common/settings'
import './MovieListing.scss';

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  const isLoading = useSelector(getIsLoading);

  console.log(isLoading)

  let renderMovies, renderShows = '';

  renderShows = shows.Response === 'True' ? (
    shows.Search.map((show, index) => (
     <MovieCard key={index} data={show} />
  ))
  ) : (
    <div className='show-error'>
      <h3>{shows.Error}</h3>
    </div>
  )

  renderMovies = movies.Response === 'True' ? (
    movies.Search.map((movie, index) => (
     <MovieCard key={index} data={movie} />
  ))
  ) : (
    <div className='movies-error'>
      <h3 className='loading'>{movies.Error}</h3>
    </div>
  )
  return (
    <div className='movie-wrapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
        <div className='movie-container'>
          {
            isLoading ? (
              <div className='loading'>...Loading</div>
            ) : (
              <Slider { ...Settings }>{renderMovies}</Slider>
            )
          }
        </div>
      </div>
      <div className='show-list'>
        <h2>Shows</h2>
        <div className='movie-container'>
          {
            isLoading ? (
              <div className='loading'>...Loading</div>
            ) : (
              <Slider { ...Settings }>{renderShows}</Slider>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MovieListing