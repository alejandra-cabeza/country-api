import { render } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('renders country list page', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText("Country List");
  expect(titleElement).toBeInTheDocument();
});
