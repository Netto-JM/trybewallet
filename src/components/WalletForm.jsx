import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

function WalletForm(props) {
  const [expenseValue, setExpenseValue] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  const { dispatch, currencies } = props;

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const currencyOptions = currencies.map((currency) => (
    <option key={ currency } value={ currency }>{ currency }</option>
  ));

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
        onChange={ ({ target: { value } }) => { setSelectedCurrency(value); } }
        value={ selectedCurrency }
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
    </form>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetchingCurrencies,
  errorMessage: state.wallet.errorMessageCurrencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
