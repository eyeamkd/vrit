import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Dashboard from '../components/Dashboard';

export default function SettingsScreen() {
  return <Dashboard/>;
}

SettingsScreen.navigationOptions = {
  title: 'Your Profile',
};
