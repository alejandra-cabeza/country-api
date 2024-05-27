import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ControlButtons from '../components/CountryList/ControlButtons';

describe('ControlButtons', () => {
  const mockReset = jest.fn();
  const mockShowSelected = jest.fn();

  const renderControlButtons = (props) => {
    const defaultProps = {
      selectedCountries: [{ code: 'AR', name: 'Argentina' }],
      handleButtonClick: mockShowSelected,
      onResetClick: mockReset,
    };

    return render(<ControlButtons {...defaultProps} {...props} />);
  };

  it('disables the buttons when there are no selected countries', () => {
    const { getByLabelText } = renderControlButtons({ selectedCountries: [] });

    expect(getByLabelText('Reset selected countries')).toBeDisabled();
    expect(getByLabelText('Show selected countries')).toBeDisabled();
  });

  it('enables the buttons when there are selected countries', () => {
    const { getByLabelText } = renderControlButtons();

    expect(getByLabelText('Reset selected countries')).not.toBeDisabled();
    expect(getByLabelText('Show selected countries')).not.toBeDisabled();
  });

  it('calls the correct function when each button is clicked', () => {
    const { getByLabelText } = renderControlButtons();


    fireEvent.click(getByLabelText('Reset selected countries'));
    expect(mockReset).toHaveBeenCalled();

    fireEvent.click(getByLabelText('Show selected countries'));
    expect(mockShowSelected).toHaveBeenCalled();
  });

  it('calls show an alert when "Show selected countries" is clicked', () => {
    const { getByLabelText } = renderControlButtons();

    fireEvent.click(getByLabelText('Show selected countries'));
    expect(mockShowSelected).toHaveBeenCalled();
  });
});