import React, { useEffect } from 'react';
import { Routes, BrowserRouter, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Authentication from 'pages/Authentication';
import navLink from 'constants/navLink';

import { useQuery } from 'react-query';
import { Spinner } from 'reactstrap';
import { getAuth } from 'apis/auth';
const queryClient = new QueryClient();

function AuthRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(
    'key',
    () => getAuth().then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isLoading && !data) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, data]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && children}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authentication>
        <BrowserRouter>
          <Routes>
            {navLink.map(({ url, Component, isAuth }) => {
              const element = isAuth ? (
                <AuthRoute>
                  <Component />
                </AuthRoute>
              ) : (
                <Component />
              );
              return <Route key={url} path={url} element={element} />;
            })}
          </Routes>
        </BrowserRouter>
      </Authentication>
    </QueryClientProvider>
  );
}

export default App;
