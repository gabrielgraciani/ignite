import React from 'react';

import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: string;
}

export function Button({ color, title, ...rest }: Props): JSX.Element {
  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}
