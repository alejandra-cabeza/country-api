import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ToolBar from '../components/CountryList/ToolBar';

describe('ToolBar', () => {
  const mockOnResetClick = jest.fn();
  const mockHandleButtonClick = jest.fn();
  const mockOnSearchTermChange = jest.fn();

  const props = {
    onResetClick: mockOnResetClick,
    handleButtonClick: mockHandleButtonClick,
    searchTerm: '',
    onSearchTermChange: mockOnSearchTermChange,
    selectedCountries: [],
  };

  it('renders without crashing', () => {
    render(<ToolBar {...props} />);
  });

  it('calls onSearchTermChange when typing in the search bar', () => {
    const { getByPlaceholderText } = render(<ToolBar {...props} />);
    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Canada' } });
    expect(mockOnSearchTermChange).toHaveBeenCalledWith('Canada');
  });

});