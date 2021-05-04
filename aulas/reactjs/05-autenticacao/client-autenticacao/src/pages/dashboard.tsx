import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function Dashboard(): JSX.Element {
  const { user } = useAuth();

  useEffect(() => {
    api.get('/me').then(response => console.log(response));
  }, []);
  return <h1>dashboard: {user?.email}</h1>;
}
