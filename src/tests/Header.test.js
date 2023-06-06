import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';
// import Wallet from '../pages/Wallet';
import {
  EMAIL_FIELD_TEST_ID,
  TOTAL_FIELD_TEST_ID,
  HEADER_CURRENCY_FIELD_TEST_ID,
  EMAIL_INPUT_TEST_ID,
  PASSWORD_INPUT_TEST_ID,
  VALID_FORMAT_EMAIL,
  VALID_FORMAT_PASSWORD,
} from './constants';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import loginIntoWallet from './Login.test';

let globalFetchSpy = () => {};

const fillWalletForm = ([value, description, currency, method, tag]) => {
  const valueInput = screen.getByRole('spinbutton', {
    name: /valor da despesa:/i,
  });
  const descriptionInput = screen.getByRole('textbox', {
    name: /descrição da despesa:/i,
  });
  const currencyInput = screen.getByRole('combobox', {
    name: /moeda:/i,
  });
  const methodInput = screen.getByRole('combobox', {
    name: /método de pagamento:/i,
  });
  const tagInput = screen.getByRole('combobox', {
    name: /tag:/i,
  });

  // userEvent.type(valueInput, 12);
  fireEvent.change(valueInput, { target: { value } });
  expect(valueInput).toHaveValue(value);

  userEvent.type(descriptionInput, description);
  expect(descriptionInput).toHaveValue(description);

  userEvent.selectOptions(currencyInput, currency);
  expect(currencyInput).toHaveValue(currency);

  userEvent.selectOptions(methodInput, method);
  expect(methodInput).toHaveValue(method);

  userEvent.selectOptions(tagInput, tag);
  expect(tagInput).toHaveValue(tag);
};

const loginIntoWallet = () => {
  globalFetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

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

describe('Testes do componente <Header.jsx />', () => {
  beforeAll(() => {
    // const globalFetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  beforeEach(() => {
    loginIntoWallet();
  });

  it('testa se o componente Header é renderizado corretamente após realidado o Login', () => {
    expect(globalFetchSpy).toHaveBeenCalledTimes(1);

    const emailField = screen.getByTestId(EMAIL_FIELD_TEST_ID);
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    const headerCurrencyField = screen.getByTestId(HEADER_CURRENCY_FIELD_TEST_ID);

    expect(emailField).toHaveTextContent(`Email: ${VALID_FORMAT_EMAIL}`);
    expect(totalField).toHaveTextContent('0.00');
    expect(headerCurrencyField).toHaveTextContent('BRL');
  });

  it('testa se a Despesa Total é atualizada corretamente após adicionar e remover despesas', async () => {
    expect(globalFetchSpy).toHaveBeenCalledTimes(1);

    const loadingElement = screen.queryByText('Loading');

    // await waitForElementToBeRemoved(() => loadingElement);

    await waitFor(() => {
      expect(loadingElement).not.toBeInTheDocument();
    });

    fillWalletForm([12, 'Desc One', 'USD', 'Dinheiro', 'Lazer']);
  });
});
