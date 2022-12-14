import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

function WalletForm(props) {
  const [expenseValue, setExpenseValue] = useState('');
  const [description, setDescription] = useState('');

  const { dispatch } = props;

  useEffect(() => {
    dispatch();
  }, [dispatch]);

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
  email: state.user.email, // ainda vou alterar isto
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
