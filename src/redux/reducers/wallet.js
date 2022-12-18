import {
  FETCH_EXCHANGE_RATES_STARTED,
  FETCH_EXCHANGE_RATES_SUCCESSFUL,
  FETCH_EXCHANGE_RATES_FAILED,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: '',
  currencies: [],
  total: 0,
  expenses: [],
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const filterExpenses = ({ expenses }, id) => (
  [...expenses.filter((expense) => expense.id !== id)]
);

const reorganizeExpenses = (expenses) => (
  expenses.map((expense, index) => ({ ...expense, id: index }))
);

const findExpense = ({ expenses }, id) => expenses.find((expense) => expense.id === id);

const findValue = ({ value, exchangeRates, currency }) => (
  value * exchangeRates[currency].ask
);

const findTotalAfterEdit = (state, newExpense) => (
  state.total - (findValue(findExpense(state, state.idToEdit)) - findValue(newExpense))
);

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case FETCH_EXCHANGE_RATES_STARTED:
    return { ...state, isFetching: true, errorMessage: '' };
  case FETCH_EXCHANGE_RATES_SUCCESSFUL:
    return { ...state, isFetching: false, errorMessage: '', currencies: payload };
  case FETCH_EXCHANGE_RATES_FAILED:
    return { ...state, isFetching: false, errorMessage: payload };
  case SAVE_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses, payload],
      total: state.total + (payload.value * payload.exchangeRates[payload.currency].ask),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: reorganizeExpenses(filterExpenses(state, payload)),
      total: state.total - (findValue(findExpense(state, payload))),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: [...filterExpenses(state, state.idToEdit), payload],
      total: findTotalAfterEdit(state, payload),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
