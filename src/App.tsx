import React from 'react';
import './App.css';
import DataProvider from 'src/store/DataProvider';
import Home from 'src/pages/home';

function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}

export default App;
