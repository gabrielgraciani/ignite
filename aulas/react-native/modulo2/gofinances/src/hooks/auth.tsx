import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

  const userStorageKey = '@gofinance:user'
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  async function signInWithGoogle() {

    try {

      const result = await Google.logInAsync({
        iosClientId: '1065635244241-2cjujtdqfd1ri33jfvhf8s8ga3infifd.apps.googleusercontent.com',
        androidClientId: '1065635244241-2523nvvbqa9vnou53lqto9o5sigjjf96.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type == 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch (err) {

      throw new Error(err)

    }
  }

  async function signInWithApple() {
    try {
      const creditentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (creditentials) {

        const name = creditentials.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`

        const userLogged = {
          id: String(creditentials.user),
          email: creditentials.email!,
          name,
          photo
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
        console.log(userLogged);
      }

    } catch (err) {
      throw Error(err)
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(userStorageKey)
      
      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();

  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut, userStorageLoading }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };