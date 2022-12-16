import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Table(props) {
  const { expenses } = props;

  const expensesTable = expenses
    .map(({ id, value, description, currency, method, tag, exchangeRates }) => (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ (+value).toFixed(2) }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ (+exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
        <td>Real</td>
      </tr>
    ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>{expensesTable}</tbody>
    </table>
  );
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      exchangeRates: PropTypes.shape(PropTypes.shape).isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
