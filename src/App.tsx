import React from 'react';
import './App.css';
import AppRoutes from 'src/AppRoutes';
import DataProvider from 'src/store/DataProvider';

function App() {
  return (
    <DataProvider>
      <AppRoutes />
    </DataProvider>
  );
}

export default App;
