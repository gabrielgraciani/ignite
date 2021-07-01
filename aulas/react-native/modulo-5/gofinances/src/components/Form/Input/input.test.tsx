import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../../global/styles/theme';

import { Input } from '.'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Input component', () => {
  it('must have specific border color when active', () => {
    const { getByTestId } = render(
      <Input testID="input-email" placeholder="E-mail" keyboardType="email-address" active />,
      {
        wrapper: Providers
      }
    );

    const input = getByTestId('input-email');
    expect(input.props.style[0].borderColor).toEqual(theme.colors.attention);
    expect(input.props.style[0].borderWidth).toEqual(3);
  });
})