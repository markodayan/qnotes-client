import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div className='search-container'>
      <h3>
        <span>
          <i className='fas fa-search'></i>
        </span>
      </h3>

      <input
        placeholder='Filter your posts by category'
        className='search-input'
        type='text'
      />
    </div>
  );
};

export default Search;
