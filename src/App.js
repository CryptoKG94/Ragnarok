import './App.css';
import { Dashboard } from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PageOne } from './components/GamePages/PageOne';
import { PageTwo } from './components/GamePages/PageTwo';
import { PageThree } from './components/GamePages/PageThree';
import PageFour from './components/GamePages/PageFour';
import { PageFive } from './components/GamePages/PageFive';
import { PlayNow } from './components/Dashboard/PlayNow';
import { PageSix } from './components/GamePages/PageSix';

function App() {  
  return (
    <> 
      <Router>
          <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/playnow" exact component={PlayNow} />
              <Route path="/page1" component={PageOne} />
              <Route path="/page2" component={PageTwo} />
              <Route path="/page3" component={PageThree} />
              <Route path="/page4" component={PageFour} />
              <Route path="/page5" component={PageFive} />
              <Route path="/page6" component={PageSix} />
          </Switch>
      </Router>
    </>
  );
}

export default App;
