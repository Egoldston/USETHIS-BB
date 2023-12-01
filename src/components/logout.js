import React from 'react';

import { auth } from "./firebase";
import { CustomCard as Card } from './context';


const Logout = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [user, setUser] = React.useState(null);
  
  return (
    <Card
      bgcolor="secondary"
      header="Logout"
      status={status}
      body={
        <LogoutForm setShow={setShow} setStatus={setStatus} user={user} />
      }
    />
  );
}
 

function LogoutForm(props) {  
    function handle() {
        auth.signOut();

        localStorage.removeItem("token");
        props.setStatus(`Logged out!`);
        window.href = "/";
    }
  
    return (
      <>
        <button type="submit" className="btn btn-light" onClick={handle}>Logout</button>
      </>
    );
}


export default Logout;