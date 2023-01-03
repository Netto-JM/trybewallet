import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { ENDPOINT } from '../redux/actions';
import mockFetch from '../__mocks__/mockFetch';
import {
  EMAIL_INPUT_TEST_ID,
  PASSWORD_INPUT_TEST_ID,
  VALID_FORMAT_EMAIL,
  VALID_FORMAT_PASSWORD,
} from './constants';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const loginIntoWallet = () => {
  const { history, store } = renderWithRouterAndRedux(<App />);

  const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
  const submitButton = screen.getByRole('button', { name: /entrar/i });

  userEvent.type(emailInput, VALID_FORMAT_EMAIL);
  expect(emailInput.value).toBe(VALID_FORMAT_EMAIL);

  userEvent.type(passwordInput, VALID_FORMAT_PASSWORD);
  expect(passwordInput.value).toBe(VALID_FORMAT_PASSWORD);

  userEvent.click(submitButton);

  return { history, store };
};

describe('Testes do componente <Login.jsx />', () => {
  it('testa se a página de Login é carregada assim que a aplicação é renderizada na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    screen.getByTestId(EMAIL_INPUT_TEST_ID);
    screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    expect(submitButton).toBeDisabled();
  });

  it('testa se o email é aceito apenas em um formato valido', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(passwordInput, VALID_FORMAT_PASSWORD);
    expect(submitButton).toBeDisabled();

    userEvent.type(emailInput, 'wrongFormatEmail');
    expect(submitButton).toBeDisabled();
    userEvent.clear(emailInput);

    userEvent.type(emailInput, 'wrongFormat@Email');
    expect(submitButton).toBeDisabled();
    userEvent.clear(emailInput);

    userEvent.type(emailInput, VALID_FORMAT_EMAIL);
    expect(submitButton).not.toBeDisabled();
  });

  it('testa se a senha é aceita apenas em um formato valido', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, VALID_FORMAT_EMAIL);
    expect(submitButton).toBeDisabled();

    userEvent.type(passwordInput, 'wrong');
    expect(submitButton).toBeDisabled();
    userEvent.clear(passwordInput);

    userEvent.type(passwordInput, VALID_FORMAT_PASSWORD);
    expect(submitButton).not.toBeDisabled();
  });

  it('testa se a rota muda para "/carteira" e o email é salvo no estado global ao clicar em entrar com dados válidos', () => {
    const globalFetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history, store } = loginIntoWallet();

    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(VALID_FORMAT_EMAIL);

    expect(globalFetchSpy).toHaveBeenCalledTimes(1);
    expect(globalFetchSpy).toHaveBeenCalledWith(ENDPOINT);
  });
});

export default loginIntoWallet;
