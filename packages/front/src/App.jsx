import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Authentication from 'pages/Authentication';
import navLink from 'constants/navLink';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authentication>
        <BrowserRouter>
          <Routes>
            {navLink.map(({ url, Component }) => {
              return <Route key={url} path={url} element={<Component />} />;
            })}
          </Routes>
        </BrowserRouter>
      </Authentication>
    </QueryClientProvider>
  );
}

export default App;
