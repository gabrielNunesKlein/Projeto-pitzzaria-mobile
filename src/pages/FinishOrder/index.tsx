import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPromiseList } from "../../routes/app.routes";



type RouteDetailProps = {
    FinishOrder: {
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProps = RouteProp<RouteDetailProps, "FinishOrder">;

export function FinishOrder(){

    const route = useRoute<FinishOrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackPromiseList>>();

    async function handleFinshOrder(){
        try {
            await api.put("/order/send", {
                order_id: route.params?.order_id
            });

            navigation.popToTop();
        } catch(err){
            console.log("Error")
        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.alert}>
                Você deseja finalizar esse pedido ?
            </Text>
            <Text style={styles.title}>Mesa { route.params?.number }</Text>
            <TouchableOpacity onPress={handleFinshOrder} style={styles.button}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather name="shopping-cart" size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    alert: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 'bold',
        marginBottom: 12
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 12
    },

    button: {
        backgroundColor: "#3fffa3",
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },

    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: "#1d1d2e"
    }
})