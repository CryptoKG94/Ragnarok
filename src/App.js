import './App.css';
import './assets/styles/common.css'
import { Dashboard } from './pages/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import bgSound from "./assets/audio/battle bgm.mp3"
import { Valhalla } from './pages/Valhalla/Valhalla';
import { PartyHall } from './pages/PartyHall/PartyHall';

function App() {  
  return (
    <> 
      <Router>
          <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/valhalla" exact component={Valhalla} />
              <Route path="/partyhall" exact component={PartyHall} />
          </Switch>
      </Router>
      <audio controls autoPlay loop style={{display: 'none'}}>
        <source type="audio/mp3" src={bgSound}></source>
      </audio>
    </>
  );
}

export default App;
