import React from 'react';
import { Button, Container } from 'reactstrap';

function Login() {
  return (
    <Container className="d-flex align-items-center justify-content-center w-100 h-100">
      <Button href="http://localhost:8080/auth/github">Github Login</Button>
    </Container>
  );
}

export default Login;
