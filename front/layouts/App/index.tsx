import Workspace from '@layouts/Workspace';
import GenieBlock from '@pages/GenieBlock';
import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

declare global{
  interface Window{
    Kakao:any; //Kakao Authentication API
  }
}

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace" component={Workspace} exact/>
      <Route path="/workspace/genieblock"component={GenieBlock}/>
    </Switch>
  );
};

export default App;
