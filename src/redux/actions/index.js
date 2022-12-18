export const SAVE_USER = 'SAVE_USER';
export const FETCH_EXCHANGE_RATES_STARTED = 'FETCH_EXCHANGE_RATES_STARTED';
export const FETCH_EXCHANGE_RATES_SUCCESSFUL = 'FETCH_EXCHANGE_RATES_SUCCESSFUL';
export const FETCH_EXCHANGE_RATES_FAILED = 'FETCH_EXCHANGE_RATES_FAILED';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

export const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});

const fetchExchangeRatesStarted = () => ({
  type: FETCH_EXCHANGE_RATES_STARTED,
});

const fetchExchangeRatesSuccessful = (currencies) => ({
  type: FETCH_EXCHANGE_RATES_SUCCESSFUL,
  payload: currencies,
});

const fetchExchangeRatesFailed = (error) => ({
  type: FETCH_EXCHANGE_RATES_FAILED,
  payload: error,
});

const saveExpenseAndRates = (expenseAndRates, editor) => ({
  type: editor ? SAVE_EDITED_EXPENSE : SAVE_EXPENSE,
  payload: expenseAndRates,
});

const fetchExchangeRates = async () => {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
};

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchExchangeRatesStarted());
  try {
    const excRates = await fetchExchangeRates();
    const currencies = Object.keys(excRates).filter((currency) => currency !== 'USDT');
    dispatch(fetchExchangeRatesSuccessful(currencies));
  } catch (error) {
    dispatch(fetchExchangeRatesFailed(error));
  }
};

export const saveExpense = (newExpense, editor) => async (dispatch) => {
  if (editor) {
    dispatch(saveExpenseAndRates(newExpense, editor));
    return;
  }
  dispatch(fetchExchangeRatesStarted());
  try {
    const exchangeRates = await fetchExchangeRates();
    const expenseAndRates = { ...newExpense, exchangeRates: { ...exchangeRates } };
    dispatch(saveExpenseAndRates(expenseAndRates, editor));
  } catch (error) {
    dispatch(fetchExchangeRatesFailed(error));
  }
};

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (idToEdit) => ({
  type: EDIT_EXPENSE,
  payload: idToEdit,
});
