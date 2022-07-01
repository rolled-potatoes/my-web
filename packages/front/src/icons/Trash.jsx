import React from 'react';
import cn from 'classnames';

function Trash({ className, ...rest }) {
  return <i className={cn(className, 'bi bi-trash')} {...rest}></i>;
}

export default Trash;
