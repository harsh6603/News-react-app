import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  // apiKey = process.env.REACT_APP_NEWS_APIKEY;
  const [progress, setProgress] = useState(0);
  const [apiKey] = useState(process.env.REACT_APP_NEWS_APIKEY);

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />
      <Router>
        <div>
          <Navbar />
          {/* <News pageSize={8} category="general" country="in" /> */}
          <Routes>
            <Route exact path={"/"} element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={8} category="general" country="in" />} />
            <Route exact path={"/home"} element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={8} category="general" country="in" />} />
            <Route exact path={"/business"} element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={8} category="business" country="in" />} />
            <Route exact path={"/entertainment"} element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={8} category="entertainment" country="in" />} />
            <Route exact path={"/health"} element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={8} category="health" country="in" />} />
            <Route exact path={"/science"} element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={8} category="science" country="in" />} />
            <Route exact path={"/sports"} element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={8} category="sports" country="in" />} />
            <Route exact path={"/technology"} element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={8} category="technology" country="in" />} />
            {/* <Route exact path={"/About"} element={<News pageSize={8} category="technology" country="in" />}/> */}
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App