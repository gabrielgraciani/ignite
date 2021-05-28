import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container, 
  Header, 
  UserWrapper, 
  UserInfo, 
  Photo, 
  User, 
  UserGreeting, 
  UserName, 
  Icon, 
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: 'vendas', icon: 'dollar-sign' },
      date: "13/04/2021",
    },
    {
      id: '2',
      type: 'negative',
      title: "Desenvolvimento de site",
      amount: "R$ 59,00",
      category: { name: 'Alimentação', icon: 'coffee' },
      date: "13/04/2021",
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel",
      amount: "R$ 1.000,00",
      category: { name: 'Casa', icon: 'shopping-bag' },
      date: "13/04/2021",
    }
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/42574064?v=4' }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Gabriel</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          title="Entradas" 
          amount="R$ 17.000,00" 
          lastTransaction="última entrada dia 13 de abril" 
          type="up"
        />
        <HighlightCard 
          title="Saídas" 
          amount="R$ 17.000,00" 
          lastTransaction="última saída dia 13 de abril" 
          type="down"
        />
        <HighlightCard 
          title="Total" 
          amount="R$ 00" 
          lastTransaction="01 à 16 de abril" 
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList 
          data={data} 
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />} 
        />

      </Transactions>
    </Container>
  )
}