import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ searchTerm, onSearchTermChange }) {
  return (
    <div className='border border-secondary-light rounded py-2 px-4 h-fit my-4 w-full md:w-auto flex items-center'>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className='outline-none flex-grow'
      />
      <i className='fas fa-search text-secondary-light ml-2'></i>
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export default SearchBar;