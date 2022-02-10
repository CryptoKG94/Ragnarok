import './App.css';
import { PageOne } from './components/PageOne';
import { PageTwo } from './components/PageTwo';
import { PageThree } from './components/PageThree';
import PageFour from './components/PageFour';
import { Comman } from './components/Comman';
import { useRef } from 'react';
import { Footer } from './components/Footer';

function App() {

  let page1 = useRef(null);
  let page2 = useRef(null);
  let page3 = useRef(null);
  let page4 = useRef(null);
  const pull_data = (page) => {

    if (!page.current) return;
      page.current.scrollIntoView({ behavior: "smooth" });
    }

  
  return (
    <>    
      <div className="Game_Start">
        <div className="App-intro">
          <Comman  func={pull_data} page1={page1} page2={page2} page4={page4} page3={page3} />
            <div ref={page1}>
              <PageOne className="" />
            </div>
            <div ref={page2}>
              <PageTwo className="" />
            </div>
            <div ref={page3}>
              <PageThree className="" />
            </div>
            <div ref={page4}>
              <PageFour className="" />
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
