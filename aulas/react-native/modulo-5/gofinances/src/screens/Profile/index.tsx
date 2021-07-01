import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export function Profile(): JSX.Element{
 return (
 <View>
   <Text>Perfil</Text>

   <TextInput placeholder="Nome" autoCorrect={false} testID="input-name" value="Gabriel" />
   <TextInput placeholder="Sobrenome" autoCorrect={false} testID="input-surname" value="Graciani" />

   <Button title="Salvar" onPress={() => {}} />
 </View>
 );
}