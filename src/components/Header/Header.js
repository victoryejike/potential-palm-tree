import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Logo from '../../images/Logo.png'
import './Header.scss'
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';

const Header = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === '') return alert('Please enter a search term');
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));

    setTerm('');
  }

  return (
    <div>
      <div className='header'>
        <Link to='/'>
          <div className='logo'><img src={Logo} alt='logo' /></div>
        </Link>
      </div>
      <div className="banner-img"><h1>Watch something incredible.</h1></div>
      <div className='search-bar'>
        <form onSubmit={submitHandler}>
          <label className='search-text'>Search</label>
          <input type='text' value={term} onChange={(e) => setTerm(e.target.value)} />
        </form>
      </div>
    </div>
  )
}

export default Header