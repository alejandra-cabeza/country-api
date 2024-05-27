import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';

function ControlButtons({ onResetClick, searchTerm, handleButtonClick, selectedCountries }) {
  return (
    <div className='flex justify-center md:justify-end w-full md:w-auto my-4'>
      <Button
        onClick={onResetClick}
        disabled={!searchTerm && !selectedCountries?.length}
        label='Reset selected countries'
        type={'secondary'}
      > Reset</Button>
      <Button
        onClick={handleButtonClick}
        disabled={!selectedCountries?.length}
        type={'primary'}
        label='Show selected countries'
      >Show Selected</Button>
    </div>
  );
}

ControlButtons.propTypes = {
  onResetClick: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  selectedCountries: PropTypes.array.isRequired,
};

export default ControlButtons;