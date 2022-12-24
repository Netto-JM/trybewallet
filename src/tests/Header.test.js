import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import {
  VALID_FORMAT_EMAIL,
  EMAIL_FIELD_TEST_ID,
  TOTAL_FIELD_TEST_ID,
  HEADER_CURRENCY_FIELD_TEST_ID,
} from './constants';
// import { renderWithRouterAndRedux } from './helpers/renderWith';
import loginIntoWallet from './Login.test';

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
