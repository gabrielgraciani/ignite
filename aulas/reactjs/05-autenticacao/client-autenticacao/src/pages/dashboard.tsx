import { useEffect } from 'react';
import { Can } from '../components/Can';
import { useAuth } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard(): JSX.Element {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api
      .get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <h1>dashboard: {user?.email}</h1>

      <button type="button" onClick={signOut}>
        Sign Out
      </button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {},
  };
});
