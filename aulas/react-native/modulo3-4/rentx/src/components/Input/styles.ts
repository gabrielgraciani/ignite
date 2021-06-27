import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

interface Props {
  isFocused: boolean;
  editable: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, editable }) =>
    editable ? theme.colors.background_secondary : theme.colors.shape};
  border-color: transparent;
  border-width: 2px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<Props>`
  background: red;
  flex: 1;
  background-color: ${({ theme, editable }) =>
    editable ? theme.colors.background_secondary : theme.colors.shape};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 24px;
  margin-left: 2px;
  border-color: transparent;
  border-width: 2px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
    `}
`;
