import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

function WalletForm(props) {
  const [expenseValue, setExpenseValue] = useState('');
  const [description, setDescription] = useState('');

  const { dispatch, currencies } = props;

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  console.log('currencies', currencies);

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
