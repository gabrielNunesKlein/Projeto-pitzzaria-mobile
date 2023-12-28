import React, { useContext, useState } from 'react';
import { Button, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { AuthContext } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPromiseList } from '../../routes/app.routes';

export const Dashboard = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackPromiseList>>();
    const [number, setNumber] = useState('')

    async function openOrder(){
        if(number == ''){
            return;
        }

        const response = await api.post('/order', {
            table: Number(number)
        })

        navigation.navigate('Order', 
            { number: number, order_id: response.data.id });

        setNumber('');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Novo Pedido
            </Text>
            <TextInput 
                placeholder="Numero da mesa"
                placeholderTextColor="#fff"
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />
            <TouchableOpacity onPress={openOrder} style={styles.button}>
                <Text style={styles.buttonText}>
                    Abrir mesa
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: "#1d1d2e"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'
    },

    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})