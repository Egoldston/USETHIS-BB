import { Link } from 'react-router-dom';

import { FirebaseAuthProvider, useFirebaseAuth } from "./firebase-auth-context";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">BadBank</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <FirebaseAuthProvider>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/createaccount/">Create Account</Link>
            </li>
            <li className="nav-item">
              <SignInOrOut />
            </li>
            <li className="nav-item">
              <Deposit />
            </li>
            <li className="nav-item">
              <Withdraw />
            </li>
            <li className="nav-item">
              <Balance />
            </li>         
          </ul>
        </div>
        <div>
            <UserName />
            <UserEmail />
        </div>
      </FirebaseAuthProvider>
    </nav>
  );
}

function UserName() {
  const user = useFirebaseAuth();
  return <div>{user?.displayName || ""}</div>;
}

function UserEmail() {
  const user = useFirebaseAuth();
  return <div>{user?.email || ""}</div>;
}

function SignInOrOut() {
  const user = useFirebaseAuth();

  return user?.email != null 
    ? <Link className="nav-link" to="/logout/">Logout</Link>
    : <Link className="nav-link" to="/login/">Login</Link>;
}

function Deposit() {
  const user = useFirebaseAuth();

  return user?.email != null 
    ? <Link className="nav-link" to="/deposit/">Deposit</Link>
    : <div></div>;
}

function Withdraw() {
  const user = useFirebaseAuth();

  return user?.email != null 
    ? <Link className="nav-link" to="/withdraw/">Withdraw</Link>
    : <div></div>;
}

function Balance() {
  const user = useFirebaseAuth();

  return user?.email != null 
    ? <Link className="nav-link" to="/balance/">Balance</Link>
    : <div></div>;
}


export default NavBar;