import React, { Component } from 'react';

import { BrowserRouter, Routes, Route, useParams, Outlet } from 'react-router-dom';

import Home from './components/Home';
import Footer from './components/Footer';
import Directory from './components/Directory';
import Faqs from './components/Faqs';
import Feedback from './components/Feedback';
import Landing from './components/Landing';
import Map from './components/Map';
import NotFound from './components/NotFound';

import './App.css';
import NavBar from './components/NavBar/NavBar';

// Import hospital site specific data
import { birchmountData } from './data/birchmountData';
import { centenaryData } from './data/centenaryData';
// import { generalData } from './data/generalData';

const hospitalData = {
  birchmount: birchmountData,
  centenary: centenaryData,
};

const images = Object.keys(hospitalData).map(hospital => (hospitalData[hospital].landingImage));

const HospitalSite = () => {
  const { site, page } = useParams();
  const data = hospitalData[site];

  if (page == undefined) {
    return <Home data={data.home} />
  }

  switch (page) {
    case 'home':
      return <Home data={data.home} />;
    case 'faqs':
      return <Faqs data={data.faqs} />;
    case 'directory':
      return <Directory data={data.directory} />;
    case 'map':
      return <Map data={data.map} />;
    case 'feedback':
      return <Feedback data={data.feedback} />;
    default:
      return <NotFound />;
  }
};

const PageLayout = ({displayNavBar}) => {
  const { site } = useParams();
  return (
    <div>
      <NavBar hospitalSite={site} displayNavBar={displayNavBar}/>
      <main className="flex-shrink-0">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PageLayout displayNavBar={false}/>}>
            <Route path="" element={<Landing images={images}/>} />
          </Route>
          <Route path="/:site" element={<PageLayout displayNavBar={true}/>}>
            <Route exact path="/:site" element={<HospitalSite/>} />
            <Route path="/:site/:page" element={<HospitalSite/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    )
  }
}

export default App;