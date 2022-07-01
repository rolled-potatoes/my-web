import React from 'react';
import cn from 'classnames';

function Gear({ className, ...rest }) {
  return <i className={cn(className, 'bi bi-gear')} {...rest}></i>;
}

export default Gear;
