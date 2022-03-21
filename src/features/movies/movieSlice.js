import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIKEY } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
  const response = await movieApi.get(`?apiKey=${APIKEY}&s=${term}&type=movie`)

  return (response.data);
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
  const response = await movieApi.get(`?apiKey=${APIKEY}&s=${term}&type=series`)

  return (response.data);
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
  const response = await movieApi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`)

  return (response.data);
})

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loading: true
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      console.log('Pending')
      return { ...state, loading: true }
    },
    [fetchAsyncShows.pending]: (state) => {
      console.log('Pending')
      return { ...state, loading: true }
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('Fetched Successfully!!');
      return { ...state, movies: payload, loading: false }
    },
    [fetchAsyncMovies.rejected]: () => console.log('Rejected'),
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('Fetched Successfully!!');
      return { ...state, shows: payload, loading: false }
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log('Fetched Successfully!!');
      return { ...state, selectedMovieOrShow: payload }
    },
  }
})

export const { removeSelectedMovieOrShow } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelctedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getIsLoading = (state) => state.movies.loading

export default movieSlice.reducer;