import React from 'react';
import NavReactLink from 'components/NavReactLink';
import { Nav, NavItem } from 'reactstrap';
import navigationDatas from 'constants/navLink';

function ServiceAside() {
  return (
    <Nav vertical>
      {navigationDatas.map(({ url, title }) => (
        <NavItem>
          <NavReactLink href={url}>{title}</NavReactLink>
        </NavItem>
      ))}
    </Nav>
  );
}

export default ServiceAside;
