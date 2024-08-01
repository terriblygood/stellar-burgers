import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../services/slices';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerError } = useSelector((state) => state.user);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ name: userName, email, password })).unwrap();
      navigate('/profile', { replace: true });
    } catch (_) {}
  };

  return (
    <RegisterUI
      errorText={registerError?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
