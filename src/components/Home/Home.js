import React, { useEffect } from 'react'
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch();
  // const isLoading = useSelector(getIsLoading);
  const movieText = 'Harry';
  const showText = 'Friends';

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText)); 
  });

  return (
    <div>
      <MovieListing />
    </div>
  )
}

export default Home