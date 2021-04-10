import { useQuery, UseQueryResult } from 'react-query';
import { api } from '../api';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUsers(): Promise<User[]> {
  const { data: responseData } = await api.get('users');

  const users = responseData.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return users;
}

export function useUsers(): UseQueryResult<User[], unknown> {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // 5 seconds
  });
}
