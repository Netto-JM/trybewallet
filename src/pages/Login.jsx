import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const history = useHistory();

  const submitHandle = (event) => {
    event.preventDefault();
    history.push('/carteira');
  };

  useEffect(() => {
    const MIN_PASS_LENGTH = 6;
    setIsDisable(password.length < MIN_PASS_LENGTH);
  }, [email, password]);

  return (
    <div>
      <form>
        <input
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

export default Login;
