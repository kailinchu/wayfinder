import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Directory from './components/Directory';
import Faqs from './components/Faqs';
import Feedback from './components/Feedback';
import Landing from './components/Landing';
import Map from './components/Map';
import NotFound from './components/NotFound';

import './App.css';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar/>

        <main className="flex-shrink-0">
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Landing/>} />
              <Route path="/birchmount" element={<Home/>} />
              <Route path="/faqs" element={<Faqs/>} />
              <Route path="/directory" element={<Directory/>} />
              <Route path="/map" element={<Map/>} />
              <Route path="/feedback" element={<Feedback/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </main>

        <Footer/>
      </BrowserRouter>
    )
  }
}

export default App;