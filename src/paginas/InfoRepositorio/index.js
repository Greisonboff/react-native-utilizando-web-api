import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { salvarRepositorios, deletarRepositorio } from '../../servicos/requisicoes/repositoris';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);

    async function salvar() {
        const resultado = await salvarRepositorios(
            route.params.item.postId,
            nome,
            data,
            route.params.item.id
        );

        if (resultado === 'sucesso') {
            Alert.alert('Repositorio atualizado')
            console.log('Repositorio atualizado')
            navigation.goBack()
        } else {
            Alert.alert('Erro ao atualizar')
            console.log('Erro ao atualizar')
        }
    }

    async function deletar() {
        const resultado = await deletarRepositorio(route.params.item.id);

        if (resultado === 'sucesso') {
            Alert.alert('Repositorio deletado')
            console.log('Repositorio deletado')
            navigation.goBack()
        } else {
            Alert.alert('Erro ao deletar')
            console.log('Erro ao deletar')
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity
                style={estilos.botao}
                onPress={salvar}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[estilos.botao, { backgroundColor: '#DD2B2B', marginTop: 10 }]}
                onPress={deletar}
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
