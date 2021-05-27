import React, { useState } from 'react';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { 
  Container, 
  Header, 
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsTypes>
            <TransactionTypeButton title="Income" type="up" isActive={transactionType === 'up'} onPress={() => handleTransactionsTypeSelect('up')} />
            <TransactionTypeButton title="Outcome" type="down" isActive={transactionType === 'down'} onPress={() => handleTransactionsTypeSelect('down')} />
          </TransactionsTypes>

          <CategorySelectButton title="Categoria" onPress={() => {}} />
        </Fields>

        <Button title="Enviar" onPress={() => {}} />
      </Form>
    </Container>
  )
}