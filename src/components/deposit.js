import React from 'react';
import { CustomCard as Card } from './context';
import { deposit } from './api';
import { FirebaseAuthProvider, useFirebaseAuth } from "./firebase-auth-context";


const Deposit = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        <FirebaseAuthProvider>
          <h5>
          <DepositForm setShow={setShow} setStatus={setStatus} />
          </h5>
        </FirebaseAuthProvider>
      }
    />
  )
}


function DepositForm(props){
  const [amount, setAmount] = React.useState('');

  const user = useFirebaseAuth();

  function handle(){
    if (!!user?.email || !!amount) {
      console.log(`must provide value for email[${user?.email}] and amount[${amount}]`);
    }

    deposit(user?.email, amount)
      .then(response => {
          try {
            console.log('response:', response);
            const stringified = JSON.stringify(response);
            const json = JSON.parse(stringified);
            console.log('json:', json);
            props.setStatus(`You new balance is ${json.data.balance} dollars`);
            props.setShow(false);
          } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', err);
            console.log('response:', response);
          }
      })
      .catch(err => {
        console.log("failed to deposit", err)
        props.setStatus('Deposit failed.')
      });
  }

  return(<>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}

export default Deposit;