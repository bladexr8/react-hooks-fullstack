/**
 * contain all our routing logic and will 
 * have silent authentication here as well.
 */

 import React, { useContext, useEffect } from 'react';
 import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
 import history from './utils/history';
 import Context from './utils/context';
 import AuthCheck from './utils/authcheck';
 
 import Home from './hooks/home';
 import Header from './hooks/header';
 import HooksContainer1 from './hooks/hook1';
 import Callback from './hooks/callback';
 import HooksForm from './hooks/hooks_form1';
 import PrivateComponent from './hooks/privatecomponent';
 import Profile from './hooks/profile';
 
 
 
 const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Component auth={auth} {...props} />
    : <Navigate to={{pathname:'/'}} />
  }
  />
 )

 const AppRoutes = () => {
  const context = useContext(Context)


    return(
      <div>
        <BrowserRouter location={history.location} navigator={history} >
        <Header />
        <br />
        <br />
        <div>
          <Routes>
            <Route exact path='/' element={Home} />
            <Route path='/hooksform' element={HooksForm} />
            <Route path='/profile' element={Profile} />
            <Route path='/hookscontainer' element={HooksContainer1} />
            <Route path='/authcheck' element={AuthCheck} />


            
            <Route path='/callback'
                          render={(props) => {
                            context.handleAuth(props);                                                            
                            return <Callback />}} />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
)}

export default AppRoutes;

/**
 * <PrivateRoute path='/privateroute'
                          auth={context.authState}
                          element={PrivateComponent} />
            <PrivateRoute path="/profile"
                          auth={context.authState}
                          element={Profile} />
 */