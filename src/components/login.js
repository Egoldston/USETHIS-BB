import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";
import { CustomCard as Card } from './context';


const Login = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [user, setUser] = React.useState(null);
  
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <div>
            <LoginForm setShow={setShow} setStatus={setStatus}></LoginForm>
            <LoginFormGoogle setShow={setShow} setStatus={setStatus}></LoginFormGoogle>
          </div>
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} user={user} />
        )
      }
    />
  );
}
 

function LoginMsg(props) {
  return (
    <>
      <h5>Welcome: {props.user ? props.user.name : 'Guest'}</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    function handle() {
      signInWithEmailAndPassword(auth, email, password)
        .then(response => {
          
          console.log('response from signin with email', response);

          if (auth && auth.currentUser) {
            auth.currentUser.getIdToken().then(function(idToken) {
              localStorage.setItem("token", idToken);
              props.setStatus(`Logged in`);
            }).catch(function(error) {
              console.log(error)
            });
          } else {
            console.log('could not find current user');
          }
        })
        .catch((error) =>
          console.log(error)
        );
    }
  
    return (
      <>
        Email<br/>
        <input type="input"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
        Password<br/>
        <input type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
        <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
      </>
    );
}

function LoginFormGoogle(props) {
  // const history = useHistory();
  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new GoogleAuthProvider();
    //2 - create the popup signIn
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("token", token);

        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("user", user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      })
  }
  return (
    <div>
      <button onClick={googleLogin} className="btn btn-light">
        GOOGLE
      </button>
    </div>
  );
}

export default Login;