import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { useFocusEffect } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/auth';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  ChartContainer,
  Content,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadContainer
} from './styles';
import { categories } from '../../utils/categories';
import { ActivityIndicator } from 'react-native';

interface TransactionData {
    type: 'up' | 'down';
    name: string;
    amount: string;
    category: String;
    date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

export function Resume() {
  const theme = useTheme();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type == 'down' && new Date(expensive.date).getMonth() === selectedDate.getMonth() && new Date(expensive.date).getFullYear() === selectedDate.getFullYear())

    const expensivesTotal = expensives.reduce((accumulator: number, expensive: TransactionData) => {
      return accumulator + Number(expensive.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {

        if (expensive.category == category.key) {
          categorySum += Number(expensive.amount);
        }

      });

      if (categorySum > 0) {

        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = (categorySum / expensivesTotal * 100);
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
          percentFormatted
        })
      }

    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  };

  function handleChangeDate(action: 'next' | 'prev') {

    if (action === 'next') {

      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)

    } else {

      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)

    }
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('prev')}>
              <SelectIcon name="chevron-left"/>
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMMM, yyy', { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <SelectIcon name="chevron-right"/>
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: { 
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              labelRadius={103}
              x="percentFormatted"
              y="total"
            />
          </ChartContainer>


          {     
            totalByCategories.reverse().map(item => (
              <HistoryCard
                key={item.key}
                color={item.color}
                title={item.name}
                amount={item.totalFormatted}
              />
            ))
          }
        </Content>
      }
    </Container>

  )
}