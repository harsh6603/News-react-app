import './App.css';
import React, { Component } from 'react'
import { Navbar } from './components/Navbar';
import { News } from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
      <Router>
      <div>
        <Navbar/>
        {/* <News pageSize={8} category="general" country="in" /> */}
        <Routes>
          <Route exact path={"/"} element={<News key="general" pageSize={8} category="general" country="in" />}/>
          <Route exact path={"/home"} element={<News key="general" pageSize={8} category="general" country="in" />}/>
          <Route exact path={"/business"} element={<News key="business" pageSize={8} category="business" country="in" />}/>
          <Route exact path={"/entertainment"} element={<News key="entertainment" pageSize={8} category="entertainment" country="in" />}/>
          <Route exact path={"/health"} element={<News key="health" pageSize={8} category="health" country="in" />}/>
          <Route exact path={"/science"} element={<News key="science" pageSize={8} category="science" country="in" />}/>
          <Route exact path={"/sports"} element={<News key="sports" pageSize={8} category="sports" country="in" />}/>
          <Route exact path={"/technology"} element={<News key="technology" pageSize={8} category="technology" country="in" />}/>
          {/* <Route exact path={"/About"} element={<News pageSize={8} category="technology" country="in" />}/> */}
        </Routes>
      </div>
      </Router>
      </>
    )
  }
}
