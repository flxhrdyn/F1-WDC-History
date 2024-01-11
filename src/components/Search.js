import React from 'react';
import './Search.css';

const Search = ({ handleInput, handleClick }) => {
  return (
    <form className='search'>
      <input type='text' placeholder="Enter the year of the F1 season" onChange={handleInput} />
      <button type='submit' onClick={handleClick}><box-icon name='search'></box-icon></button>
    </form>
  );
}

export default Search;
