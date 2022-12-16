import {
  FETCH_CURRENCIES_STARTED,
  FETCH_CURRENCIES_SUCCESSFUL,
  FETCH_CURRENCIES_FAILED,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isFetchingCurrencies: false,
  errorMessage: '',
  currencies: [],
  total: 0,
  expenses: [],
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const findExpenseValue = ({ expenses }, id) => {
  const deletedExpense = expenses.find((expense) => expense.id === +id);
  const { value, exchangeRates, currency } = deletedExpense;
  const deletedValue = value * exchangeRates[currency].ask;
  return deletedValue;
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case FETCH_CURRENCIES_STARTED:
    return {
      ...state,
      isFetchingCurrencies: true,
      errorMessage: '',
    };
  case FETCH_CURRENCIES_SUCCESSFUL:
    return {
      ...state,
      isFetchingCurrencies: false,
      errorMessage: '',
      currencies: payload,
    };
  case FETCH_CURRENCIES_FAILED:
    return {
      ...state,
      isFetchingCurrencies: false,
      errorMessage: payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      isFetchingCurrencies: false,
      errorMessage: '',
      expenses: [...state.expenses, payload],
      total: state.total + (payload.value * payload.exchangeRates[payload.currency].ask),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== payload)],
      total: state.total - (findExpenseValue(state, payload)),
    };
  default:
    return state;
  }
};

export default wallet;
