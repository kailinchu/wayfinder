import React, { Component } from 'react';
import FAQList from './FAQlist';
import './style.css';

class Faqs extends Component {
  render() {
    return (
      <>
        <h1>FAQs</h1>
        <h2>Click here for audio of frequently asked questions</h2>
      <FAQList />
      </>
    )
  }
}

export default Faqs;