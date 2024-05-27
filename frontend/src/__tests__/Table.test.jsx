import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Table from '../components/CountryList/Table';

const countriesReturnValue = [
  { code: 'AR', name: 'Argentina' },
  { code: 'CA', name: 'Canada' },
];

describe('Table', () => {
  let getAllByRole, getAllByLabelText;
  const mockHandleCheckboxChange = jest.fn();

  beforeEach(() => {
    const renderResult = render(
      <Table
        fetchedCountries={countriesReturnValue}
        selectedCountries={countriesReturnValue}
        handleCheckboxChange={mockHandleCheckboxChange}
      />
    );

    getAllByRole = renderResult.getAllByRole;
    getAllByLabelText = renderResult.getAllByLabelText;
  });

  it('renders countries', () => {
    const checkboxes = getAllByRole('checkbox');

    // fetchedCountries + selectedCountries
    expect(checkboxes.length).toBe(countriesReturnValue.length * 2);
  });

  it('adds and removes countries from selectedCountries when handleCheckboxChange is called', async () => {
    const checkbox1 = await waitFor(() => getAllByLabelText('Select Argentina')[0]);
    const checkbox2 = await waitFor(() => getAllByLabelText('Select Canada')[0]);

    fireEvent.click(checkbox1);
    expect(checkbox1.checked).toEqual(true);

    fireEvent.click(checkbox2);
    expect(checkbox2.checked).toEqual(true);

    fireEvent.click(checkbox1);
    expect(checkbox1.checked).toEqual(true);
  });
});