import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, InputText, IconContainer } from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  type?: 'text' | 'password';
  value?: string;
}

export function Input({
  iconName,
  type = 'text',
  value,
  editable = true,
  ...rest
}: InputProps): JSX.Element {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused} editable={editable}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        {...rest}
        secureTextEntry={type === 'password' ? isPasswordVisible : false}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        editable={editable}
      />

      {type === 'password' && (
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <IconContainer isFocused={isFocused} editable={editable}>
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text_detail}
            />
          </IconContainer>
        </BorderlessButton>
      )}
    </Container>
  );
}
