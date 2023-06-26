// import '../ignoreWarnings';
// This is the current working file as of now - Aditya Ingle

import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Routes from './navigator/Routes';
import { toastConfig } from './views/hoc/Toast';
import Toast from 'react-native-toast-message';
import configStore from './redux/configStore';

const App = () => {
  useEffect(() => {
    _init();
    return () => { };
  }, []);

  const _init = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  };

  return (
    <Provider store={configStore}>
      <Routes />
      <Toast ref={ref => Toast.setRef(ref)} config={toastConfig} />
    </Provider>
  );
};

export default App;


// npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

// cd android && ./gradlew assembleDebug

// cd android && ./gradlew bundleRelease

// grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'
