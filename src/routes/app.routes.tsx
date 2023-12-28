import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dashboard }  from '../pages/Dashboard';
import Order from "../pages/Order";
import { FinishOrder } from "../pages/FinishOrder";

export type StackPromiseList = {
    Dashboard: undefined;
    Order: {
        number: number | string,
        order_id: string
    },
    FinishOrder: {
        number: number | string;
        order_id: string;
    }
}

const Stack = createNativeStackNavigator<StackPromiseList>();

function AppRoutes(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
            options={{ headerShown: false}}
            name="Dashboard" component={Dashboard} />
    
    <Stack.Screen 
            options={{ headerShown: false}}
            name="Order" component={Order} />
            
    <Stack.Screen 
            options={{
                title: 'Finalizando',
                headerStyle: {
                    backgroundColor: '#1d1d2e'
                },
                headerTintColor: '#fff'
            }}
            name="FinishOrder" component={FinishOrder} />

            
        </Stack.Navigator>
    )
}

export default AppRoutes;