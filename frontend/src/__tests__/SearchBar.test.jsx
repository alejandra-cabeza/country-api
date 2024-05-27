import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/CountryList/SearchBar';

describe('SearchBar', () => {
  const mockOnSearchTermChange = jest.fn();

  const renderSearchBar = (props) => {
    const defaultProps = {
      searchTerm: '',
      onSearchTermChange: mockOnSearchTermChange,
    };

    return render(<SearchBar {...defaultProps} {...props} />);
  };

  it('renders correctly', () => {
    const { getByPlaceholderText } = renderSearchBar();

    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onChange handler when input changes', () => {
    const { getByPlaceholderText } = renderSearchBar();

    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'test' } });
    expect(mockOnSearchTermChange).toHaveBeenCalledWith('test');
  });

  it('calls onSubmit handler when form is submitted', () => {
    const { getByPlaceholderText } = renderSearchBar();

    fireEvent.submit(getByPlaceholderText('Search...'));
    expect(mockOnSearchTermChange).toHaveBeenCalled();
  });
});