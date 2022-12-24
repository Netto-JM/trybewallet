import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  EMAIL_INPUT_TEST_ID,
  PASSWORD_INPUT_TEST_ID,
  VALID_FORMAT_EMAIL,
  VALID_FORMAT_PASSWORD,
  EMAIL_FIELD_TEST_ID,
  TOTAL_FIELD_TEST_ID,
  HEADER_CURRENCY_FIELD_TEST_ID,
} from './constants';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const loginIntoWallet = () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
  const submitButton = screen.getByRole('button', { name: /entrar/i });

  userEvent.type(emailInput, VALID_FORMAT_EMAIL);
  userEvent.type(passwordInput, VALID_FORMAT_PASSWORD);

  userEvent.click(submitButton);
  expect(history.location.pathname).toBe('/carteira');
};

describe('Testes do componente <Header.jsx />', () => {
  beforeEach(() => {
    loginIntoWallet();
  });

  it('testa se o componente Header é renderizado corretamente após realidado o Login', () => {
    const emailField = screen.getByTestId(EMAIL_FIELD_TEST_ID);
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    const headerCurrencyFIeld = screen.getByTestId(HEADER_CURRENCY_FIELD_TEST_ID);

    expect(emailField).toHaveTextContent(`Email: ${VALID_FORMAT_EMAIL}`);
    expect(totalField).toHaveTextContent('0.00');
    expect(headerCurrencyFIeld).toHaveTextContent('BRL');
  });
});

export default loginIntoWallet;
