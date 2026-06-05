import React, { Component } from 'react';
import { Analytics } from "@vercel/analytics/react"

import { BrowserRouter, Routes, Route, useParams, Outlet, Navigate } from 'react-router-dom';

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

import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

// Import hospital site specific data
import { birchmountData } from './data/birchmountData';
import { centenaryData } from './data/centenaryData';
// import { generalData } from './data/generalData';
import { getAllowedSites, getDefaultSite, isSingleSitePreview, isSiteAllowed } from './config/siteScope';

const hospitalData = {
  birchmount: birchmountData,
  centenary: centenaryData,
};

const siteEntries = Object.entries(hospitalData);
const availableSites = siteEntries.map(([site]) => site);
const defaultSite = getDefaultSite(availableSites);
const allowedSites = getAllowedSites(availableSites);
const defaultSitePath = `/${defaultSite}`;
const images = siteEntries
  .filter(([site]) => allowedSites.includes(site))
  .map(([, data]) => data.landingImage);

const HospitalSite = () => {
  const { site, page } = useParams();
  const data = hospitalData[site];

  if (!data || !isSiteAllowed(site, availableSites)) {
    return isSingleSitePreview ? <Navigate to={defaultSitePath} replace /> : <NotFound />;
  }

  if (page == undefined) {
    return <Home data={data.home} />
  }

  switch (page) {
    case 'home':
      return <Home data={data.home} />;
    case 'faqs':
      return <Faqs data={data.faqs} />;
    case 'directory':
      return <Directory data={data.directory} site={site} />;
    case 'map':
      return <Map data={data.map} site={site}/>;
    case 'feedback':
      return <Feedback data={data.feedback} />;
    default:
      return <NotFound />;
  }
};

const PageLayout = ({displayNavBar}) => {
  const { site } = useParams();

  if (site && !isSiteAllowed(site, availableSites)) {
    return isSingleSitePreview ? <Navigate to={defaultSitePath} replace /> : <NotFound />;
  }

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
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Analytics />

          <Routes>
            {isSingleSitePreview ? (
              <Route path="/" element={<Navigate to={defaultSitePath} replace />} />
            ) : (
              <Route path="/" element={<PageLayout displayNavBar={false}/>}>
                <Route index element={<Landing images={images}/>} />
              </Route>
            )}
            <Route path="/:site" element={<PageLayout displayNavBar={true}/>}>
              <Route index element={<HospitalSite/>} />
              <Route path=":page" element={<HospitalSite/>} />
              <Route path="*" element={isSingleSitePreview ? <Navigate to={defaultSitePath} replace /> : <NotFound/>} />
            </Route>
            <Route path="*" element={isSingleSitePreview ? <Navigate to={defaultSitePath} replace /> : <NotFound/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App;
