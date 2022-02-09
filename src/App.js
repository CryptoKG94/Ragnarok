import './App.css';
import { PageOne } from './components/PageOne';
import { PageTwo } from './components/PageTwo';
import { PageThree } from './components/PageThree';
import PageFour from './components/PageFour';

function App() {
  return (
    <div className="Game_Start">
       <div className="App-intro">
         <PageOne />
         <PageTwo />
         <PageThree />
         <PageFour />
        </div>
    </div>
  );
}

export default App;
