import React from 'react';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImages } from './styles';

export function CarDetails(): JSX.Element {
  return (
    <Container>
      <Header>
        <Button onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
          ]}
        />
      </CarImages>
    </Container>
  );
}
