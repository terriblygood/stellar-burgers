import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/slices';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { loginError } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();

      navigate(from.pathname, { replace: true });
    } catch (_) {}
  };

  return (
    <LoginUI
      errorText={loginError?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
