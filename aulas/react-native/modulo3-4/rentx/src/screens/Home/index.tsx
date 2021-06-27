import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';

import { api } from '../../services/api';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';
import { CarDTO } from '../../dtos/CarDTO';

export function Home(): JSX.Element {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, seIstLoading] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          seIstLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!isLoading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
