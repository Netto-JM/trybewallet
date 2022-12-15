export const SAVE_USER = 'SAVE_USER';
export const FETCH_CURRENCIES_STARTED = 'FETCH_CURRENCIES_STARTED';
export const FETCH_CURRENCIES_SUCCESSFUL = 'FETCH_CURRENCIES_SUCCESSFUL';
export const FETCH_CURRENCIES_FAILED = 'FETCH_CURRENCIES_FAILED';
export const SAVE_EXPENSE_STARTED = 'SAVE_EXPENSE_STARTED';
export const SAVE_EXPENSE_SUCCESSFUL = 'SAVE_EXPENSE_SUCCESSFUL';
export const SAVE_EXPENSE_FAILED = 'SAVE_EXPENSE_FAILED';

export const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});

const fetchCurrenciesStarted = () => ({
  type: FETCH_CURRENCIES_STARTED,
});

const fetchCurrenciesSuccessful = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESSFUL,
  payload: currencies,
});

const fetchCurrenciesFailed = (error) => ({
  type: FETCH_CURRENCIES_FAILED,
  payload: error,
});

const saveExpenseStarted = () => ({
  type: SAVE_EXPENSE_STARTED,
});

const saveExpenseSuccessful = (expenseAndRates) => ({
  type: SAVE_EXPENSE_SUCCESSFUL,
  payload: expenseAndRates,
});

const saveExpenseFailed = (error) => ({
  type: SAVE_EXPENSE_FAILED,
  payload: error,
});

const fetchExchangeRates = async () => {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
};

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchCurrenciesStarted());
  try {
    const excRates = await fetchExchangeRates();
    const currencies = Object.keys(excRates).filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrenciesSuccessful(currencies));
  } catch (error) {
    dispatch(fetchCurrenciesFailed(error));
  }
};

export const saveExpense = (newExpense) => async (dispatch) => {
  dispatch(saveExpenseStarted());
  try {
    const exchangeRates = await fetchExchangeRates();
    const expenseAndRates = { ...newExpense, exchangeRates: { ...exchangeRates } };
    dispatch(saveExpenseSuccessful(expenseAndRates));
  } catch (error) {
    dispatch(saveExpenseFailed(error));
  }
};
