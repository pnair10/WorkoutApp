import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Trophy, History, BarChart3, Dumbbell } from 'lucide-react-native';

import WorkoutLogScreen from './app/screens/WorkoutLogScreen';
import HistoryScreen from './app/screens/HistoryScreen';
import TargetsScreen from './app/screens/TargetsScreen';
import InsightsScreen from './app/screens/InsightsScreen';
import { Theme } from './app/theme';

const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Theme.colors.primary,
    background: Theme.colors.background,
    card: Theme.colors.surface,
    text: Theme.colors.text,
    border: Theme.colors.border,
    notification: Theme.colors.secondary,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Theme.colors.primary,
          tabBarInactiveTintColor: Theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: Theme.colors.surface,
            borderTopColor: Theme.colors.border,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: Theme.colors.surface,
            borderBottomColor: Theme.colors.border,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: Theme.colors.text,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Workout"
          component={WorkoutLogScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Dumbbell color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => <History color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Targets"
          component={TargetsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Insights"
          component={InsightsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
