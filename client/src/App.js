import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Directory from './components/Directory';
import Faqs from './components/Faqs';
import Feedback from './components/Feedback';
import Map from './components/Map';
import NotFound from './components/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header/>

        <main className="flex-shrink-0">
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
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