import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import ControlButtons from './ControlButtons';

function ToolBar({ onResetClick, handleButtonClick, searchTerm, onSearchTermChange, selectedCountries }) {
  return (
    <div className='block md:flex justify-between mb-4'>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />
      <ControlButtons onResetClick={onResetClick} searchTerm={searchTerm} handleButtonClick={handleButtonClick} selectedCountries={selectedCountries} />
    </div>
  );
}

ToolBar.propTypes = {
  onResetClick: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
  selectedCountries: PropTypes.array.isRequired,
};

export default ToolBar;
