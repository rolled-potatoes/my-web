import React from 'react';

import { useQuery } from 'react-query';

import { getAuth } from 'apis/auth';

function Authentication({ children }) {
  const data = useQuery('key', () => getAuth().then((res) => res.data));

  return <>{children}</>;
}

export default Authentication;
