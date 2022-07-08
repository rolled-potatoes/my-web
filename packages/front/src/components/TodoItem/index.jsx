import React from 'react';
import ListItem from '../ListItem';
import Gear from 'icons/Gear';
import Trash from 'icons/Trash';

function TodoItem({ children, isDone }) {
  const actionButtons = [
    {
      icon: <Gear />,
      onClick: () => {},
      key: 'setting',
      color: 'primary',
    },
    {
      icon: <Trash />,
      className: 'ms-1',
      onClick: () => {},
      key: 'remove',
      color: 'danger',
    },
  ];

  return (
    <ListItem isDone={isDone} actionButtons={actionButtons}>
      {children}
    </ListItem>
  );
}

export default TodoItem;
