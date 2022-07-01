import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

function NavReactLink({ href, className, children }) {
  return (
    <NavLink
      href={href}
      className={className}
      tag={({ href, ...rest }) => (
        <Link to={href} {...rest}>
          {children}
        </Link>
      )}
    />
  );
}

export default NavReactLink;
