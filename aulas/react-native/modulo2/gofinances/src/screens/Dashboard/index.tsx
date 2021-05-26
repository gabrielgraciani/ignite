import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards } from './styles';

export function Dashboard() {
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

          <Icon name="power" />
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
    </Container>
  )
}