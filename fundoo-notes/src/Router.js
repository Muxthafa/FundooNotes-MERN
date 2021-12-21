import Registration from "./pages/signUp.jsx";
import Signin from "./pages/signIn.jsx";
import ForgetPassword from "./pages/forgetPassword.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import Notes from "./pages/Dashboard.jsx"
import Trash from "./components/Trash.jsx"
import Error from "./pages/Error.jsx"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Routers() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Registration} />
          <Route path="/login" component={Signin} />
          <Route path="/forgot-password" component={ForgetPassword} />
          <Route path="/reset/:token" component={ResetPassword} />
          <Route path="/notes" component={Notes} />
          <Route path="/trash" component={Trash} />
          <Route path="*" component={Error} />  
        </Switch>
      </Router>
    </>
  );
}
