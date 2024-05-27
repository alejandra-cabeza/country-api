import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/CountryList/Pagination';

describe('Pagination', () => {
  const mockSetCurrentPage = jest.fn();

  const renderPagination = (props) => {
    const defaultProps = {
      currentPage: 1,
      totalPages: 10,
      entriesPerPage: 2,
      handleEntriesChange: jest.fn(),
      setCurrentPage: mockSetCurrentPage,
    };

    return render(<Pagination {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    mockSetCurrentPage.mockReset();
  });

  it('displays the correct page number', () => {
    const { getByText } = renderPagination();

    expect(getByText('Page 1 of 10')).toBeInTheDocument();
  });

  it('disables the "Next" button on the last page', () => {
    const { getByLabelText } = renderPagination({ currentPage: 10 });

    expect(getByLabelText('Next Page')).toBeDisabled();
  });


  it('calls the correct function when the "Next" button is clicked', () => {
    const { getByLabelText } = renderPagination();

    fireEvent.click(getByLabelText('Next Page'));
    expect(mockSetCurrentPage).toHaveBeenCalled();
    expect(typeof mockSetCurrentPage.mock.calls[0][0]).toBe('function');

    const newPage = mockSetCurrentPage.mock.calls[0][0](1);
    expect(newPage).toBe(2);
  });

  it('calls the correct function when the "Previous" button is clicked', () => {
    const { getByLabelText } = renderPagination({ currentPage: 2 });

    fireEvent.click(getByLabelText('Previous Page'));
    expect(mockSetCurrentPage).toHaveBeenCalled();
    expect(typeof mockSetCurrentPage.mock.calls[0][0]).toBe('function');

    const newPage = mockSetCurrentPage.mock.calls[0][0](2);
    expect(newPage).toBe(1);
  });
});