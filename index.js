/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

export const requestMessagingPermissions = async () => {
  const authStatus = await messaging().requestPermission();
  let enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  await messaging().registerDeviceForRemoteMessages();

  return enabled;
};

export const getFCMToken = async () => {
  try {
    await requestMessagingPermissions();

    const fcmToken = await messaging().getToken();
    console.log('FCMtoken:', fcmToken);

    return fcmToken;
  } catch (error) {
    console.log('getFCMToken', error);
  }
};

getFCMToken();

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  await fetch('https://15d49e93-6c8c-41a5-b022-6ca83d564122.mock.pstmn.io/qwe');

  return;
});

AppRegistry.registerComponent(appName, () => HeadlessCheck);
