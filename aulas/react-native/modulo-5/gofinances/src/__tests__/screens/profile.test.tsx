import React from 'react';
import {render} from '@testing-library/react-native'

import {Profile} from '../../screens/Profile'

describe("Profile screen", () => {
  it('should be correctly placeholder input user name', () => {
    const { getByPlaceholderText} = render(<Profile />);
  
    const inputName = getByPlaceholderText('Nome');
    const inputSurname = getByPlaceholderText('Sobrenome');
  
    expect(inputName).toBeTruthy();
    expect(inputSurname).toBeTruthy();
  });

  it('should be load user data', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Gabriel');
    expect(inputSurname.props.value).toEqual('Graciani');
  })
})