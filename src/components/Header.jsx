import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Header(props) {
  const { email, total } = props;
  const totalExpenses = Math.abs(total).toFixed(2);
  return (
    <header>
      <span data-testid="email-field">{`Email: ${email} `}</span>
      <span>Despesa Total: R$ </span>
      <span data-testid="total-field">{totalExpenses}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
