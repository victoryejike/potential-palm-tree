import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAsyncMovieOrShowDetail, getSelctedMovieOrShow, removeSelectedMovieOrShow } from '../../features/movies/movieSlice'
import './MovieDetail.scss';

const MovieDetail = () => {
  const { imdbID } = useParams()
  const dispatch = useDispatch()
  const data = useSelector(getSelctedMovieOrShow);
  const { Title, Poster, Year, imdbVotes, imdbRating, Runtime, Plot, Director, Actors, Language, Genre, Awards } = data;

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow())
    }
  }, [imdbID, dispatch])
  return (
    <div className='movie-section'>
      {
        Object.keys(data).length === 0 ? (
          <div>...Loading</div>) :
          (
          <>
            <div className='section-left'>
              <div className='movie-title'>{Title}</div>
              <div className='movie-rating'>
                <span>
                  IMDB Rating <i className='fa fa-star'></i> : {imdbRating}
                </span>
                <span>
                  IMDB Votes <i className='fa fa-thumbs-up'></i> : {imdbVotes}
                </span>
                <span>
                  Runtime <i className='fa fa-film'></i> : {Runtime}
                </span>
                <span>
                  Year <i className='fa fa-calendar'></i> : {Year}
                </span>
              </div>
              <div className='movie-plot'>{Plot}</div>
              <div className='movie-info'>
                <div>
                  <span>Director</span>
                  <span>{Director}</span>
                </div>
                <div>
                  <span>Stars</span>
                  <span>{Actors}</span>
                </div>
                <div>
                  <span>Genre</span>
                  <span>{Genre}</span>
                </div>
                <div>
                  <span>Languages</span>
                  <span>{Language}</span>
                </div>
                <div>
                  <span>Awards</span>
                  <span>{Awards}</span>
                </div>
              </div>
            </div>
            <div className='section-right'>
              <img src={Poster} alt={Title} />
            </div>
          </>
        )
      }
    </div>
  )
}

export default MovieDetail