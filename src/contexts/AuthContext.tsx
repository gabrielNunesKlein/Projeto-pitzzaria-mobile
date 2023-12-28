import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps,
    isAuth: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {

        async function userInfo(){
            const userInfo = await AsyncStorage.getItem('@sujeitoPitzzaria');

            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
                
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                });
            
            }

            setLoading(false);
        
        
        }

        userInfo();
    })

    const isAuth = !!user.name

    async function signIn({email, password}: SignInProps){
     setLoadingAuth(true);

     try {
        const response = await api.post('/session', {
            email,
            password
        });

        //console.log('data ', response.data)
        const { id, name, token } = response.data

        const data = {
            ...response.data
        };
        
        await AsyncStorage.setItem('@sujeitoPitzzaria', JSON.stringify(data));
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser({
            id,
            name,
            email,
            token
        });

        setLoadingAuth(false);

     } catch(err){
        console.log('error ', err)
        setLoadingAuth(false);
     }
     
    }

    async function signOut(){
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: ''
                })
            })
    }

    return (
        <AuthContext.Provider value={{ user, isAuth, signIn, loading, loadingAuth, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}
