import React from 'react';

import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import DeliveryDetail from '~/pages/DeliveryDetail';
import ShowProblems from '~/pages/ShowProblems';
import RegisterProblems from '~/pages/RegisterProblem';
import ConfirmDelivery from '~/pages/Confirm';

import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function NewTab() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        labelPosition: 'beside-icon',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#32036d',
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Entregas"
        component={Deliveries}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={20} color="#fff" />
          ),
        }}
      />
      <Tabs.Screen
        name="Meu Perfil"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color="#fff" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          headerStyle: {
            headerBackground: '#320d6d',
          },
          headerTintColor: '#FFF',
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Login',
          }}
        />
      </Stack.Navigator>
    </>
  ) : (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: '#32036d',
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
        }}
      >
        <Stack.Screen
          name="Tab"
          component={NewTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DeliveryDetail}
          options={{
            headerTitleAlign: 'center',
            title: 'Detalhes da encomenda',
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={() => onPress()}>
                <Icon name="chevron-left" size={30} color="#32036d" />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="ShowProblems"
          component={ShowProblems}
          options={{
            headerTitleAlign: 'center',
            title: 'Visualizar problemas',
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={() => onPress()}>
                <Icon name="chevron-left" size={30} color="#32036d" />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="RegisterProblem"
          component={RegisterProblems}
          options={{
            headerTitleAlign: 'center',
            title: 'Informar problema',
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={() => onPress()}>
                <Icon name="chevron-left" size={30} color="#32036d" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="ConfirmDelivery"
          component={ConfirmDelivery}
          options={{
            headerTitleAlign: 'center',
            title: 'Confirmar entrega',
            headerLeft: ({ onPress }) => (
              <TouchableOpacity onPress={() => onPress()}>
                <Icon name="chevron-left" size={30} color="#32036d" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
}
