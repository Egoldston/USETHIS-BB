import React, { useContext } from 'react';
import { UserContext } from './context';

const AllData = () => {
    const context = useContext(UserContext);
  
    return (
      <>
        <h5>All Data in Store</h5>
        {context.users?.map((user) => (
          <div
            key={user.email} // Ensure each element has a unique key
            style={{
              border: '1px solid black',
              width: '300px',
              padding: '12px',
              marginBottom: '16px',
            }}
          >
            <p>
              <span style={{ fontWeight: 'bold' }}>Name:</span> {user.name}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Email:</span> {user.email}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Password</span> {user.password}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Balance:</span> ${user.balance}
            </p>
          </div>
        ))}
        <br />
      </>
    );
  };
  
  export default AllData