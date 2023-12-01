import React, { createContext } from 'react';
import Card from 'react-bootstrap/Card';
//import * as ReactDOM from 'react-dom';

const initialUserValue = {
  users: [
    {
      name: 'abel',
      email: 'abel@mit.edu',
      password: 'secret',
      balance: 100,
    },
  ],
};

const UserContext = createContext(initialUserValue);

const CustomCard = ({ bgcolor, txtcolor, header, title, text, body, status }) => {
  const classes = () => {
    const bg = bgcolor ? ' bg-' + bgcolor : ' ';
    const txt = txtcolor ? ' text-' + txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <Card className={classes()} style={{ maxWidth: '18rem' }}>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}
        {body}
        {status && <div id='createStatus'>{status}</div>}
      </Card.Body>
    </Card>
  );
}

export { UserContext, CustomCard };