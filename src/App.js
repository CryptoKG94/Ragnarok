import './App.css';
import './assets/styles/common.css'
import { Dashboard } from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PlayNow } from './components/Dashboard/PlayNow';
import Create from './components/CreateParty/Create';
import Party from './components/CreateParty/Party'
import bgSound from "./assets/audio/battle bgm.mp3"
import { CreateParty } from "./components/Dashboard/CreateParty"

function App() {  
  return (
    <> 
      <Router>
          <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/playnow" exact component={PlayNow} />
              <Route path="/createParty" exact component={CreateParty} />
              <Route path="/create" exact component={Create} />
              <Route path="/party" exact component={Party} />
          </Switch>
      </Router>
      <audio controls autoPlay loop src={bgSound} type="audio/mp3" style={{display: 'none'}}>
      </audio>
    </>
  );
}

export default App;
