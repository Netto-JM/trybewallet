export const SAVE_USER = 'SAVE_USER';
export const FETCH_CURRENCIES_STARTED = 'FETCH_CURRENCIES_STARTED';
export const FETCH_CURRENCIES_SUCCESSFUL = 'FETCH_CURRENCIES_SUCCESSFUL';
export const FETCH_CURRENCIES_FAILED = 'FETCH_CURRENCIES_FAILED';

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

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchCurrenciesStarted());
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrenciesSuccessful(currencies));
  } catch (error) {
    dispatch(fetchCurrenciesFailed(error));
  }
};
