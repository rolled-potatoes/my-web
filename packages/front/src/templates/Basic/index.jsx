import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ServiceAside from 'components/ServiceAside';

function Basic({ children }) {
  return (
    <Container className="pt-5">
      <Row>
        <Col md="4">
          <h1 className="mb-4">Rolled-potatoes</h1>
          <ServiceAside />
        </Col>
        <Col md="8">{children}</Col>
      </Row>
    </Container>
  );
}

export default Basic;
