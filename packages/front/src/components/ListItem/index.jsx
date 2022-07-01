import React from 'react';
import cn from 'classnames';
import { ListGroupItem, Button } from 'reactstrap';

import styles from './style.scss';

function ActionButton({ icon, onClick, className, ...rest }) {
  return (
    <Button onClick={onClick} className={cn(className)} {...rest}>
      {icon}
    </Button>
  );
}

function ListItem({
  actionButtons = [],
  children,
  isDone = false,
  onClick = () => {},
}) {
  return (
    <ListGroupItem
      onClick={onClick}
      className={cn(
        'd-flex align-items-center',
        styles.listItem,
        isDone && styles.done
      )}
    >
      {children}
      {actionButtons.length > 0 && (
        <span className='ms-2'>
          {actionButtons.map(({ ...rest }) => (
            <ActionButton {...rest} />
          ))}
        </span>
      )}
    </ListGroupItem>
  );
}

export default ListItem;
