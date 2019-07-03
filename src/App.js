import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//import components
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import Index from './components/Index';
import Details from './components/Details';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to={'/'}>IT Library</Link>
          </nav>
          <div className="ui tabular menu">
            <Link className="item" to={'/'}>Home</Link>
            <Link className="item" to={'/create'}>Add Entry</Link>
            <Link className="item" to={'/index'}>Index Library</Link>
          </div>
          <Switch>
            <Route exact path='/' component = { Home }/>
            <Route exact path='/create' component = { Create }/>
            <Route exact path='/details/:id' component = { Details }/>
            <Route exact path='/edit/:id' component = { Edit }/>
            <Route exact path='/index' component = { Index }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
