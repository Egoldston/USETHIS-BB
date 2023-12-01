import React from 'react';
import { CustomCard as Card } from './context';
import { getBalance } from './api';
import { FirebaseAuthProvider, useFirebaseAuth } from "./firebase-auth-context";

const Balance = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        <FirebaseAuthProvider>
          <h5>
          <BalanceForm setShow={setShow} setStatus={setStatus} />
          </h5>
        </FirebaseAuthProvider>
      }
    />
  )

}


function BalanceForm(props){
  const user = useFirebaseAuth();

  function handle(){

    getBalance(user?.email)
      .then(response => {
          try {
            const stringified = JSON.stringify(response);
  
            const json = JSON.parse(stringified);
  
            props.setStatus(`You have ${json.data.balance} dollars`);
  
          } catch(err) {
            console.log('err:', err);
          }
      })
      .catch(err => {
        props.setStatus('Balance failed')
        console.log("failed to get balance", err)
      });

    props.setShow(false);
 
  }

  return(<>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Get Balance</button>
  </>);
}

export default Balance;