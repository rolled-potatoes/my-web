import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import navigationDatas from 'constants/navLink';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {navigationDatas.map(({ url, Component }) => (
          <Route path={url} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
