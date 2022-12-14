import {
  FETCH_CURRENCIES_STARTED,
  FETCH_CURRENCIES_SUCCESSFUL,
  FETCH_CURRENCIES_FAILED,
} from '../actions';

const INITIAL_STATE = {
  isFetchingCurrencies: false,
  errorMessageCurrencies: '',
  currencies: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case FETCH_CURRENCIES_STARTED:
    return {
      ...state,
      isFetchingCurrencies: true,
      errorMessageCurrencies: '',
      currencies: [],
    };
  case FETCH_CURRENCIES_SUCCESSFUL:
    return {
      ...state,
      isFetchingCurrencies: false,
      errorMessageCurrencies: '',
      currencies: payload,
    };
  case FETCH_CURRENCIES_FAILED:
    return {
      ...state,
      isFetchingCurrencies: false,
      errorMessageCurrencies: payload,
      currencies: [],
    };
  default:
    return state;
  }
};

export default wallet;
