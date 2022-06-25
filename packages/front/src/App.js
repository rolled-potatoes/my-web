import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Main from 'pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
