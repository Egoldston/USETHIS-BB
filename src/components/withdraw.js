import React from 'react';
import { CustomCard as Card } from './context';
import { withdraw } from './api';
import { FirebaseAuthProvider, useFirebaseAuth } from "./firebase-auth-context";
  

const Withdraw = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        <FirebaseAuthProvider>
          <h5>
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
          </h5>
        </FirebaseAuthProvider>
      }
    />
  )
}


function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

  const user = useFirebaseAuth();

  function handle(){
    if (user?.email == null || amount == null) {
      console.log(`must provide value for email[${user?.email}] and amount[${amount}]`);
    }

    withdraw(user?.email, amount)
      .then(response => {
        try {
          console.log('response:', response);
          const stringified = JSON.stringify(response);
          const json = JSON.parse(stringified);
          console.log('json:', json);
          props.setStatus(`Your new balance is ${json.data.balance} dollars`);
          props.setShow(false);
        } catch(err) {
          props.setStatus('Withdraw failed')
          console.log('err:', response);
        }
    })
    .catch(err => {
      console.log("failed to withdraw", err)
      props.setStatus('Withdraw failed in catch.')
    });
    props.setShow(false);
  }



  return(<>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}

export default Withdraw;
