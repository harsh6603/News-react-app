import './App.css';
import React, { Component } from 'react'
import { Navbar } from './components/Navbar';
import { News } from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_APIKEY;
  state = {
    progress:0
  }
  setProgress = (p) => {
    this.setState({
      progress:p
    })
  }
  render() {
    return (
      <>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />
      <Router>
      <div>
        <Navbar/>
        {/* <News pageSize={8} category="general" country="in" /> */}
        <Routes>
          <Route exact path={"/"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={8} category="general" country="in" />}/>
          <Route exact path={"/home"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={8} category="general" country="in" />}/>
          <Route exact path={"/business"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={8} category="business" country="in" />}/>
          <Route exact path={"/entertainment"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={8} category="entertainment" country="in" />}/>
          <Route exact path={"/health"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={8} category="health" country="in" />}/>
          <Route exact path={"/science"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={8} category="science" country="in" />}/>
          <Route exact path={"/sports"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={8} category="sports" country="in" />}/>
          <Route exact path={"/technology"} element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={8} category="technology" country="in" />}/>
          {/* <Route exact path={"/About"} element={<News pageSize={8} category="technology" country="in" />}/> */}
        </Routes>
      </div>
      </Router>
      </>
    )
  }
}
