import React, { lazy, Suspense, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import {ID_KEY} from "../constants";

const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy( () => import( './pages/SignInPage' ) );
const HomePage = lazy(() => import('./pages/HomePage'));


function App () {

    useEffect(() => {
        sessionStorage.removeItem(ID_KEY);
    }, []);

  return (
    <Suspense fallback={ <div>Loading...</div> }>
        <PrivateRoute exact path="/" component={HomePage} to='/sign_in'/>
        <Route path={['/signup', '/sign_up']} component={SignUpPage}/>
        <Route path={['/signin', '/sign_in', '/login']} component={SignInPage}/>
    </Suspense>
  );
}

export default App;
