import {Route, Switch, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/ebank/login" component={LoginRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
