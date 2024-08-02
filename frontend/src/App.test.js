import { screen} from '@testing-library/react';

import App from './App';
import { renderWithProviders } from './setupTests'

describe("renders", () => {
  it("will return a snapshot", () => {
    const view = renderWithProviders(
        <App />
    );
    expect(view).toMatchSnapshot();
  });

 it('renders app name', () => {
    renderWithProviders(<App />);
    const name = screen.getByText(/Taskie/i);
    expect(name).toBeInTheDocument();
  });
});

