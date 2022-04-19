import React ,{ useEffect, useState }from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Texto = styled.Text`
  fontSize: 20px;
  fontWeight: bold;
  color: #fff;
  marginBottom: 15px;
`;

const Container = styled.View`
  marginTop: 10%;
  paddingTop: 10px;
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: center;
`;

const Input = styled.TextInput`
  width: 350px;
  height: 50px;
  backgroundColor: #eee;
  marginBottom: 15px;
  padding: 15px;
  fontSize: 15px;
  borderRadius: 4px;
`;

const Salvar = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  backgroundColor: #eee;
  marginBottom: 10px
`;

const Exibir = styled.View`
  backgroundColor: #eee;
  width: 90%;
  height: 10%;
`;

const ExibirNome = styled.Text`
  fontSize: 18px;
`;

export default () => {
  const [nome, setNome] = useState('');                //estados adicionar os itens
  const [novoNome, setNovoNome] = useState('');

  const handleSave = async () => {                //função com async pq funções assíncronas precisam sempre ser especificadas
    if (novoNome != '') {                         //se novoNome for diferente de vazio
      await AsyncStorage.setItem('@nome', novoNome);  //setItem precisa de dois parâmetros, o nome que quero e o valor daquilo
      setNovoNome('')                                 //quando digitar no input e enviar o campo de input fica vazio
    }
  }

  const getNome = async () => {                      //uma função para adicionar o item que digito no input
    const n = await AsyncStorage.getItem('@nome');   //getItem só requer um parâmetro, o nome daquilo que quero (se o que quero for laranja, digito @laranja para pegar)
    setNome(n);
  }

  useEffect (() => {                                 //useEffect para chamar minha função getNome
    getNome();
  }, [])

  return (
    <Container>
      <Texto>AsyncStorage</Texto>
      <Input placeholder="Digite um item"
      value={novoNome}
      onChangeText={e=>setNovoNome(e)}
      />
      
      <Salvar onPress={handleSave} />
      <Exibir>
        <ExibirNome>{nome}</ExibirNome>
      </Exibir>
      <StatusBar style="auto" />
    </Container>
  );
}

