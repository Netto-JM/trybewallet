import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente <Table.jsx />', () => {
  it('Testa se a página de Login é carregada assim que a aplicação é renderizada na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    screen.getByTestId(EMAIL_TEST_ID);
    screen.getByTestId(PASSWORD_TEST_ID);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeDisabled();
  });
});
