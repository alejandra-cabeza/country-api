import { render, fireEvent, waitFor } from '@testing-library/react';
import Home from '../components/CountryList/Home';
import '@testing-library/jest-dom';
import useFetch from '../hooks/useFetch';

jest.mock('../hooks/useFetch');

const countriesReturnValue =
{
  data:
  {
    data: [
      { id: 1, code: 'AR', name: 'Argentina' },
      { id: 2, code: 'CA', name: 'Canada' }
    ],
    meta: {
      current_page: 1,
      last_page: 10
    },
  },
  loading: false,
  error: null,
};

describe('Home', () => {
  beforeEach(() => {
    useFetch.mockReturnValue(countriesReturnValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls useFetch with initial parameters', () => {
    render(<Home />);
    expect(useFetch).toHaveBeenCalledWith("/api/countries", { "page": 1, "per_page": 10});
  });

  it('displays countries returned by useFetch', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Argentina')).toBeInTheDocument();
    expect(getByText('Canada')).toBeInTheDocument();
  });

  it('calls useFetch with updated search parameters when search input changes', async () => {
    const { getByPlaceholderText } = render(<Home />);
    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Canada' } });

    await waitFor(() => {
      expect(useFetch).toHaveBeenCalledWith("/api/countries", { "page": 1, "per_page": 10, "search": "Canada" });
    });
  });

  it('resets the page and disables buttons when "Reset" is clicked', () => {
    const { getByLabelText, getByText, getByPlaceholderText } = render(<Home />);

    fireEvent.click(getByLabelText('Reset selected countries'));
    expect(getByText('Page 1 of 10')).toBeInTheDocument();
    expect(getByLabelText('Reset selected countries')).toBeDisabled();
    expect(getByLabelText('Show selected countries')).toBeDisabled();
    expect(getByPlaceholderText('Search...')).toHaveValue('');
  });

  it('displays loading state', () => {
    useFetch.mockReturnValue({ ...countriesReturnValue, loading: true });
    const { getByText } = render(<Home />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    useFetch.mockReturnValue({ ...countriesReturnValue, error: 'An error occurred' });
    const { getByText } = render(<Home />);
    expect(getByText('Error: An error occurred')).toBeInTheDocument();
  });

  it('displays no countries found state', () => {
    useFetch.mockReturnValue({ ...countriesReturnValue, data: { ...countriesReturnValue.data, data: [] } });
    const { getByText } = render(<Home />);
    expect(getByText('No countries found')).toBeInTheDocument();
  });
});