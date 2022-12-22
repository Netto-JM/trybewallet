import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, saveExpense } from '../redux/actions';

function WalletForm(props) {
  const [expenseValue, setExpenseValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [exchangeRates, setExchangeRates] = useState([]);

  const { dispatch, currencies, editor, expenses, idToEdit } = props;

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (editor) {
      const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
      setExpenseValue(expenseToEdit.value);
      setDescription(expenseToEdit.description);
      setCurrency(expenseToEdit.currency);
      setMethod(expenseToEdit.method);
      setTag(expenseToEdit.tag);
      setExchangeRates(expenseToEdit.exchangeRates);
    }
  }, [editor, expenses, idToEdit]);

  const currencyOptions = currencies.map((currencyOption) => (
    <option key={ currencyOption } value={ currencyOption }>{ currencyOption }</option>
  ));

  const addExpense = () => {
    const newExpense = {
      value: expenseValue,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    dispatch(saveExpense(newExpense, editor));

    setExpenseValue('');
    setDescription('');
    setExchangeRates([]);
  };

  return (
    <form>
      <label htmlFor="value-input">
        Valor da despesa:
        {' '}
        <input
          type="number"
          data-testid="value-input"
          id="value-input"
          onChange={ ({ target: { value } }) => { setExpenseValue(value); } }
          value={ expenseValue }
        />
      </label>
      <label htmlFor="description-input">
        Descrição da despesa:
        {' '}
        <input
          type="text"
          data-testid="description-input"
          id="description-input"
          onChange={ ({ target: { value } }) => { setDescription(value); } }
          value={ description }
        />
      </label>
      <label htmlFor="currency-input">
        Moeda:
        {' '}
      </label>
      <select
        data-testid="currency-input"
        id="currency-input"
        onChange={ ({ target: { value } }) => { setCurrency(value); } }
        value={ currency }
      >
        { currencyOptions }
      </select>
      <label htmlFor="method-input">
        Método de pagamento:
        {' '}
        <select
          data-testid="method-input"
          id="method-input"
          onChange={ ({ target: { value } }) => { setMethod(value); } }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag-input">
        Tag:
        {' '}
        <select
          data-testid="tag-input"
          id="tag-input"
          onChange={ ({ target: { value } }) => { setTag(value); } }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button
        type="button"
        data-testid="button-submit"
        onClick={ addExpense }
      >
        {editor ? 'Editar Despesa' : 'Adicionar Despesa'}
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  isFetching: state.wallet.isFetching,
  errorMessage: state.wallet.errorMessage,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
