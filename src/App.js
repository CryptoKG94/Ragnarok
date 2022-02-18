import './App.css';
import './assets/styles/common.css'
import { Dashboard } from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PlayNow } from './components/Dashboard/PlayNow';
import Create from './components/CreateParty/Create';
import Party from './components/CreateParty/Party'

function App() {  
  return (
    <> 
      <Router>
          <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/playnow" exact component={PlayNow} />
              <Route path="/create" exact component={Create} />
              <Route path="/party" exact component={Party} />
          </Switch>
      </Router>
    </>
  );
}

export default App;
