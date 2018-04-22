import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './components/Landing';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
