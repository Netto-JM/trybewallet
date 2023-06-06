import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../redux/actions';
import '../styles/tailwind.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const history = useHistory();

  const submitHandle = (event) => {
    event.preventDefault();
    const { dispatch } = props;
    dispatch(saveUser(email));
    history.push('/carteira');
  };

  useEffect(() => {
    const MIN_PASS_LENGTH = 6;
    const isValidPassword = password.length >= MIN_PASS_LENGTH;
    const validEmailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const isValidEmail = validEmailRegex.test(email);
    const isValidInfo = isValidPassword && isValidEmail;
    setIsDisable(!isValidInfo);
  }, [email, password]);

  return (
    <div>
      <form>
        <input
          className="px-2 py-10"
          type="email"
          placeholder="Email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => { setEmail(value); } }
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => { setPassword(value); } }
        />
        <button
          className="px-2 py-10 bg-black"
          type="submit"
          disabled={ isDisable }
          onClick={ submitHandle }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
