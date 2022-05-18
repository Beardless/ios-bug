/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const autobahn = require('autobahn-browser');
global.AUTOBAHN_DEBUG = true;
const initAutobahn = () => {
  const WEBSOCKET_API_URL = 'secret-api-url';
  const FALLBACK_API_URL = 'secret-fallback-api-url';
  const DOMAIN_PREFIX = 'secret-domain-prefix';
  var conn = new autobahn.Connection({
    transports: [
      {
        type: 'websocket', // type must be mobile
        url: WEBSOCKET_API_URL,
        fallback: FALLBACK_API_URL,
        max_retries: 3,
        realm: DOMAIN_PREFIX,
        on_user_error: function (error, customErrorMessage) {
          console.log('===on_user _error', {error, customErrorMessage});
        },
        on_internal_error: function (error, customErrorMessage) {
          console.log('===on_internal_error', {error, customErrorMessage});
        },
      },
    ],
  });
  conn.onopen = function (session) {
    console.log('Connection is established. Session ID = %0', session.id);
  };
  conn.onclose = function () {
    console.log('Connection lost. %0', arguments);
  };
  conn.open();
};

initAutobahn();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};

export default App;
