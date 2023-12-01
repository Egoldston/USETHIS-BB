import React from 'react';
import { CustomCard as Card } from './context';

const Home = () => {
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="Create an account or login to deposit, withdraw and check your balance."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}

export default Home;