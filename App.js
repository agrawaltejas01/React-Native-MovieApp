/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect, useState } from 'react';
import Home from './app/screens/Home';

import getMovies from './app/services/getMovies';

const App = () => {
    return <Home />;
};

export default App;
