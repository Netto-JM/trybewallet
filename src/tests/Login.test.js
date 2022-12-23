import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente <Login.jsx />', () => {
  const EMAIL_TEST_ID = 'email-input';
  const PASSWORD_TEST_ID = 'password-input';
  it('Testa se a página de Login é carregada assim que a aplicação é renderizada na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    screen.getByTestId(EMAIL_TEST_ID);
    screen.getByTestId(PASSWORD_TEST_ID);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    expect(submitButton).toBeDisabled();
    expect(history.location.pathname).toBe('/');
  });
});
